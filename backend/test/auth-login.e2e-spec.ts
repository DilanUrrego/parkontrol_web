import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';

const validEmail = 'ema1001cano@gmail.com';
const validPassword = 'Prueba1.';
const invalidEmail = 'ema1010@gmail.com';
const invalidPassword = 'prueba1.';

describe('AuthController (e2e) - Login caja negra', () => {
	let app: INestApplication<App>;

	const authServiceMock = {
		login: jest.fn((payload: { correo: string; contrasena: string }) => {
			const { correo, contrasena } = payload;
			if (correo === validEmail && contrasena === validPassword) {
				return { access_token: 'token-prueba' };
			}
			throw new UnauthorizedException('email o password invalidos');
		}),
	};

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: authServiceMock }],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.setGlobalPrefix('api');
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true,
			})
		);
		await app.init();
	});

	it('debe permitir acceso con credenciales validas', () => {
		return request(app.getHttpServer())
			.post('/api/auth/login')
			.send({ correo: validEmail, contrasena: validPassword })
			.expect(201)
			.expect(({ body }) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('debe rechazar cuando el correo es invalido', () => {
		return request(app.getHttpServer())
			.post('/api/auth/login')
			.send({ correo: invalidEmail, contrasena: validPassword })
			.expect(401);
	});

	it('debe rechazar cuando la contrasena es invalida', () => {
		return request(app.getHttpServer())
			.post('/api/auth/login')
			.send({ correo: validEmail, contrasena: invalidPassword })
			.expect(401);
	});

	it('debe validar campos vacios', () => {
		return request(app.getHttpServer())
			.post('/api/auth/login')
			.send({ correo: '', contrasena: '' })
			.expect(400);
	});
});
