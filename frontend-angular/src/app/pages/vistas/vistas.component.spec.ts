import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { VistasComponent } from './vistas.component';
import { AuthService } from '../../services/autenticacion.service';
import { VistasService } from '../../services/vistas.service';

const ocupacionMock = [{ totalCeldas: 10, celdasOcupadas: 3 }];

describe('VistasComponent', () => {
  let component: VistasComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let vistasService: jasmine.SpyObj<VistasService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getUsuarioActual']);
    const vistasSpy = jasmine.createSpyObj<VistasService>('VistasService', [
      'getOcupacion',
      'getHistorialReservas',
      'getIngresos',
      'getFacturacion',
    ]);

    await TestBed.configureTestingModule({
      imports: [VistasComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: VistasService, useValue: vistasSpy },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(VistasComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    vistasService = TestBed.inject(VistasService) as jasmine.SpyObj<VistasService>;

    authService.getUsuarioActual.and.returnValue({ idEmpresa: 1 } as any);
    vistasService.getOcupacion.and.returnValue(of(ocupacionMock as any));
    vistasService.getHistorialReservas.and.returnValue(of([]));
    vistasService.getIngresos.and.returnValue(of([]));
    vistasService.getFacturacion.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debe cargar ocupacion por empresa al iniciar', () => {
    expect(vistasService.getOcupacion).toHaveBeenCalledWith(1);
  });

  it('debe calcular promedio de ocupacion', () => {
    expect(component.promedioOcupacion).toBeGreaterThan(0);
  });
});
