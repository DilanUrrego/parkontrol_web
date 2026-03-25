import { Test, TestingModule } from '@nestjs/testing';
import { FacturacionService } from './facturacion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteFactura } from './entities/cliente-factura.entity';
import { FacturaElectronica } from './entities/factura-electronica.entity';
import { PagosService } from 'src/pagos/pagos.service';

describe('FacturacionService - HU32 obtenerClientes', () => {
  let service: FacturacionService;
  let clienteFacturaRepository: jest.Mocked<Repository<ClienteFactura>>;

  const mockClienteFacturaRepository = {
    find: jest.fn(),
  };

  const mockFacturaRepository = {};
  const mockPagosService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturacionService,
        {
          provide: getRepositoryToken(FacturaElectronica),
          useValue: mockFacturaRepository,
        },
        {
          provide: getRepositoryToken(ClienteFactura),
          useValue: mockClienteFacturaRepository,
        },
        {
          provide: PagosService,
          useValue: mockPagosService,
        },
      ],
    }).compile();

    service = module.get<FacturacionService>(FacturacionService);
    clienteFacturaRepository = module.get(
      getRepositoryToken(ClienteFactura),
    );

    jest.clearAllMocks();
  });

  // ✅ CAMINO 1: 1-2-3 → Retorna array
  it('debe retornar la lista de clientes de facturación (Camino 1-2-3)', async () => {
    const clientesMock = [
      { id: 1, tipoDocumento: "CC", numeroDocumento: "1234567890", correo: "test@example.com" },
      { id: 2, tipoDocumento: "CC", numeroDocumento: "0123456789", correo: "example@test.com" },
    ] as ClienteFactura[];

    clienteFacturaRepository.find.mockResolvedValue(clientesMock);

    const resultado = await service.obtenerClientes();

    expect(clienteFacturaRepository.find).toHaveBeenCalled();
    expect(resultado).toEqual(clientesMock);
  });
});