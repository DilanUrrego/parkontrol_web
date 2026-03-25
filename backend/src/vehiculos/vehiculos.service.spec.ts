import { Test, TestingModule } from '@nestjs/testing';
import { VehiculosService } from './vehiculos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { TipoVehiculo } from 'src/shared/entities/tipo-vehiculo.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('VehiculosService (UNIT)', () => {
  let service: VehiculosService;

  const mockVehiculoRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockTipoVehiculoRepository = {
    findOne: jest.fn(),
  };

  const crearVehiculoMock = (id: number, placa: string, tipo: string) => ({
    id,
    placa,
    tipoVehiculo: { id: 1, nombre: tipo },
  });

  const crearTipoVehiculoMock = (id: number, nombre: string) => ({ id, nombre });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiculosService,
        { provide: getRepositoryToken(Vehiculo), useValue: mockVehiculoRepository },
        { provide: getRepositoryToken(TipoVehiculo), useValue: mockTipoVehiculoRepository },
      ],
    }).compile();

    service = module.get<VehiculosService>(VehiculosService);
    jest.clearAllMocks();
  });

  const dtoBase = { placa: 'ABC123', idTipoVehiculo: 1 };

  it('C1: Debe fallar si la placa ya existe', async () => {
    mockVehiculoRepository.findOne.mockResolvedValue({ id: 1, placa: 'ABC123' });

    await expect(service.crear(dtoBase as any)).rejects.toThrow(ConflictException);
    expect(mockTipoVehiculoRepository.findOne).not.toHaveBeenCalled();
    expect(mockVehiculoRepository.save).not.toHaveBeenCalled();
  });

  it('C2: Debe fallar si el tipo de vehículo no existe', async () => {
    mockVehiculoRepository.findOne.mockResolvedValue(null);
    mockTipoVehiculoRepository.findOne.mockResolvedValue(null);

    await expect(service.crear(dtoBase as any)).rejects.toThrow(NotFoundException);
    expect(mockVehiculoRepository.save).not.toHaveBeenCalled();
  });

  it('C3: Debe crear vehículo correctamente', async () => {
    const tipoVehiculoMock = crearTipoVehiculoMock(1, 'CARRO');
    const vehiculoMock = crearVehiculoMock(1, 'ABC123', 'CARRO');

    mockVehiculoRepository.findOne.mockResolvedValue(null);
    mockTipoVehiculoRepository.findOne.mockResolvedValue(tipoVehiculoMock);
    mockVehiculoRepository.create.mockReturnValue(vehiculoMock);
    mockVehiculoRepository.save.mockResolvedValue(vehiculoMock);

    const result = await service.crear(dtoBase as any);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.placa).toBe('ABC123');
    expect(mockVehiculoRepository.save).toHaveBeenCalled();
  });

  it('C4: Debe encontrar vehículo por placa', async () => {
    const vehiculoMock = crearVehiculoMock(1, 'ABC123', 'CARRO');
    mockVehiculoRepository.findOne.mockResolvedValue(vehiculoMock);

    const result = await service.findByPlaca('ABC123');

    expect(result).toBeDefined();
    expect(result?.placa).toBe('ABC123');
  });

  it('C5: Debe encontrar vehículo por ID', async () => {
    const vehiculoMock = crearVehiculoMock(1, 'ABC123', 'CARRO');
    mockVehiculoRepository.findOne.mockResolvedValue(vehiculoMock);

    const result = await service.findVehiculoById(1);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
  });

  it('C6: Debe fallar al buscar vehículo por ID que no existe', async () => {
    mockVehiculoRepository.findOne.mockResolvedValue(null);

    await expect(service.findVehiculoById(999)).rejects.toThrow(NotFoundException);
  });
});