import { PrismaService } from '../../src/databases/prisma.service';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import 'reflect-metadata';


/**
 * @fileOverview
 * Contains end-to-end (E2E) tests for the application.
 * E2E tests are crucial for verifying the system as a whole and ensuring features
 * work seamlessly from start to finish.
 *
 * This suite specifically tests account management functions using the application's API.
 * 
 * Prerequisites:
 * - AWS Cognito is used for user authentication.
 * - Prisma is used for database operations.
 * - Environment variables for AWS credentials and testing parameters must be set.
 */

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  /**
   * Authenticate a user via AWS Cognito and retrieve an access token.
   * This token is necessary for authenticating subsequent API requests.
   * 
   * @returns {Promise<string>} The authentication token.
   * 
   * @throws {Error} Throws an error if authentication fails.
   */
  const getAccessToken = async (): Promise<string> => {
    const cognito = new CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
      region: 'us-east-1',
    });

    const signInParams = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      AuthParameters: {
        USERNAME: process.env.AWS_COGNITO_TESTING_EMAIL!,
        PASSWORD: process.env.AWS_COGNITO_TESTING_PASSWORD!,
      },
    };

    const response = await cognito.initiateAuth(signInParams).promise();
    return response.AuthenticationResult!.IdToken!;
  };

  /**
   * Initialization before running the test suite.
   * This sets up the Nest application and initializes the Prisma service.
   */
  beforeAll(async () => {
    // Set the database URL for testing.
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
    
    // Setup the Nest testing module with required imports and providers.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          isGlobal: true,
        }),
      ],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  /**
   * Cleanup operations after running the entire test suite.
   * This ensures that the test database is clean and connections are closed.
   */
  afterAll(async () => {
    // Clearing tables to maintain a clean state for other potential tests.
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE Account;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE EventStore;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE Transaction;`);
    
    // Disconnecting the Prisma service and closing the Nest application.
    await prisma.$disconnect();
    await app.close();
  });

  /**
   * E2E tests for Account management operations.
   * This section tests the creation, retrieval, and management of accounts
   * and associated transactions.
   */
  describe('Account Management', () => {

    // Tests the API's ability to retrieve all accounts for an authenticated user.
    it('should retrieve all user accounts successfully', async () => {
        const token = await getAccessToken();
        await request(app.getHttpServer())
          .get('/accounts')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK);
    });

    // Tests the API's ability to create a new account.
    it('should create an account successfully', async () => {
      const token = await getAccessToken();
      await request(app.getHttpServer())
        .post('/accounts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          number: 12345678,
        })
        .expect(HttpStatus.CREATED);
    });

    // Tests the API's ability to create a new transaction for an account.
    it('should create a transaction for an account successfully', async () => {
        const token = await getAccessToken();
        await request(app.getHttpServer())
          .post('/transactions')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 1000,
            type: "DEPOSIT",
            accountId: 1
          })
          .expect(HttpStatus.CREATED);
    });    

    // Tests the API's ability to retrieve the balance for a specific account.
    it('should retrieve the balance of a specific account successfully', async () => {
      const token = await getAccessToken();
      await request(app.getHttpServer())
        .get('/accounts/1/balance')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);
    });
  });
});
