import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { VistasService } from './vistas.service';
import { OcupacionParqueaderoView } from './entities/ocupacion-parqueadero.view';
import { HistorialReservasView } from './entities/historial-reservas.view';
import { FacturacionCompletaView } from './entities/facturacion-completa.view';
import { IngresosPorParqueaderoMensualView } from './entities/ingresos-parqueadero-mensual.view';

const dataSourceMock = { query: jest.fn() };

describe('VistasService', () => {
  let service: VistasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VistasService,
        { provide: getRepositoryToken(OcupacionParqueaderoView), useValue: {} },
        { provide: getRepositoryToken(HistorialReservasView), useValue: {} },
        { provide: getRepositoryToken(FacturacionCompletaView), useValue: {} },
        { provide: getRepositoryToken(IngresosPorParqueaderoMensualView), useValue: {} },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    service = module.get(VistasService);
  });

  it('debe retornar ocupacion por parqueadero con llaves transformadas', async () => {
    dataSourceMock.query.mockResolvedValue([
      { ID_PARQUEADERO: 321, TOTAL_CELDAS: 10, CELDAS_OCUPADAS: 3 },
    ]);

    const result = await service.getOcupacionByParqueadero(321);

    expect(result).toEqual({ idParqueadero: 321, totalCeldas: 10, celdasOcupadas: 3 });
  });

  it('debe retornar null si no hay ocupacion', async () => {
    dataSourceMock.query.mockResolvedValue([]);

    const result = await service.getOcupacionByParqueadero(999);

    expect(result).toBeNull();
  });
});
