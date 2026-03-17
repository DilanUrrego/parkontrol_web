# Reglas de negocio

## Roles y acceso
- RN-01: El sistema debe manejar roles de usuario administrador y operador.
- RN-02: El administrador gestiona usuarios operadores, reportes e indicadores.
- RN-03: El operador ejecuta el flujo operativo de reservas y pagos.

## Multiempresa
- RN-04: Cada empresa administra sus propios parqueaderos, celdas, usuarios y datos.
- RN-05: Un usuario solo puede operar sobre los datos de su empresa.

## Reservas
- RN-06: Una reserva inicia con fecha de entrada y termina con fecha de salida.
- RN-07: Una reserva activa representa un vehiculo en una celda ocupada.
- RN-08: Finalizar una reserva libera la celda asociada.

## Pagos
- RN-09: Un pago debe estar asociado a una reserva valida.
- RN-10: Una reserva solo puede tener un pago (no se permiten pagos duplicados).
- RN-11: Solo se permite pago si la reserva esta abierta.
- RN-12: Al procesar un pago, la reserva pasa a finalizada.

## Facturacion
- RN-13: Una factura electronica debe estar asociada a un pago.
- RN-14: Una factura debe estar asociada a un cliente de facturacion.
- RN-15: La factura puede marcarse como enviada una vez generada.

## Tarifas
- RN-16: Cada parqueadero define tarifas por tipo de vehiculo.
- RN-17: El valor a cobrar se calcula por tiempo de permanencia segun tarifa.

## Vehiculos
- RN-18: La placa del vehiculo es unica en el sistema.
- RN-19: El registro de vehiculos es manual por parte del operador.

## Reportes y vistas
- RN-20: Los reportes se generan por parqueadero y periodo.
- RN-21: Las vistas deben permitir consulta de ocupacion, historial, facturacion e ingresos.

## Restricciones de la version
- RN-22: No se integran dispositivos fisicos (sensores, camaras, barreras).
- RN-23: No se realiza reconocimiento automatico de placas.
- RN-24: No se integran pasarelas de pago externas en esta version.
- RN-25: No se ofrece aplicacion movil nativa.
- RN-26: No se integra software contable externo; solo exportacion.
- RN-27: No hay politicas avanzadas de tarifas (membresias, descuentos, validaciones).
