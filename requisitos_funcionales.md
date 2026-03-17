# Requisitos funcionales

## Alcance funcional
- El sistema debe permitir la gestion de parqueaderos para empresas (multiempresa).
- El sistema debe permitir el registro y control de reservas de parqueo.
- El sistema debe permitir el registro y consulta de pagos.
- El sistema debe permitir la facturacion electronica asociada a pagos.
- El sistema debe permitir la gestion de usuarios con roles diferenciados.
- El sistema debe proveer vistas de consulta y reportes operativos y financieros.
- El sistema debe ofrecer autenticacion con usuario y contrasena.

## Requisitos por modulo

### Autenticacion y usuarios
- RF-01: El sistema debe permitir registrar usuarios operadores.
- RF-02: El sistema debe permitir iniciar sesion con correo y contrasena.
- RF-03: El sistema debe permitir crear usuarios operadores desde un administrador.
- RF-04: El sistema debe permitir consultar usuarios por empresa.
- RF-05: El sistema debe permitir consultar detalle de usuario.
- RF-06: El sistema debe permitir eliminar un usuario operador.

### Empresas
- RF-07: El sistema debe permitir listar empresas.
- RF-08: El sistema debe permitir consultar detalle de una empresa.

### Parqueaderos
- RF-09: El sistema debe permitir crear parqueaderos por empresa.
- RF-10: El sistema debe permitir listar parqueaderos por empresa.
- RF-11: El sistema debe permitir consultar un parqueadero por id.

### Celdas
- RF-12: El sistema debe permitir crear celdas en un parqueadero.
- RF-13: El sistema debe permitir listar celdas por parqueadero.
- RF-14: El sistema debe permitir consultar celda por id.
- RF-15: El sistema debe permitir actualizar el estado de una celda.

### Vehiculos
- RF-16: El sistema debe permitir registrar vehiculos.
- RF-17: El sistema debe permitir buscar vehiculos por placa.
- RF-18: El sistema debe permitir consultar vehiculo por id.

### Reservas
- RF-19: El sistema debe permitir crear reservas.
- RF-20: El sistema debe permitir finalizar reservas.
- RF-21: El sistema debe permitir listar reservas activas.
- RF-22: El sistema debe permitir listar reservas por parqueadero.
- RF-23: El sistema debe permitir consultar reserva por id.

### Pagos
- RF-24: El sistema debe permitir crear pagos asociados a reservas.
- RF-25: El sistema debe permitir consultar pagos por parqueadero.
- RF-26: El sistema debe permitir consultar pago por reserva.
- RF-27: El sistema debe permitir consultar pago por id.

### Facturacion
- RF-28: El sistema debe permitir registrar clientes de facturacion.
- RF-29: El sistema debe permitir crear facturas electronicas.
- RF-30: El sistema debe permitir marcar una factura como enviada.
- RF-31: El sistema debe permitir consultar facturas por pago.
- RF-32: El sistema debe permitir listar clientes de facturacion.

### Tarifas
- RF-33: El sistema debe permitir crear tarifas por parqueadero y tipo de vehiculo.
- RF-34: El sistema debe permitir listar tarifas por parqueadero.
- RF-35: El sistema debe permitir actualizar una tarifa.

### Reportes
- RF-36: El sistema debe permitir crear reportes de ingresos.
- RF-37: El sistema debe permitir listar reportes por parqueadero.
- RF-38: El sistema debe permitir consultar reporte por id.
- RF-39: El sistema debe permitir actualizar la URL del archivo de reporte.

### Vistas (consultas)
- RF-40: El sistema debe permitir consultar ocupacion por empresa.
- RF-41: El sistema debe permitir consultar ocupacion por parqueadero.
- RF-42: El sistema debe permitir consultar historial de reservas por empresa.
- RF-43: El sistema debe permitir consultar historial por placa y parqueadero.
- RF-44: El sistema debe permitir consultar facturacion por empresa.
- RF-45: El sistema debe permitir consultar facturacion por documento.
- RF-46: El sistema debe permitir consultar ingresos por empresa.
- RF-47: El sistema debe permitir consultar ingresos por parqueadero.
- RF-48: El sistema debe permitir procesar el pago de una reserva desde una vista.
- RF-49: El sistema debe permitir buscar vehiculos por placa desde vistas.

## Reglas funcionales asociadas (resumen)
- RF-50: El sistema debe impedir pagos duplicados para una misma reserva.
- RF-51: El sistema debe permitir pago solo si la reserva esta abierta.
- RF-52: El sistema debe sincronizar el cierre de reserva con la liberacion de celda.
- RF-53: El sistema debe permitir multiempresa con datos aislados por empresa.
- RF-54: El sistema debe mantener roles diferenciados (administrador y operador).

## Restricciones de la version (alcance negativo)
- RF-55: No se integra hardware de control (camaras, sensores, barreras).
- RF-56: No hay reconocimiento automatico de placas.
- RF-57: No hay pasarelas de pago externas en esta version.
- RF-58: No hay aplicacion movil nativa.
- RF-59: No hay integracion contable automatica con terceros.
- RF-60: No hay politicas avanzadas de tarifas (membresias, descuentos, validaciones).
