import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/mongodb.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ResumeModule } from './resume/resume.module';
import { InterviewModule } from './interview/interview.module';
import { AiModule } from './resume/ai/ai.module';
import { JwtStrategy } from './common/guards/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ResumeModule,
    InterviewModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
