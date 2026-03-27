import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    // ✅ Load ENV globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): MongooseModuleOptions => {
        const mongoUri = config.get<string>('MONGO_URI');

        if (!mongoUri) {
          throw new Error('MONGO_URI is not defined in .env');
        }

        console.log('🔄 Connecting to MongoDB...');

        return {
          uri: mongoUri,

          connectionFactory: (connection: Connection): Connection => {
            // ✅ SAFE event listeners (no TS error)
            connection.on('connected', () => {
              console.log('✅ MongoDB Connected Successfully');
            });

            connection.on('error', (error: unknown) => {
              console.error('❌ MongoDB Connection Error:', error);
            });

            connection.on('disconnected', () => {
              console.warn('⚠️ MongoDB Disconnected');
            });

            return connection;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
