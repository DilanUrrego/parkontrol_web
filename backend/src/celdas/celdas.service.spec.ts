import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CeldasService } from './celdas.service';
import { Celda } from './entities/celda.entity';
import { TipoCelda } from 'src/shared/entities/tipo-celda.entity';
import { Sensor } from 'src/shared/entities/sensor.entity';
import { ParqueaderosService } from 'src/parqueaderos/parqueaderos.service';

const createDto = {
  idParqueadero: 321,
  idTipoCelda: 1,
  idSensor: 1,
  estado: 'LIBRE',
};

describe('CeldasService', () => {
  let service: CeldasService;
  const celdaRepo = { create: jest.fn(), save: jest.fn() };
  const tipoRepo = { findOne: jest.fn() };
  const sensorRepo = { findOne: jest.fn() };
  const parqueaderosService = { findParqueaderoById: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CeldasService,
        { provide: getRepositoryToken(Celda), useValue: celdaRepo },
        { provide: getRepositoryToken(TipoCelda), useValue: tipoRepo },
        { provide: getRepositoryToken(Sensor), useValue: sensorRepo },
        { provide: ParqueaderosService, useValue: parqueaderosService },
      ],
    }).compile();

    service = module.get(CeldasService);
  });

  it('debe fallar si no existe tipo de celda', async () => {
    parqueaderosService.findParqueaderoById.mockResolvedValue({ id: 321 });
    tipoRepo.findOne.mockResolvedValue(null);

    await expect(service.crear(createDto as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('debe fallar si no existe sensor', async () => {
    parqueaderosService.findParqueaderoById.mockResolvedValue({ id: 321 });
    tipoRepo.findOne.mockResolvedValue({ id: 1 });
    sensorRepo.findOne.mockResolvedValue(null);

    await expect(service.crear(createDto as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('debe crear celda con datos validos', async () => {
    parqueaderosService.findParqueaderoById.mockResolvedValue({ id: 321 });
    tipoRepo.findOne.mockResolvedValue({ id: 1 });
    sensorRepo.findOne.mockResolvedValue({ id: 1 });
    celdaRepo.create.mockReturnValue({ id: 1 });
    celdaRepo.save.mockResolvedValue({ id: 1 });

    const result = await service.crear(createDto as any);

    expect(result).toEqual({ id: 1 });
    expect(celdaRepo.save).toHaveBeenCalled();
  });
});
