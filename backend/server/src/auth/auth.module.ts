import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,

    // ✅ ADD THIS
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: 'mysecretkey', // keep same everywhere
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],

  // ✅ ADD THIS (VERY IMPORTANT)
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
