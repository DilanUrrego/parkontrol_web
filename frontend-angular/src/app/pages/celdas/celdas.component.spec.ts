import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CeldasComponent } from './celdas.component';
import { CeldasService } from '../../services/celdas.service';
import { ParqueaderosService } from '../../services/parqueaderos.service';
import { AuthService } from '../../services/autenticacion.service';
import { MatDialog } from '@angular/material/dialog';
import { Celda } from '../../models/celda.model'; // Importamos el modelo

describe('CeldasComponent - HU-09', () => {
  let component: CeldasComponent;
  let fixture: ComponentFixture<CeldasComponent>;
  let celdasServiceSpy: jasmine.SpyObj<CeldasService>;

  // SOLUCIÓN: Tipamos el mock como un arreglo de Celda
  // Usamos 'as Celda' para que TypeScript no reclame por los campos faltantes en el mock
  const mockCeldas: Celda[] = [
    { 
      id: 1, 
      estado: 'LIBRE', 
      tipoCelda: { id: 1, nombre: 'Carro' }, 
      sensor: { id: 1, estado: 'ACTIVO' } 
    } as any
  ];

  beforeEach(async () => {
    const celdasSpy = jasmine.createSpyObj('CeldasService', ['getByParqueadero']);
    const parqueaderosSpy = jasmine.createSpyObj('ParqueaderosService', ['getByEmpresa']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUsuarioActual', 'isAdministrador']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [CeldasComponent],
      providers: [
        { provide: CeldasService, useValue: celdasSpy },
        { provide: ParqueaderosService, useValue: parqueaderosSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CeldasComponent);
    component = fixture.componentInstance;
    celdasServiceSpy = TestBed.inject(CeldasService) as jasmine.SpyObj<CeldasService>;
  });

  it('Camino 1: Debería cargar las celdas correctamente (Éxito)', () => {
    celdasServiceSpy.getByParqueadero.and.returnValue(of(mockCeldas));

    // Ejecutamos la función
    (component as any).cargarCeldas(1);

    expect(component.loading).toBeFalse();
    expect(component.celdas).toEqual(mockCeldas);
    expect(component.celdasFiltradas.length).toBe(1);
  });

  it('Camino 2: Debería manejar el error cuando no cargan las celdas (Fallo)', () => {
    celdasServiceSpy.getByParqueadero.and.returnValue(throwError(() => ({ status: 500 })));
    spyOn(console, 'error');

    (component as any).cargarCeldas(1);

    expect(component.loading).toBeFalse();
    expect(component.celdas.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith('Error no cargaron las celdas', jasmine.any(Object));
  });
});