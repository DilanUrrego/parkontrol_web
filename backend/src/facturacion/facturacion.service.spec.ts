import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FacturacionService } from './facturacion.service';
import { FacturaElectronica } from './entities/factura-electronica.entity';
import { ClienteFactura } from './entities/cliente-factura.entity';
import { PagosService } from 'src/pagos/pagos.service';

const createFacturaDto = {
  idPago: 40903,
  idClienteFactura: 1,
  cufe: 'CUFE-1',
  urlPdf: 'http://pdf',
};

describe('FacturacionService', () => {
  let service: FacturacionService;
  const facturaRepo = { create: jest.fn(), save: jest.fn(), findOne: jest.fn() };
  const clienteRepo = { findOne: jest.fn(), create: jest.fn(), save: jest.fn(), find: jest.fn() };
  const pagosService = { findPagoById: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturacionService,
        { provide: getRepositoryToken(FacturaElectronica), useValue: facturaRepo },
        { provide: getRepositoryToken(ClienteFactura), useValue: clienteRepo },
        { provide: PagosService, useValue: pagosService },
      ],
    }).compile();

    service = module.get(FacturacionService);
  });

  it('debe fallar si no existe cliente', async () => {
    pagosService.findPagoById.mockResolvedValue({ id: 40903 });
    clienteRepo.findOne.mockResolvedValue(null);

    await expect(service.crearFactura(createFacturaDto as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('debe crear factura con datos validos', async () => {
    pagosService.findPagoById.mockResolvedValue({ id: 40903 });
    clienteRepo.findOne.mockResolvedValue({ id: 1 });
    facturaRepo.create.mockReturnValue({ id: 1 });
    facturaRepo.save.mockResolvedValue({ id: 1 });

    const result = await service.crearFactura(createFacturaDto as any);

    expect(result).toEqual({ id: 1 });
    expect(facturaRepo.save).toHaveBeenCalled();
  });
});
