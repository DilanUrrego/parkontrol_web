import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReservasComponent } from './reservas.component';
import { ReservasService } from '../../services/reservas.service';
import { ParqueaderosService } from '../../services/parqueaderos.service';
import { AuthService } from '../../services/autenticacion.service';
import { PagosService } from '../../services/pagos.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { CrearReservaDto } from '../../models/reserva.model';

describe('ReservasComponent - Pruebas Front Crear Reserva', () => {
  let component: ReservasComponent;
  let fixture: ComponentFixture<ReservasComponent>;

  let reservasServiceSpy: jasmine.SpyObj<ReservasService>;
  let parqueaderosServiceSpy: jasmine.SpyObj<ParqueaderosService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const usuarioMock = { id: 1, idEmpresa: 1, nombre: 'Admin' };
  const parqueaderosMock = [{ id: 10, nombre: 'Parqueadero Test', capacidadTotal: 10, ubicacion: 'Centro', idEmpresa: 1 }];
  const reservaDataMock: CrearReservaDto = { idVehiculo: 1, idCelda: 5, estado: 'ABIERTA' };

  beforeEach(async () => {
    // Arrange: Crear los spies (dobles)
    reservasServiceSpy = jasmine.createSpyObj('ReservasService', ['getByParqueadero', 'create']);
    parqueaderosServiceSpy = jasmine.createSpyObj('ParqueaderosService', ['getByEmpresa']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuarioActual']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    authServiceSpy.getUsuarioActual.and.returnValue(usuarioMock as any);
    parqueaderosServiceSpy.getByEmpresa.and.returnValue(of(parqueaderosMock as any));
    reservasServiceSpy.getByParqueadero.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ReservasComponent, MatDialogModule ],
      providers: [
        { provide: ReservasService, useValue: reservasServiceSpy },
        { provide: ParqueaderosService, useValue: parqueaderosServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: PagosService, useValue: jasmine.createSpyObj('PagosService', ['create']) },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;

    spyOn(console, 'log');
    spyOn(console, 'error');
  });

  // ============================
  // ngOnInit y carga inicial
  // ============================
  it('ngOnInit debería cargar parqueaderos y reservas', fakeAsync(() => {
    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(parqueaderosServiceSpy.getByEmpresa).toHaveBeenCalledWith(usuarioMock.idEmpresa);
    expect(component.parqueaderos.length).toBe(1);
    expect(component.parqueaderoSeleccionado).toBe(parqueaderosMock[0].id);
    expect(reservasServiceSpy.getByParqueadero).toHaveBeenCalledWith(parqueaderosMock[0].id);
  }));

  // ============================
  // Cambio de parqueadero
  // ============================
  it('onParqueaderoCambia debería actualizar parqueadero y recargar reservas', fakeAsync(() => {
    // Act
    component.onParqueaderoCambia(10);
    tick();

    // Assert
    expect(component.parqueaderoSeleccionado).toBe(10);
    expect(reservasServiceSpy.getByParqueadero).toHaveBeenCalledWith(10);
  }));

  // ============================
  // Abrir modal y crear reserva - éxito
  // ============================
  it('abrirModalCrear crea reserva correctamente', fakeAsync(() => {
    // Arrange
    dialogSpy.open.and.returnValue({ afterClosed: () => of(reservaDataMock) } as any);
    reservasServiceSpy.create.and.returnValue(of({} as any));
    component.parqueaderoSeleccionado = 10;

    // Act
    component.abrirModalCrear();
    tick();
    tick();

    // Assert
    expect(reservasServiceSpy.create).toHaveBeenCalledWith(reservaDataMock);
    expect(reservasServiceSpy.getByParqueadero).toHaveBeenCalledWith(10);
    expect(console.log).toHaveBeenCalledWith('Reserva creada exitosamente');
  }));

  // ============================
  // Modal cerrado sin crear
  // ============================
  it('abrirModalCrear no crea reserva si modal se cierra', fakeAsync(() => {
    // Arrange
    dialogSpy.open.and.returnValue({ afterClosed: () => of(null) } as any);
    component.parqueaderoSeleccionado = 10;

    // Act
    component.abrirModalCrear();
    tick();

    // Assert
    expect(reservasServiceSpy.create).not.toHaveBeenCalled();
  }));

  // ============================
  // Error 400 celda ocupada
  // ============================
  it('crearReserva muestra error si celda ocupada', fakeAsync(() => {
    // Arrange
    const errorMsg = { status: 400, error: { message: 'La celda no está LIBRE' } };
    reservasServiceSpy.create.and.returnValue(throwError(() => errorMsg));

    // Act
    (component as any).crearReserva(reservaDataMock);

    // Assert
    expect(component.errorMessage).toBe('La celda seleccionada esta OCUPADA');

    tick(5000);
    expect(component.errorMessage).toBe('');
  }));

  // ============================
  // Error genérico
  // ============================
  it('crearReserva muestra error genérico si falla backend', fakeAsync(() => {
    // Arrange
    reservasServiceSpy.create.and.returnValue(throwError(() => new Error('Server Error')));

    // Act
    (component as any).crearReserva(reservaDataMock);

    // Assert
    expect(component.errorMessage).toBe('Error no pudo crear la reserva');

    tick(5000);
    expect(component.errorMessage).toBe('');
  }));

  // ============================
  // getEstadoColor
  // ============================
  it('getEstadoColor retorna azul para ABIERTA y verde para otra', () => {
    expect(component.getEstadoColor('ABIERTA')).toBe('#2196f3');
    expect(component.getEstadoColor('CERRADA')).toBe('#4caf50');
  });
});