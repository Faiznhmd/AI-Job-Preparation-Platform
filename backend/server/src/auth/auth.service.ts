import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ✅ REGISTER
  async register(data: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(data.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword: string = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      user,
    };
  }

  // ✅ LOGIN
  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch: boolean = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}
