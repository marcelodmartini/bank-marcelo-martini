// NestJS imports
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Local imports
import { JwtStrategy } from './strategies/jwt.strategy';

/**
 * The AuthModule is responsible for managing authentication-related operations.
 * It uses Passport.js as the underlying authentication middleware, with JWT (JSON Web Tokens) as the chosen strategy.
 */
@Module({
  // Register Passport module with JWT as the default strategy.
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],

  // No controllers are being provided in this module.
  controllers: [],

  // JwtStrategy is provided for dependency injection throughout the application.
  providers: [JwtStrategy],
})
export class AuthenticationModule { }
