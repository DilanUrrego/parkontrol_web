import { Test, TestingModule } from '@nestjs/testing';
import { ParqueaderosService } from './parqueaderos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Parqueadero } from './entities/parqueadero.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { EmpresasService } from 'src/empresas/empresas.service';

describe('ParqueaderosService - HU07 findParqueaderoById', () => {
  let service: ParqueaderosService;
  let repository: jest.Mocked<Repository<Parqueadero>>;

  const mockRepository = {
    findOne: jest.fn(),
  };

  const mockEmpresasService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParqueaderosService,
        {
          provide: getRepositoryToken(Parqueadero),
          useValue: mockRepository,
        },
        {
          provide: EmpresasService,
          useValue: mockEmpresasService,
        },
      ],
    }).compile();

    service = module.get<ParqueaderosService>(ParqueaderosService);
    repository = module.get(getRepositoryToken(Parqueadero));
    jest.clearAllMocks();
  });

  // ✅ CAMINO 1: 1-2-3-4 → retorna el parqueadero
  it('debe retornar el parqueadero cuando existe (Camino 1-2-3-4)', async () => {
    const id = 1;

    const parqueaderoMock = {
      id: 1,
      nombre: 'Parqueadero Central',
      capacidadTotal: 100,
      ubicacion: 'Centro',
      empresa: { id: 10 },
    } as Parqueadero;

    repository.findOne.mockResolvedValue(parqueaderoMock);

    const resultado = await service.findParqueaderoById(id);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['empresa'],
    });

    expect(resultado).toBe(parqueaderoMock);
  });

  // ❌ CAMINO 2: 1-2-3-5 → lanza NotFoundException
  it('debe lanzar NotFoundException cuando no existe (Camino 1-2-3-5)', async () => {
    const id = 999;

    repository.findOne.mockResolvedValue(null);

    await expect(service.findParqueaderoById(id))
      .rejects
      .toThrow(NotFoundException);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['empresa'],
    });
  });
});