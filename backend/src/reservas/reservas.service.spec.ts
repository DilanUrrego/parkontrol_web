import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { VehiculosService } from 'src/vehiculos/vehiculos.service';
import { CeldasService } from 'src/celdas/celdas.service';

const createDto = { idVehiculo: 10, idCelda: 20, estado: 'ABIERTA' };

describe('ReservasService', () => {
  let service: ReservasService;
  const reservaRepo = { create: jest.fn(), save: jest.fn(), findOne: jest.fn() };
  const vehiculosService = { findVehiculoById: jest.fn() };
  const celdasService = { findCeldaById: jest.fn(), actualizarEstado: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        { provide: getRepositoryToken(Reserva), useValue: reservaRepo },
        { provide: VehiculosService, useValue: vehiculosService },
        { provide: CeldasService, useValue: celdasService },
      ],
    }).compile();

    service = module.get(ReservasService);
  });

  it('debe rechazar crear reserva si la celda no esta LIBRE', async () => {
    vehiculosService.findVehiculoById.mockResolvedValue({ id: 10 });
    celdasService.findCeldaById.mockResolvedValue({ id: 20, estado: 'OCUPADA' });

    await expect(service.crear(createDto as any)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('debe crear reserva y ocupar la celda', async () => {
    vehiculosService.findVehiculoById.mockResolvedValue({ id: 10 });
    celdasService.findCeldaById.mockResolvedValue({ id: 20, estado: 'LIBRE' });
    reservaRepo.create.mockReturnValue({ id: 1 });
    reservaRepo.save.mockResolvedValue({ id: 1, celda: { id: 20 } });

    const result = await service.crear(createDto as any);

    expect(result).toEqual({ id: 1, celda: { id: 20 } });
    expect(celdasService.actualizarEstado).toHaveBeenCalledWith(20, 'OCUPADA');
  });

  it('debe rechazar finalizar reserva ya cerrada', async () => {
    reservaRepo.findOne.mockResolvedValue({ id: 1, fechaSalida: new Date() });

    await expect(service.finalizarReserva(1)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('debe finalizar reserva y liberar la celda', async () => {
    reservaRepo.findOne.mockResolvedValue({
      id: 1,
      fechaSalida: null,
      celda: { id: 20 },
    });
    reservaRepo.save.mockResolvedValue({ id: 1, celda: { id: 20 } });

    const result = await service.finalizarReserva(1);

    expect(result).toEqual({ id: 1, celda: { id: 20 } });
    expect(celdasService.actualizarEstado).toHaveBeenCalledWith(20, 'LIBRE');
  });
});
