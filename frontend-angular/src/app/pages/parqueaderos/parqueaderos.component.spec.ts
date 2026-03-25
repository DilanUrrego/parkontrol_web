import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ParqueaderosComponent } from './parqueaderos.component';
import { ParqueaderosService } from '../../services/parqueaderos.service';
import { AuthService } from '../../services/autenticacion.service';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';


describe('ParqueaderosComponent - Validación de Caminos (AAA)', () => {
  let component: ParqueaderosComponent;
  let fixture: ComponentFixture<ParqueaderosComponent>;
  let parqueaderosServiceSpy: jasmine.SpyObj<ParqueaderosService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockMatDialog = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: () => of(null)
    })
  };

  beforeEach(async () => {
    // Arrange (setup de spies y TestBed)
    parqueaderosServiceSpy = jasmine.createSpyObj('ParqueaderosService', ['getByEmpresa', 'create']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuarioActual', 'isAdministrador']);

    authServiceSpy.getUsuarioActual.and.returnValue({ id: 1, idEmpresa: 10 } as any);
    authServiceSpy.isAdministrador.and.returnValue(true);
    parqueaderosServiceSpy.getByEmpresa.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        ParqueaderosComponent
      ],
      providers: [
        { provide: ParqueaderosService, useValue: parqueaderosServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .overrideComponent(ParqueaderosComponent, {
      set: {
        providers: [
          { provide: MatDialog, useValue: mockMatDialog }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueaderosComponent);
    component = fixture.componentInstance;

    spyOn(console, 'log');
    spyOn(console, 'error');
  });

  it('Camino 1: Usuario crea parqueadero exitosamente', fakeAsync(() => {
    // Arrange
    const datos = { nombre: 'P1', ubicacion: 'C1', capacidadTotal: 10, idEmpresa: 10 };
    mockMatDialog.open.and.returnValue({
      afterClosed: () => of(datos)
    });
    parqueaderosServiceSpy.create.and.returnValue(of({ id: 1, ...datos } as any));

    // Act
    component.ngOnInit();
    component.abrirModalCrear();
    tick();

    // Assert
    expect(parqueaderosServiceSpy.create).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Parqueadero creado');
  }));

  it('Camino 2: El backend falla al crear parqueadero', fakeAsync(() => {
    // Arrange
    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ nombre: 'Error' })
    });
    parqueaderosServiceSpy.create.and.returnValue(throwError(() => new Error('Fail')));

    // Act
    component.ngOnInit();
    component.abrirModalCrear();
    tick();

    // Assert
    expect(console.error).toHaveBeenCalled();
  }));

  it('Camino 3: Usuario cancela la creación del parqueadero', fakeAsync(() => {
    // Arrange
    mockMatDialog.open.and.returnValue({
      afterClosed: () => of(null)
    });

    // Act
    component.ngOnInit();
    component.abrirModalCrear();
    tick();

    // Assert
    expect(parqueaderosServiceSpy.create).not.toHaveBeenCalled();
  }));
});