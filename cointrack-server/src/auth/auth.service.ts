import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dtos/login-user.dto';
import * as argon2 from 'argon2';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,

    @Inject('JWT_ACCESS_TOKEN')
    private readonly jwtAccessService: JwtService,

    @Inject('JWT_REFRESH_TOKEN')
    private readonly jwtRefreshService: JwtService,
  ) {}

  async issueTokens(userId: string, userEmail: string) {
    try {
      const payload = { sub: userId, email: userEmail };
      return {
        access_token: this.jwtAccessService.sign(payload),
        refresh_token: this.jwtRefreshService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException('Could not issue tokens, ' + error.message);
    }
  }

  async refreshTokens(old_refresh_token: string) {
    if (!old_refresh_token) {
      throw new BadRequestException('Refresh token is missing');
    }
    const decoded = this.jwtRefreshService.decode(old_refresh_token) as any;

    if (!decoded || !decoded.email) {
      throw new BadRequestException('Invalid token payload');
    }

    const user = await this.userService.getUserByEmail(decoded.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const tokens = await this.issueTokens(user.id, user.email);

    return {
      user,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  async register(dto: RegisterUserDto) {
    const existingUser = await this.userService.getUserByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const newUser = await this.userService.createUser(dto);
    const tokens = await this.issueTokens(newUser.id, newUser.email);
    return { user: newUser, ...tokens };
  }

  async login(dto: AuthUserDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const tokens = await this.issueTokens(user.id, user.email);
    return { user, ...tokens };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async getUserProfile(id: string) {
    return await this.userService.getUserById(id);
  }
}
