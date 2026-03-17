import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ReservasComponent } from './reservas.component';
import { ReservasService } from '../../services/reservas.service';
import { ParqueaderosService } from '../../services/parqueaderos.service';
import { AuthService } from '../../services/autenticacion.service';
import { PagosService } from '../../services/pagos.service';

const parqueaderosMock = [{ id: 321, nombre: 'P1' }];

describe('ReservasComponent', () => {
  let component: ReservasComponent;
  let reservasService: jasmine.SpyObj<ReservasService>;
  let parqueaderosService: jasmine.SpyObj<ParqueaderosService>;
  let authService: jasmine.SpyObj<AuthService>;
  let pagosService: jasmine.SpyObj<PagosService>;

  beforeEach(async () => {
    const reservasSpy = jasmine.createSpyObj<ReservasService>('ReservasService', [
      'getByParqueadero',
      'create',
      'finalizar',
    ]);
    const parqueaderosSpy = jasmine.createSpyObj<ParqueaderosService>('ParqueaderosService', [
      'getByEmpresa',
    ]);
    const authSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'getUsuarioActual',
    ]);
    const pagosSpy = jasmine.createSpyObj<PagosService>('PagosService', ['create']);
    const dialogSpy = { open: () => ({ afterClosed: () => of({ idReserva: 41602 }) }) };

    await TestBed.configureTestingModule({
      imports: [ReservasComponent],
      providers: [
        { provide: ReservasService, useValue: reservasSpy },
        { provide: ParqueaderosService, useValue: parqueaderosSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: PagosService, useValue: pagosSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;
    reservasService = TestBed.inject(ReservasService) as jasmine.SpyObj<ReservasService>;
    parqueaderosService = TestBed.inject(ParqueaderosService) as jasmine.SpyObj<ParqueaderosService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    pagosService = TestBed.inject(PagosService) as jasmine.SpyObj<PagosService>;

    authService.getUsuarioActual.and.returnValue({ idEmpresa: 1 } as any);
    parqueaderosService.getByEmpresa.and.returnValue(of(parqueaderosMock as any));
    reservasService.getByParqueadero.and.returnValue(of([]));
    pagosService.create.and.returnValue(of({ monto: 100 } as any));

    fixture.detectChanges();
  });

  it('debe cargar parqueaderos y reservas al iniciar', () => {
    expect(parqueaderosService.getByEmpresa).toHaveBeenCalled();
    expect(reservasService.getByParqueadero).toHaveBeenCalledWith(321);
  });

  it('debe procesar pago al finalizar reserva', () => {
    component.finalizarReserva({ id: 41602 } as any);
    expect(pagosService.create).toHaveBeenCalled();
  });

  it('debe manejar error en procesar pago', () => {
    pagosService.create.and.returnValue(throwError(() => ({ status: 400, error: { message: 'ABIERTA' } })));

    (component as any).procesarPago({ idReserva: 41602 });

    expect(component.errorMessage).toContain('ABIERTA');
  });
});
