import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from '../resolvers/auth.resolver';
import { UserModule } from '../modules/user.module';
import { VerificationCodesModule } from '../modules/verification-codes.module';
import { jwtConstants } from '../constants/constants';
import { RoleModule } from '../modules/role.module';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from './mail.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    VerificationCodesModule,
    MailModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
