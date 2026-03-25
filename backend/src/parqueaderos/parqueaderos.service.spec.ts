import { Test, TestingModule } from '@nestjs/testing';
import { ParqueaderosService } from './parqueaderos.service';
import { EmpresasService } from '../empresas/empresas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Parqueadero } from './entities/parqueadero.entity';
import { NotFoundException } from '@nestjs/common';
import { ParqueaderoResponseDto } from './entities/dto/parqueadero-response.dto';
import { Repository } from 'typeorm';

describe('ParqueaderosService (UNIT - AAA)', () => {
  let service: ParqueaderosService;
  let repository: jest.Mocked<Repository<Parqueadero>>;

  const mockParqueaderoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockEmpresasService = {
    findEmpresaById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParqueaderosService,
        { provide: EmpresasService, useValue: mockEmpresasService },
        { provide: getRepositoryToken(Parqueadero), useValue: mockParqueaderoRepository },
      ],
    }).compile();

    service = module.get<ParqueaderosService>(ParqueaderosService);
    repository = module.get(getRepositoryToken(Parqueadero));
    jest.clearAllMocks();
  });

  const dtoBase = {
    nombre: 'Parqueadero Test',
    capacidadTotal: 50,
    ubicacion: 'Calle 123',
    idEmpresa: 1
  };

  // Pruebas de creación
  describe('crear', () => {
    it('C1: Debe lanzar error si la empresa no existe', async () => {
      mockEmpresasService.findEmpresaById.mockResolvedValue(null);

      await expect(service.crear(dtoBase as any))
        .rejects.toThrow(NotFoundException);

      expect(mockParqueaderoRepository.create).not.toHaveBeenCalled();
    });

    it('C2: Debe crear parqueadero correctamente', async () => {
      const empresaMock = { id: 1 };
      const parqueaderoMock = { id: 1, ...dtoBase, empresa: empresaMock };

      mockEmpresasService.findEmpresaById.mockResolvedValue(empresaMock);
      mockParqueaderoRepository.create.mockReturnValue(parqueaderoMock);
      mockParqueaderoRepository.save.mockResolvedValue(parqueaderoMock);

      const result = await service.crear(dtoBase as any);

      expect(result).toBeInstanceOf(ParqueaderoResponseDto);
      expect(result.id).toBe(1);
      expect(mockParqueaderoRepository.create).toHaveBeenCalled();
      expect(mockParqueaderoRepository.save).toHaveBeenCalled();
    });

    it('C3: Debe crear usando datos correctos', async () => {
      const empresaMock = { id: 1 };
      mockEmpresasService.findEmpresaById.mockResolvedValue(empresaMock);

      await service.crear(dtoBase as any);

      expect(mockParqueaderoRepository.create).toHaveBeenCalledWith({
        nombre: dtoBase.nombre,
        capacidadTotal: dtoBase.capacidadTotal,
        ubicacion: dtoBase.ubicacion,
        empresa: empresaMock
      });
    });
  });

  // Pruebas de findParqueaderoById (HU07)
  describe('findParqueaderoById', () => {
    it('debe retornar el parqueadero cuando existe (Camino 1-2-3-4)', async () => {
      const id = 1;
      const parqueaderoMock = {
        id: 1,
        nombre: 'Parqueadero Central',
        capacidadTotal: 100,
        ubicacion: 'Centro',
        empresa: { id: 10 },
      } as Parqueadero;

      mockParqueaderoRepository.findOne.mockResolvedValue(parqueaderoMock);

      const resultado = await service.findParqueaderoById(id);

      expect(mockParqueaderoRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['empresa'],
      });

      expect(resultado).toBe(parqueaderoMock);
    });

    it('debe lanzar NotFoundException cuando no existe (Camino 1-2-3-5)', async () => {
      const id = 999;
      mockParqueaderoRepository.findOne.mockResolvedValue(null);

      await expect(service.findParqueaderoById(id))
        .rejects
        .toThrow(NotFoundException);

      expect(mockParqueaderoRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['empresa'],
      });
    });
  });

  // Pruebas de listado
  describe('findAll', () => {
    it('C6: Debe listar todos los parqueaderos', async () => {
      const mock = [{ id: 1, empresa: {} }];
      mockParqueaderoRepository.find.mockResolvedValue(mock);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(ParqueaderoResponseDto);
    });

    it('C7: Debe retornar lista vacía', async () => {
      mockParqueaderoRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  // Pruebas de findByEmpresa
  describe('findByEmpresa', () => {
    it('C8: Debe listar parqueaderos por empresa', async () => {
      const mock = [{ id: 1, empresa: { id: 1 } }];
      mockParqueaderoRepository.find.mockResolvedValue(mock);

      const result = await service.findByEmpresa(1);

      expect(result).toHaveLength(1);
    });

    it('C9: Debe retornar vacío si no hay parqueaderos', async () => {
      mockParqueaderoRepository.find.mockResolvedValue([]);

      const result = await service.findByEmpresa(999);

      expect(result).toEqual([]);
    });
  });

  // Pruebas de obtenerDetalle
  describe('obtenerDetalle', () => {
    it('C10: Debe obtener detalle correctamente', async () => {
      const mock = { id: 1, empresa: {} };
      mockParqueaderoRepository.findOne.mockResolvedValue(mock);

      const result = await service.obtenerDetalle(1);

      expect(result).toBeInstanceOf(ParqueaderoResponseDto);
    });

    it('C11: Debe lanzar error en detalle si no existe', async () => {
      mockParqueaderoRepository.findOne.mockResolvedValue(null);

      await expect(service.obtenerDetalle(999))
        .rejects.toThrow(NotFoundException);
    });
  });
});