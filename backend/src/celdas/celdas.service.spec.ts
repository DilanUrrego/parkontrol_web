import { Test, TestingModule } from '@nestjs/testing';
import { CeldasService } from './celdas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Celda } from './entities/celda.entity';
import { TipoCelda } from 'src/shared/entities/tipo-celda.entity';
import { Sensor } from 'src/shared/entities/sensor.entity';
import { ParqueaderosService } from 'src/parqueaderos/parqueaderos.service';

describe('CeldasService - HU09 findByParqueadero', () => {
  let service: CeldasService;
  let celdaRepository: jest.Mocked<Repository<Celda>>;

  const mockCeldaRepository = {
    find: jest.fn(),
  };

  const mockTipoCeldaRepository = {};
  const mockSensorRepository = {};
  const mockParqueaderosService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CeldasService,
        {
          provide: getRepositoryToken(Celda),
          useValue: mockCeldaRepository,
        },
        {
          provide: getRepositoryToken(TipoCelda),
          useValue: mockTipoCeldaRepository,
        },
        {
          provide: getRepositoryToken(Sensor),
          useValue: mockSensorRepository,
        },
        {
          provide: ParqueaderosService,
          useValue: mockParqueaderosService,
        },
      ],
    }).compile();

    service = module.get<CeldasService>(CeldasService);
    celdaRepository = module.get(getRepositoryToken(Celda));
    jest.clearAllMocks();
  });

  // ✅ CAMINO 1: 1-2-3 → Retorna lista de celdas
  it('debe retornar la lista de celdas de un parqueadero (Camino 1-2-3)', async () => {
    const idParqueadero = 1;

    const celdasMock = [
      {
        id: 1,
        estado: 'DISPONIBLE',
        parqueadero: { id: 1 },
        tipoCelda: { id: 1 },
        sensor: { id: 1 },
      },
      {
        id: 2,
        estado: 'OCUPADA',
        parqueadero: { id: 1 },
        tipoCelda: { id: 2 },
        sensor: { id: 2 },
      },
    ] as Celda[];

    celdaRepository.find.mockResolvedValue(celdasMock);

    const resultado = await service.findByParqueadero(idParqueadero);

    expect(celdaRepository.find).toHaveBeenCalledWith({
      where: { parqueadero: { id: idParqueadero } },
      relations: ['parqueadero', 'tipoCelda', 'sensor'],
    });

    expect(resultado).toEqual(celdasMock);
  });
});