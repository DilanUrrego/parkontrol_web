import { Body, Controller, Get, Param, ParseIntPipe, Post, NotFoundException } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './entities/dto/crear-vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';

@Controller('vehicles')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  // @Roles(RoleEnum.ADMIN, RoleEnum.OPERADOR) // REMOVED FOR BackendSinAuth
  // @UseGuards(JwtAuthGuard, RolesGuard) // REMOVED FOR BackendSinAuth
  async crear(@Body() createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
    return await this.vehiculosService.crear(createVehiculoDto);
  }

  @Get('placa/:placa')
  // @Roles(RoleEnum.ADMIN, RoleEnum.OPERADOR) // REMOVED FOR BackendSinAuth
  // @UseGuards(JwtAuthGuard, RolesGuard) // REMOVED FOR BackendSinAuth
  async obtenerPorPlaca(@Param('placa') placa: string): Promise<Vehiculo> {
    const vehiculo = await this.vehiculosService.findByPlaca(placa);
    if (!vehiculo) {
      throw new NotFoundException(`No existe vehículo con placa: ${placa}`);
    }
    return vehiculo;
  }

  @Get(':id')
  // @Roles(RoleEnum.ADMIN, RoleEnum.OPERADOR) // REMOVED FOR BackendSinAuth
  // @UseGuards(JwtAuthGuard, RolesGuard) // REMOVED FOR BackendSinAuth
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Vehiculo> {
    return await this.vehiculosService.findVehiculoById(id);
  }
}
