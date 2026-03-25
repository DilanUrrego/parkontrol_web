import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Para evitar errores de componentes de Material
import { FacturacionComponent } from './facturacion.component';
import { FacturacionService } from '../../services/facturacion.service';
import { AuthService } from '../../services/autenticacion.service';
import { VistasService } from '../../services/vistas.service';
import { ClienteFactura } from '../../models/facturacion.model';

describe('FacturacionComponent - HU-32: Listar clientes de facturación', () => {
  let component: FacturacionComponent;
  let fixture: ComponentFixture<FacturacionComponent>;
  
  let facturacionServiceSpy: jasmine.SpyObj<FacturacionService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let vistasServiceSpy: jasmine.SpyObj<VistasService>;

  const mockClientes: ClienteFactura[] = [
    { id: 1, nombre: 'Cliente Test', numeroDocumento: '123' } as any
  ];

  beforeEach(async () => {
    facturacionServiceSpy = jasmine.createSpyObj('FacturacionService', [
      'obtenerClientesFactura', 
      'crearFactura', 
      'crearClienteFactura'
    ]);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuarioActual']);
    vistasServiceSpy = jasmine.createSpyObj('VistasService', ['getFacturacion']);

    await TestBed.configureTestingModule({
      imports: [FacturacionComponent],
      providers: [
        { provide: FacturacionService, useValue: facturacionServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: VistasService, useValue: vistasServiceSpy }
      ],
      // SOLUCIÓN SIN PAQUETES DE ANIMACIONES:
      // Ignoramos los errores de etiquetas personalizadas de Material (mat-tab, mat-icon)
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(FacturacionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- PRUEBA CAMINO 1 (ÉXITO) ---
  it('Camino 1: Debería asignar clientesFactura cuando el servicio responde con éxito', () => {
    facturacionServiceSpy.obtenerClientesFactura.and.returnValue(of(mockClientes));
    
    component.cargarClientesFactura();

    expect(component.clientesFactura).toEqual(mockClientes);
    expect(component.clientesFactura.length).toBe(1);
  });

  // --- PRUEBA CAMINO ERROR ---
  it('Debería limpiar clientesFactura cuando el servicio falla', () => {
    facturacionServiceSpy.obtenerClientesFactura.and.returnValue(throwError(() => new Error('Error')));

    component.cargarClientesFactura();

    expect(component.clientesFactura).toEqual([]);
  });

  // --- COBERTURA validarPeticiones ---
  it('debería finalizar el estado loading al completar todas las peticiones', () => {
    component.loading = true;
    component.peticionesCompletadas = 1; 
    component.totalPeticiones = 2;

    (component as any).validarPeticiones();

    expect(component.peticionesCompletadas).toBe(2);
    expect(component.loading).toBeFalse();
  });

  // --- COBERTURA ngOnInit ---
  it('debería configurar idEmpresa e iniciar cargas si el usuario existe', () => {
    const mockUsuario = { idEmpresa: 55 };
    authServiceSpy.getUsuarioActual.and.returnValue(mockUsuario as any);
    
    // Espiamos los métodos para verificar que ngOnInit los dispara
    spyOn(component, 'cargarClientesFactura');
    spyOn(component, 'cargarFacturas');

    component.ngOnInit();

    expect(component.idEmpresa).toBe(55);
    expect(component.loading).toBeTrue();
    expect(component.cargarClientesFactura).toHaveBeenCalled();
  });
});