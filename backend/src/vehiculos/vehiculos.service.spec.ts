import { Test, TestingModule } from '@nestjs/testing';
import { VehiculosService } from './vehiculos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { TipoVehiculo } from 'src/shared/entities/tipo-vehiculo.entity';

describe('VehiculosService - HU11 Buscar vehiculo por placa', () => {
  let service: VehiculosService;
  let vehiculoRepository: Repository<Vehiculo>;

  const mockVehiculoRepository = {
    findOne: jest.fn(),
  };

  const mockTipoVehiculoRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiculosService,
        {
          provide: getRepositoryToken(Vehiculo),
          useValue: mockVehiculoRepository,
        },
        {
          provide: getRepositoryToken(TipoVehiculo),
          useValue: mockTipoVehiculoRepository,
        },
      ],
    }).compile();

    service = module.get<VehiculosService>(VehiculosService);
    vehiculoRepository = module.get<Repository<Vehiculo>>(getRepositoryToken(Vehiculo));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * CAMINO 1
   * 1-2-3-4-5
   * Retorna vehículo encontrado
   */
  it('debe retornar el vehículo encontrado por placa', async () => {

    const vehiculoMock = {
      id: 1,
      placa: 'ABC123',
      tipoVehiculo: { id: 1, nombre: 'Carro' },
    };

    mockVehiculoRepository.findOne.mockResolvedValue(vehiculoMock);

    const result = await service.findByPlaca('abc123');

    expect(mockVehiculoRepository.findOne).toHaveBeenCalledWith({
      where: { placa: 'ABC123' },
      relations: ['tipoVehiculo'],
    });

    expect(result).toEqual(vehiculoMock);
  });


  /**
   * Caso cuando no existe vehículo
   */
  it('debe retornar null si el vehículo no existe', async () => {

    mockVehiculoRepository.findOne.mockResolvedValue(null);

    const result = await service.findByPlaca('ABC999');

    expect(mockVehiculoRepository.findOne).toHaveBeenCalled();
    expect(result).toBeNull();
  });

});