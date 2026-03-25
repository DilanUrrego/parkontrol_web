import { Test, TestingModule } from '@nestjs/testing';
import { ReportesService } from './reportes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { Periodo } from 'src/shared/entities/periodo.entity';
import { ParqueaderosService } from 'src/parqueaderos/parqueaderos.service';

describe('ReportesService - HU37 findByParqueadero', () => {
  let service: ReportesService;
  let reporteRepository: jest.Mocked<Repository<Reporte>>;

  const mockReporteRepository = {
    find: jest.fn(),
  };

  const mockPeriodoRepository = {};
  const mockParqueaderosService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportesService,
        {
          provide: getRepositoryToken(Reporte),
          useValue: mockReporteRepository,
        },
        {
          provide: getRepositoryToken(Periodo),
          useValue: mockPeriodoRepository,
        },
        {
          provide: ParqueaderosService,
          useValue: mockParqueaderosService,
        },
      ],
    }).compile();

    service = module.get<ReportesService>(ReportesService);
    reporteRepository = module.get(getRepositoryToken(Reporte));

    jest.clearAllMocks();
  });

  // ✅ CAMINO 1: 1-2-3-4 → Retorna lista de reportes
  it('debe retornar reportes por parqueadero ordenados por id DESC', async () => {
    const idParqueadero = 5;

    const reportesMock = [
      { id: 10 },
      { id: 9 },
    ] as Reporte[];

    reporteRepository.find.mockResolvedValue(reportesMock);

    const resultado = await service.findByParqueadero(idParqueadero);

    // 🔥 Verifica la query completa (MUY IMPORTANTE)
    expect(reporteRepository.find).toHaveBeenCalledWith({
      where: { parqueadero: { id: idParqueadero } },
      relations: ['parqueadero', 'periodo'],
      order: { id: 'DESC' },
    });

    expect(resultado).toEqual(reportesMock);
  });
});