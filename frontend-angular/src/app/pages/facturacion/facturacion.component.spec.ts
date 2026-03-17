import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { FacturacionComponent } from './facturacion.component';
import { FacturacionService } from '../../services/facturacion.service';
import { AuthService } from '../../services/autenticacion.service';
import { VistasService } from '../../services/vistas.service';

const facturaDto = { idPago: 40903, idClienteFactura: 1, cufe: 'CUFE-1', urlPdf: 'http://pdf' };

describe('FacturacionComponent', () => {
  let component: FacturacionComponent;
  let facturacionService: jasmine.SpyObj<FacturacionService>;
  let authService: jasmine.SpyObj<AuthService>;
  let vistasService: jasmine.SpyObj<VistasService>;

  beforeEach(async () => {
    const facturacionSpy = jasmine.createSpyObj<FacturacionService>('FacturacionService', [
      'obtenerClientesFactura',
      'crearFactura',
      'crearClienteFactura',
    ]);
    const authSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getUsuarioActual']);
    const vistasSpy = jasmine.createSpyObj<VistasService>('VistasService', ['getFacturacion']);

    await TestBed.configureTestingModule({
      imports: [FacturacionComponent],
      providers: [
        { provide: FacturacionService, useValue: facturacionSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: VistasService, useValue: vistasSpy },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(FacturacionComponent);
    component = fixture.componentInstance;
    facturacionService = TestBed.inject(FacturacionService) as jasmine.SpyObj<FacturacionService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    vistasService = TestBed.inject(VistasService) as jasmine.SpyObj<VistasService>;

    authService.getUsuarioActual.and.returnValue({ idEmpresa: 1 } as any);
    facturacionService.obtenerClientesFactura.and.returnValue(of([]));
    vistasService.getFacturacion.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debe crear factura y mostrar mensaje de exito', () => {
    facturacionService.crearFactura.and.returnValue(of({ id: 1 } as any));

    component.onCrearFactura(facturaDto as any);

    expect(component.mensajeExito).toContain('Factura creada');
  });

  it('debe manejar error al crear factura', () => {
    facturacionService.crearFactura.and.returnValue(throwError(() => ({ status: 400 })));

    component.onCrearFactura(facturaDto as any);

    expect(component.errorMessage).toContain('Error al crear la factura');
  });
});
