import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, // ✅ THIS FIXES ERROR
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 👈 needed for AuthModule
})
export class UsersModule {}