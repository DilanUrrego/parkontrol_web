import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { VehiculosService } from '../vehiculos/vehiculos.service';
import { CeldasService } from '../celdas/celdas.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ReservasService (UNIT - AAA SIN FINALIZAR)', () => {
  let service: ReservasService;

  let reservaRepository: any;
  let vehiculosService: any;
  let celdasService: any;

  const dtoBase = { idVehiculo: 1, idCelda: 1, estado: 'ABIERTA' };

  beforeEach(async () => {
    reservaRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    vehiculosService = {
      findVehiculoById: jest.fn(),
    };

    celdasService = {
      findCeldaById: jest.fn(),
      actualizarEstado: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        { provide: getRepositoryToken(Reserva), useValue: reservaRepository },
        { provide: VehiculosService, useValue: vehiculosService },
        { provide: CeldasService, useValue: celdasService },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
    jest.clearAllMocks();
  });

  it('C1: Debe crear reserva correctamente', async () => {
    const vehiculoMock = { id: 1 };
    const celdaMock = { id: 1, estado: 'LIBRE' };
    const reservaMock = { id: 1 };

    vehiculosService.findVehiculoById.mockResolvedValue(vehiculoMock);
    celdasService.findCeldaById.mockResolvedValue(celdaMock);

    reservaRepository.create.mockReturnValue(reservaMock);
    reservaRepository.save.mockResolvedValue(reservaMock);

    const result = await service.crear(dtoBase as any);

    expect(result).toEqual(reservaMock);
    expect(reservaRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        vehiculo: vehiculoMock,
        celda: celdaMock,
        estado: 'ABIERTA',
      })
    );
    expect(celdasService.actualizarEstado).toHaveBeenCalledWith(1, 'OCUPADA');
  });

  it('C2: Debe fallar si el vehículo no existe', async () => {
    vehiculosService.findVehiculoById.mockRejectedValue(new NotFoundException());

    const action = service.crear(dtoBase as any);

    await expect(action).rejects.toThrow(NotFoundException);
    expect(reservaRepository.create).not.toHaveBeenCalled();
  });

  it('C3: Debe fallar si la celda no existe', async () => {
    vehiculosService.findVehiculoById.mockResolvedValue({ id: 1 });
    celdasService.findCeldaById.mockRejectedValue(new NotFoundException());

    const action = service.crear(dtoBase as any);

    await expect(action).rejects.toThrow(NotFoundException);
  });

  it('C4: Debe fallar si la celda no está LIBRE', async () => {
    vehiculosService.findVehiculoById.mockResolvedValue({ id: 1 });
    celdasService.findCeldaById.mockResolvedValue({ id: 1, estado: 'OCUPADA' });

    const action = service.crear(dtoBase as any);

    await expect(action).rejects.toThrow(BadRequestException);
    expect(celdasService.actualizarEstado).not.toHaveBeenCalled();
  });

  it('C5: Debe asignar fechaEntrada automáticamente', async () => {
    vehiculosService.findVehiculoById.mockResolvedValue({ id: 1 });
    celdasService.findCeldaById.mockResolvedValue({ id: 1, estado: 'LIBRE' });

    reservaRepository.create.mockImplementation((data) => data);
    reservaRepository.save.mockImplementation((data) => Promise.resolve(data));

    const result = await service.crear(dtoBase as any);

    expect(result.fechaEntrada).toBeInstanceOf(Date);
  });

  it('C6: Debe retornar reserva por ID', async () => {
    const reservaMock = { id: 1 };

    reservaRepository.findOne.mockResolvedValue(reservaMock);

    const result = await service.findReservaById(1);

    expect(result).toEqual(reservaMock);
    expect(reservaRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['vehiculo', 'vehiculo.tipoVehiculo', 'celda', 'celda.parqueadero'],
    });
  });

  it('C7: Debe fallar si no existe reserva por ID', async () => {
    reservaRepository.findOne.mockResolvedValue(null);

    const action = service.findReservaById(999);

    await expect(action).rejects.toThrow(NotFoundException);
  });

  it('C8: Debe listar reservas por parqueadero', async () => {
    const reservasMock = [{ id: 1 }];
    reservaRepository.find.mockResolvedValue(reservasMock);

    const result = await service.findByParqueadero(1);

    expect(result).toEqual(reservasMock);
    expect(reservaRepository.find).toHaveBeenCalledWith({
      where: { celda: { parqueadero: { id: 1 } } },
      relations: ['vehiculo', 'vehiculo.tipoVehiculo', 'celda'],
      order: { fechaEntrada: 'DESC' },
    });
  });

  it('C9: Debe listar reservas activas', async () => {
    const reservasMock = [{ id: 1, estado: 'ABIERTA' }];
    reservaRepository.find.mockResolvedValue(reservasMock);

    const result = await service.findActivas();

    expect(result).toEqual(reservasMock);
    expect(reservaRepository.find).toHaveBeenCalledWith({
      where: { estado: 'ABIERTA' },
      relations: ['vehiculo', 'vehiculo.tipoVehiculo', 'celda', 'celda.parqueadero'],
    });
  });

});