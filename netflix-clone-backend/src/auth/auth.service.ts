// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOne(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({ email, password: hashedPassword });
    // Generate JWT token
    const payload = { email: newUser.email, sub: newUser._id };
    const accessToken = this.jwtService.sign(payload);
    
    // Return the user details along with the token
    return { 
      email: newUser.email, 
      access_token: accessToken,  // Include the JWT token in the response
      message: 'User registered successfully' 
    };
  }
}
