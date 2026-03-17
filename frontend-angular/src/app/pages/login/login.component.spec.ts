import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/autenticacion.service';
import { RolUsuario } from '../../models/shared.model';

const validEmail = 'ema1001cano@gmail.com';
const validPassword = 'Prueba1.';
const invalidEmail = 'ema1010@gmail.com';
const invalidPassword = 'prueba1.';

describe('LoginComponent - caja negra', () => {
	let component: LoginComponent;
	let authService: jasmine.SpyObj<AuthService>;
	let router: Router;

	beforeEach(async () => {
		const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
			'login',
			'getUsuarioActual',
		]);

		await TestBed.configureTestingModule({
			imports: [LoginComponent, RouterTestingModule],
			providers: [{ provide: AuthService, useValue: authServiceSpy }],
		}).compileComponents();

		const fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
		router = TestBed.inject(Router);
		spyOn(router, 'navigate');
		fixture.detectChanges();
	});

	it('debe permitir acceso con credenciales validas', () => {
		authService.login.and.returnValue(of({ access_token: 'token' }));
		authService.getUsuarioActual.and.returnValue({
			id: 1,
			nombre: '',
			correo: validEmail,
			rol: RolUsuario.ADMINISTRADOR,
			idEmpresa: 1,
		});

		component.loginForm.setValue({
			correo: validEmail,
			contrasena: validPassword,
		});

		component.onSubmit();

		expect(authService.login).toHaveBeenCalledWith({
			correo: validEmail,
			contrasena: validPassword,
		});
		expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
	});

	it('debe rechazar cuando el correo es invalido', () => {
		authService.login.and.returnValue(
			throwError(() => new HttpErrorResponse({ status: 401 }))
		);

		component.loginForm.setValue({
			correo: invalidEmail,
			contrasena: validPassword,
		});

		component.onSubmit();

		expect(authService.login).toHaveBeenCalled();
		expect(component.errorMessage).toContain('Acceso rechazado');
	});

	it('debe rechazar cuando la contrasena es invalida', () => {
		authService.login.and.returnValue(
			throwError(() => new HttpErrorResponse({ status: 401 }))
		);

		component.loginForm.setValue({
			correo: validEmail,
			contrasena: invalidPassword,
		});

		component.onSubmit();

		expect(authService.login).toHaveBeenCalled();
		expect(component.errorMessage).toContain('Acceso rechazado');
	});

	it('debe validar campos vacios', () => {
		component.loginForm.setValue({
			correo: '',
			contrasena: '',
		});

		component.onSubmit();

		expect(authService.login).not.toHaveBeenCalled();
	});
});
