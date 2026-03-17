import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

const validEmail = 'ema1001cano@gmail.com';
const validPassword = 'Prueba1.';
const invalidEmail = 'ema1010@gmail.com';
const invalidPassword = 'prueba1.';

describe('AuthService', () => {
  let service: AuthService;
  let usuariosService: { findUsuarioByCorreo: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    usuariosService = { findUsuarioByCorreo: jest.fn() };
    jwtService = { sign: jest.fn().mockReturnValue('token-prueba') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuariosService, useValue: usuariosService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('debe devolver token con credenciales validas', async () => {
    const user = {
      id: 1,
      correo: validEmail,
      contrasena: 'hash',
      rol: { nombre: 'ADMINISTRADOR' },
      empresa: { id: 10 },
    };
    usuariosService.findUsuarioByCorreo.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login({ correo: validEmail, contrasena: validPassword });

    expect(result.access_token).toBe('token-prueba');
    expect(jwtService.sign).toHaveBeenCalled();
  });

  it('debe rechazar correo invalido', async () => {
    usuariosService.findUsuarioByCorreo.mockResolvedValue(null);
    await expect(
      service.login({ correo: invalidEmail, contrasena: validPassword })
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('debe rechazar contrasena invalida', async () => {
    const user = {
      id: 1,
      correo: validEmail,
      contrasena: 'hash',
      rol: { nombre: 'ADMINISTRADOR' },
      empresa: { id: 10 },
    };
    usuariosService.findUsuarioByCorreo.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login({ correo: validEmail, contrasena: invalidPassword })
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
