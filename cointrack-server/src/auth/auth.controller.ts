import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/login-user.dto';
import type { Response as ExpressResponse } from 'express';
import { ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from './guards/access-jwt.guard';
import { RefreshTokenGuard } from './guards/refresh-jwt.guard';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { user, access_token, refresh_token } =
      await this.authService.register(dto);

    const refreshExpiration = 7 * 24 * 60 * 60 * 1000;

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      sameSite:
        this.configService.get('NODE_ENV') === 'production' ? 'strict' : 'lax',
      maxAge: refreshExpiration,
    });

    return { user, access_token };
  }

  @Post('login')
  async login(
    @Body() dto: AuthUserDto,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { user, access_token, refresh_token } =
      await this.authService.login(dto);

    const refreshExpiration = 7 * 24 * 60 * 60 * 1000;

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      sameSite:
        this.configService.get('NODE_ENV') === 'production' ? 'strict' : 'lax',
      maxAge: refreshExpiration,
    });

    return { user, access_token };
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async profile(@Request() req) {
    return await this.authService.getUserProfile(req.user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const { access_token } = await this.authService.refreshTokens(
      req.user.refreshToken,
    );

    return { access_token };
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Response({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }
}
