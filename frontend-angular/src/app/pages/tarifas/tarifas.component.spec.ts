import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TarifasComponent } from './tarifas.component';
import { TarifasService } from '../../services/tarifas.service';
import { ParqueaderosService } from '../../services/parqueaderos.service';
import { AuthService } from '../../services/autenticacion.service';
import { MatDialog } from '@angular/material/dialog';

describe('HU-07: Consultar parqueadero por ID (FRONT)', () => {

  let component: TarifasComponent;
  let fixture: ComponentFixture<TarifasComponent>;

  let tarifasServiceMock: any;
  let parqueaderosServiceMock: any;
  let authServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {

    tarifasServiceMock = {
      getByParqueadero: jasmine.createSpy('getByParqueadero').and.returnValue(of([])),
      create: jasmine.createSpy('create').and.returnValue(of({})),
      update: jasmine.createSpy('update').and.returnValue(of({}))
    };

    parqueaderosServiceMock = {
      getByEmpresa: jasmine.createSpy('getByEmpresa').and.returnValue(of([
        { id: 1, nombre: 'Central' }
      ]))
    };

    authServiceMock = {
      getUsuarioActual: jasmine.createSpy('getUsuarioActual').and.returnValue({
        idEmpresa: 10
      })
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(null)
      })
    };

    await TestBed.configureTestingModule({
      imports: [TarifasComponent],
      providers: [
        { provide: TarifasService, useValue: tarifasServiceMock },
        { provide: ParqueaderosService, useValue: parqueaderosServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('Camino 1-2-3: debe cargar parqueaderos y consultar tarifas por ID', () => {

    expect(parqueaderosServiceMock.getByEmpresa).toHaveBeenCalledWith(10);

    expect(component.parqueaderoSeleccionado).toBe(1);

    expect(tarifasServiceMock.getByParqueadero).toHaveBeenCalledWith(1);
    })
})