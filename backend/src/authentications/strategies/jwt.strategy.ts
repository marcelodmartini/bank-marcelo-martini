// NestJS imports
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// JWT related imports
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JwtStrategy class integrates with AWS Cognito for JSON Web Token (JWT) authentication 
 * using the RS256 algorithm. This strategy is used to extract and validate JWTs 
 * from incoming requests, ensuring secure access to protected routes.
 * 
 * @class
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  /**
   * Initializes the JwtStrategy with essential configurations:
   * - How JWT is extracted from the request.
   * - JWT's expiration.
   * - Expected audience and issuer.
   * - Signature algorithm.
   * - RSA key retrieval strategy.
   */
  constructor() {
    super({
      // Defines method to extract JWT from the request.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Checks the token's expiration time.
      ignoreExpiration: false,

      // The signature algorithm used in the JWT.
      algorithms: ['RS256'],      

      // Expected audience (typically the Client ID).
      audience: process.env.AWS_COGNITO_COGNITO_CLIENT_ID,

      // The issuer (URL) of the JWT.
      issuer: process.env.AWS_COGNITO_AUTHORITY,

      // Configures the method to fetch the RSA signing key to validate the JWT's signature.
      secretOrKeyProvider: passportJwtSecret({

        // Enables rate limiting to prevent abuse.
        rateLimit: true,

        // Caches signing key to improve performance.
        cache: true,

        // Defines the maximum number of requests for signing keys per minute.
        jwksRequestsPerMinute: 10,

        // URL to fetch the JSON Web Key Set (JWKS) from the authority.
        jwksUri: `${process.env.AWS_COGNITO_AUTHORITY}/.well-known/jwks.json`,
      }),
    });
  }

  /**
   * Validates the JWT's payload after successful verification.
   * 
   * This method can be extended to perform additional validation or data extraction 
   * based on application-specific requirements.
   * 
   * @param {any} payload - Decoded JWT payload.
   * @returns {Object} - Standardized user data extracted from the JWT.
   */
  async validate(payload: any) {
    return {
      // The subject claim (sub) typically represents the user ID.
      idUser: payload.sub,

      // The email from the JWT payload.
      email: payload.email
    };
  }
}
