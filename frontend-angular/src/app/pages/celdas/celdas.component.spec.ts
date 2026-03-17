import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { CeldasComponent } from './celdas.component';
import { CeldasService } from '../../services/celdas.service';
import { ParqueaderosService } from '../../services/parqueaderos.service';
import { AuthService } from '../../services/autenticacion.service';

const parqueaderosMock = [{ id: 321, nombre: 'P1' }];

describe('CeldasComponent', () => {
  let component: CeldasComponent;
  let celdasService: jasmine.SpyObj<CeldasService>;
  let parqueaderosService: jasmine.SpyObj<ParqueaderosService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const celdasSpy = jasmine.createSpyObj<CeldasService>('CeldasService', [
      'getByParqueadero',
      'create',
      'updateEstado',
    ]);
    const parqueaderosSpy = jasmine.createSpyObj<ParqueaderosService>('ParqueaderosService', [
      'getByEmpresa',
    ]);
    const authSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'getUsuarioActual',
      'isAdministrador',
    ]);
    const dialogSpy = { open: () => ({ afterClosed: () => of(null) }) };

    await TestBed.configureTestingModule({
      imports: [CeldasComponent],
      providers: [
        { provide: CeldasService, useValue: celdasSpy },
        { provide: ParqueaderosService, useValue: parqueaderosSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CeldasComponent);
    component = fixture.componentInstance;
    celdasService = TestBed.inject(CeldasService) as jasmine.SpyObj<CeldasService>;
    parqueaderosService = TestBed.inject(ParqueaderosService) as jasmine.SpyObj<ParqueaderosService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    authService.getUsuarioActual.and.returnValue({ idEmpresa: 1 } as any);
    authService.isAdministrador.and.returnValue(true);
    parqueaderosService.getByEmpresa.and.returnValue(of(parqueaderosMock as any));
    celdasService.getByParqueadero.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debe cargar parqueaderos y celdas al iniciar', () => {
    expect(parqueaderosService.getByEmpresa).toHaveBeenCalled();
    expect(celdasService.getByParqueadero).toHaveBeenCalledWith(321);
  });

  it('debe mostrar error al crear celda con tipo invalido', () => {
    celdasService.create.and.returnValue(
      throwError(() => ({ status: 404, error: { message: 'tipo' } }))
    );

    (component as any).crearCelda({});

    expect(component.errorMessage).toContain('tipo de celda');
  });
});
