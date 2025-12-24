import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET') as any,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { id: user.id, email: user.email };
  }
}
