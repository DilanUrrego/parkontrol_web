# Historias de usuario y casos de uso

## Historias de usuario (con criterios Given/When/Then)

### HU-01: Registrarme como operador
Como administrador, quiero registrar un operador para asignar responsabilidades.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando registro un operador con nombre, correo y contrasena
  Entonces el operador queda creado y asociado a mi empresa
- Dado que el correo ya existe
  Cuando intento registrar el operador
  Entonces el sistema rechaza el registro por duplicidad
- Dado que faltan datos obligatorios
  Cuando intento registrar el operador
  Entonces el sistema muestra un error de validacion

### HU-02: Iniciar sesion
Como usuario, quiero iniciar sesion para acceder al sistema.

Criterios de aceptacion:
- Dado que tengo credenciales validas
  Cuando inicio sesion
  Entonces accedo al sistema
- Dado que las credenciales son invalidas
  Cuando inicio sesion
  Entonces el sistema rechaza el acceso
- Dado que faltan campos obligatorios
  Cuando intento iniciar sesion
  Entonces el sistema muestra un error de validacion

### HU-03: Crear parqueadero
Como administrador, quiero crear un parqueadero para registrar una sede.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando creo un parqueadero con nombre, ubicacion y capacidad
  Entonces el parqueadero queda asociado a mi empresa
- Dado que la capacidad es menor o igual a cero
  Cuando intento crear el parqueadero
  Entonces el sistema rechaza la solicitud
- Dado que faltan datos obligatorios
  Cuando intento crear el parqueadero
  Entonces el sistema muestra un error de validacion

### HU-04: Listar parqueaderos por empresa
Como administrador, quiero listar los parqueaderos de mi empresa para administrarlos.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto los parqueaderos de mi empresa
  Entonces obtengo el listado completo
- Dado que la empresa no tiene parqueaderos
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto los parqueaderos
  Cuando se genera el listado
  Entonces solo se incluyen parqueaderos de mi empresa

### HU-05: Ver detalle de parqueadero
Como administrador, quiero ver el detalle de un parqueadero para conocer su informacion.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto el parqueadero por id
  Entonces veo nombre, ubicacion y capacidad
- Dado que el parqueadero no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que el parqueadero pertenece a otra empresa
  Cuando consulto por id
  Entonces el sistema rechaza el acceso

### HU-06: Crear celda
Como operador, quiero crear una celda para habilitar un espacio de parqueo.

Criterios de aceptacion:
- Dado que existe un parqueadero
  Cuando creo una celda
  Entonces la celda queda disponible en ese parqueadero
- Dado que el parqueadero no existe
  Cuando intento crear la celda
  Entonces el sistema rechaza la solicitud
- Dado que el tipo de celda es invalido
  Cuando intento crear la celda
  Entonces el sistema muestra un error de validacion

### HU-07: Listar celdas por parqueadero
Como operador, quiero listar las celdas de un parqueadero para conocer su disponibilidad.

Criterios de aceptacion:
- Dado que existe un parqueadero
  Cuando consulto las celdas del parqueadero
  Entonces obtengo el listado de celdas
- Dado que el parqueadero no tiene celdas
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto las celdas
  Cuando se genera el listado
  Entonces solo se incluyen celdas del parqueadero

### HU-08: Ver detalle de celda
Como operador, quiero ver el detalle de una celda para validar su estado.

Criterios de aceptacion:
- Dado que existe la celda
  Cuando consulto la celda por id
  Entonces veo su estado actual
- Dado que la celda no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrada
- Dado que la celda pertenece a otro parqueadero
  Cuando consulto por id
  Entonces el sistema rechaza el acceso

### HU-09: Actualizar estado de celda
Como operador, quiero actualizar el estado de una celda para reflejar ocupacion real.

Criterios de aceptacion:
- Dado que existe la celda
  Cuando actualizo su estado
  Entonces el nuevo estado queda registrado
- Dado que el estado es invalido
  Cuando intento actualizarlo
  Entonces el sistema rechaza el cambio
- Dado que actualizo el estado
  Cuando consulto la celda
  Entonces el nuevo estado permanece registrado

### HU-10: Registrar vehiculo
Como operador, quiero registrar un vehiculo para iniciar una reserva.

Criterios de aceptacion:
- Dado que la placa no existe
  Cuando registro la placa y el tipo
  Entonces el vehiculo queda registrado
- Dado que la placa ya existe
  Cuando intento registrar el vehiculo
  Entonces el sistema rechaza el registro
- Dado que la placa tiene formato invalido
  Cuando intento registrar el vehiculo
  Entonces el sistema muestra un error de validacion

### HU-11: Buscar vehiculo por placa
Como operador, quiero buscar un vehiculo por placa para recuperar su informacion.

Criterios de aceptacion:
- Dado que conozco la placa
  Cuando la consulto
  Entonces obtengo el vehiculo correspondiente
- Dado que la placa no existe
  Cuando la consulto
  Entonces el sistema indica que no hay resultados
- Dado que la placa tiene formato invalido
  Cuando la consulto
  Entonces el sistema muestra un error de validacion

### HU-12: Ver vehiculo por id
Como operador, quiero ver un vehiculo por id para validar su informacion.

Criterios de aceptacion:
- Dado que existe el vehiculo
  Cuando consulto por id
  Entonces obtengo su detalle
- Dado que el vehiculo no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que el vehiculo pertenece a otra empresa
  Cuando consulto por id
  Entonces el sistema rechaza el acceso

### HU-13: Crear reserva
Como operador, quiero crear una reserva para asignar una celda al vehiculo.

Criterios de aceptacion:
- Dado que hay una celda disponible
  Cuando creo la reserva
  Entonces la reserva queda activa y la celda se marca ocupada
- Dado que la celda esta ocupada
  Cuando intento crear la reserva
  Entonces el sistema rechaza la solicitud
- Dado que el vehiculo no esta registrado
  Cuando intento crear la reserva
  Entonces el sistema solicita registrar el vehiculo

### HU-14: Finalizar reserva
Como operador, quiero finalizar una reserva para liberar la celda.

Criterios de aceptacion:
- Dado que la reserva esta activa
  Cuando la finalizo
  Entonces la reserva queda finalizada y la celda se libera
- Dado que la reserva ya esta finalizada
  Cuando intento finalizarla
  Entonces el sistema rechaza la solicitud
- Dado que la reserva no existe
  Cuando intento finalizarla
  Entonces el sistema indica que no fue encontrada

### HU-15: Listar reservas activas
Como operador, quiero listar las reservas activas para ver ocupacion en curso.

Criterios de aceptacion:
- Dado que existen reservas activas
  Cuando consulto las reservas activas
  Entonces veo la lista actual
- Dado que no existen reservas activas
  Cuando consulto las reservas activas
  Entonces obtengo una lista vacia
- Dado que consulto reservas activas
  Cuando se genera el listado
  Entonces solo se incluyen reservas en estado activa

### HU-16: Listar reservas por parqueadero
Como operador, quiero listar reservas por parqueadero para controlar el flujo.

Criterios de aceptacion:
- Dado un parqueadero
  Cuando consulto sus reservas
  Entonces obtengo el listado asociado
- Dado que el parqueadero no existe
  Cuando consulto sus reservas
  Entonces el sistema indica que no fue encontrado
- Dado que consulto reservas por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen reservas de ese parqueadero

### HU-17: Ver reserva por id
Como operador, quiero ver el detalle de una reserva para validar su estado.

Criterios de aceptacion:
- Dado que existe la reserva
  Cuando consulto por id
  Entonces obtengo su informacion completa
- Dado que la reserva no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrada
- Dado que consulto la reserva
  Cuando se muestra el detalle
  Entonces incluye estado, celda y vehiculo

### HU-18: Registrar pago
Como operador, quiero registrar un pago para cerrar la reserva.

Criterios de aceptacion:
- Dado que la reserva esta abierta y sin pago
  Cuando registro el pago
  Entonces el pago queda asociado a la reserva
- Dado que la reserva ya tiene pago
  Cuando intento registrar otro pago
  Entonces el sistema rechaza la solicitud
- Dado que el monto es menor o igual a cero
  Cuando intento registrar el pago
  Entonces el sistema muestra un error de validacion

### HU-19: Consultar pago por id
Como administrador, quiero consultar un pago por id para validar el registro.

Criterios de aceptacion:
- Dado que existe el pago
  Cuando consulto por id
  Entonces veo su detalle
- Dado que el pago no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que consulto el pago
  Cuando se muestra el detalle
  Entonces incluye monto y fecha de pago

### HU-20: Consultar pago por reserva
Como administrador, quiero consultar el pago de una reserva para comprobar su cierre.

Criterios de aceptacion:
- Dado que existe una reserva
  Cuando consulto su pago
  Entonces obtengo el pago asociado
- Dado que la reserva no tiene pago
  Cuando consulto su pago
  Entonces el sistema indica que no hay resultados
- Dado que la reserva no existe
  Cuando consulto su pago
  Entonces el sistema indica que no fue encontrada

### HU-21: Listar pagos por parqueadero
Como administrador, quiero listar pagos por parqueadero para validar ingresos.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto pagos por parqueadero
  Entonces obtengo el listado de pagos asociados
- Dado que el parqueadero no tiene pagos
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto pagos por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen pagos de ese parqueadero

### HU-22: Registrar cliente de facturacion
Como administrador, quiero registrar un cliente de facturacion para emitir facturas.

Criterios de aceptacion:
- Dado que tengo datos del cliente
  Cuando lo registro
  Entonces el cliente queda disponible para facturar
- Dado que el documento ya existe
  Cuando intento registrar el cliente
  Entonces el sistema rechaza el registro
- Dado que faltan datos obligatorios
  Cuando intento registrar el cliente
  Entonces el sistema muestra un error de validacion

### HU-23: Generar factura electronica
Como administrador, quiero generar una factura para un pago.

Criterios de aceptacion:
- Dado que existe un pago
  Cuando genero la factura
  Entonces la factura queda asociada al pago y al cliente
- Dado que el pago no existe
  Cuando intento generar la factura
  Entonces el sistema rechaza la solicitud
- Dado que el pago ya tiene factura
  Cuando intento generar una nueva
  Entonces el sistema rechaza la duplicidad

### HU-24: Marcar factura enviada
Como administrador, quiero marcar una factura como enviada para controlar su estado.

Criterios de aceptacion:
- Dado que existe la factura
  Cuando la marco como enviada
  Entonces su estado cambia a enviada
- Dado que la factura no existe
  Cuando intento marcarla como enviada
  Entonces el sistema indica que no fue encontrada
- Dado que la factura ya esta enviada
  Cuando intento marcarla de nuevo
  Entonces el sistema conserva el estado sin error

### HU-25: Consultar factura por pago
Como administrador, quiero consultar la factura de un pago para validar su emision.

Criterios de aceptacion:
- Dado que existe el pago
  Cuando consulto su factura
  Entonces obtengo la factura asociada
- Dado que el pago no tiene factura
  Cuando consulto su factura
  Entonces el sistema indica que no hay resultados
- Dado que el pago no existe
  Cuando consulto su factura
  Entonces el sistema indica que no fue encontrado

### HU-26: Listar clientes de facturacion
Como administrador, quiero listar clientes de facturacion para gestionarlos.

Criterios de aceptacion:
- Dado que existen clientes
  Cuando consulto la lista
  Entonces veo todos los clientes registrados
- Dado que no existen clientes
  Cuando consulto la lista
  Entonces obtengo una lista vacia
- Dado que consulto clientes
  Cuando se genera el listado
  Entonces se incluyen los datos principales de contacto

### HU-27: Crear tarifa
Como administrador, quiero crear una tarifa por tipo de vehiculo para calcular cobros.

Criterios de aceptacion:
- Dado que existe un parqueadero
  Cuando creo una tarifa
  Entonces la tarifa queda disponible para el calculo
- Dado que ya existe una tarifa para ese tipo de vehiculo
  Cuando intento crearla de nuevo
  Entonces el sistema rechaza la duplicidad
- Dado que el valor de tarifa es negativo
  Cuando intento crearla
  Entonces el sistema muestra un error de validacion

### HU-28: Listar tarifas por parqueadero
Como administrador, quiero listar tarifas por parqueadero para administrarlas.

Criterios de aceptacion:
- Dado un parqueadero
  Cuando consulto sus tarifas
  Entonces obtengo el listado
- Dado que el parqueadero no tiene tarifas
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto tarifas por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen tarifas de ese parqueadero

### HU-29: Actualizar tarifa
Como administrador, quiero actualizar una tarifa para mantener precios vigentes.

Criterios de aceptacion:
- Dado que existe una tarifa
  Cuando actualizo su valor
  Entonces la tarifa queda actualizada
- Dado que la tarifa no existe
  Cuando intento actualizarla
  Entonces el sistema indica que no fue encontrada
- Dado que el nuevo valor es invalido
  Cuando intento actualizarla
  Entonces el sistema muestra un error de validacion

### HU-30: Crear reporte
Como administrador, quiero crear un reporte de ingresos para documentar resultados.

Criterios de aceptacion:
- Dado que tengo datos del parqueadero
  Cuando genero un reporte
  Entonces el reporte queda registrado
- Dado que el parqueadero no existe
  Cuando intento generar el reporte
  Entonces el sistema rechaza la solicitud
- Dado que el periodo es invalido
  Cuando intento generar el reporte
  Entonces el sistema muestra un error de validacion

### HU-31: Listar reportes por parqueadero
Como administrador, quiero listar reportes por parqueadero para consultarlos.

Criterios de aceptacion:
- Dado un parqueadero
  Cuando consulto sus reportes
  Entonces obtengo el listado de reportes
- Dado que el parqueadero no tiene reportes
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto reportes por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen reportes de ese parqueadero

### HU-32: Ver reporte por id
Como administrador, quiero ver un reporte por id para revisar su contenido.

Criterios de aceptacion:
- Dado que existe el reporte
  Cuando consulto por id
  Entonces obtengo su detalle
- Dado que el reporte no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que consulto el reporte
  Cuando se muestra el detalle
  Entonces incluye la URL del archivo

### HU-33: Actualizar URL de reporte
Como administrador, quiero actualizar la URL del reporte para acceder al archivo.

Criterios de aceptacion:
- Dado que existe el reporte
  Cuando actualizo su URL
  Entonces la URL queda registrada
- Dado que la URL esta vacia
  Cuando intento actualizarla
  Entonces el sistema muestra un error de validacion
- Dado que el reporte no existe
  Cuando intento actualizar la URL
  Entonces el sistema indica que no fue encontrado

### HU-34: Consultar ocupacion por empresa
Como administrador, quiero consultar la ocupacion por empresa para monitorear disponibilidad.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto ocupacion por empresa
  Entonces veo el resumen de ocupacion
- Dado que la empresa no existe
  Cuando consulto ocupacion
  Entonces el sistema indica que no fue encontrada
- Dado que consulto ocupacion por empresa
  Cuando se genera el resumen
  Entonces solo se incluyen datos de esa empresa

### HU-35: Consultar ocupacion por parqueadero
Como administrador, quiero consultar la ocupacion de un parqueadero para conocer su estado.

Criterios de aceptacion:
- Dado un parqueadero
  Cuando consulto su ocupacion
  Entonces veo el nivel de ocupacion
- Dado que el parqueadero no existe
  Cuando consulto su ocupacion
  Entonces el sistema indica que no fue encontrado
- Dado que consulto la ocupacion
  Cuando se muestra el resultado
  Entonces incluye total de celdas y ocupadas

### HU-36: Consultar historial por empresa
Como administrador, quiero consultar el historial de reservas por empresa.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto el historial por empresa
  Entonces veo las reservas historicas
- Dado que no hay historial
  Cuando consulto el historial
  Entonces obtengo una lista vacia
- Dado que consulto el historial por empresa
  Cuando se genera el resultado
  Entonces solo se incluyen reservas de esa empresa

### HU-37: Consultar historial por placa
Como administrador, quiero consultar el historial por placa y parqueadero para auditar.

Criterios de aceptacion:
- Dado un parqueadero y una placa
  Cuando consulto el historial
  Entonces obtengo el detalle correspondiente
- Dado que la placa no tiene historial
  Cuando consulto el historial
  Entonces obtengo una lista vacia
- Dado que el parqueadero no existe
  Cuando consulto el historial
  Entonces el sistema indica que no fue encontrado

### HU-38: Consultar facturacion por empresa
Como administrador, quiero consultar la facturacion por empresa para analizar ingresos.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto facturacion por empresa
  Entonces veo la facturacion consolidada
- Dado que la empresa no tiene facturacion
  Cuando consulto la facturacion
  Entonces obtengo una lista vacia
- Dado que consulto facturacion por empresa
  Cuando se genera el resultado
  Entonces solo se incluyen datos de esa empresa

### HU-39: Consultar facturacion por documento
Como administrador, quiero consultar la facturacion por documento para ubicar un registro.

Criterios de aceptacion:
- Dado un numero de documento
  Cuando consulto la facturacion
  Entonces obtengo los datos asociados
- Dado que el documento no existe
  Cuando consulto la facturacion
  Entonces el sistema indica que no hay resultados
- Dado que el documento tiene formato invalido
  Cuando consulto la facturacion
  Entonces el sistema muestra un error de validacion

### HU-40: Consultar ingresos por empresa
Como administrador, quiero consultar ingresos por empresa para medir rendimiento.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto ingresos por empresa
  Entonces veo el resumen de ingresos
- Dado que la empresa no tiene ingresos
  Cuando consulto los ingresos
  Entonces obtengo valores en cero
- Dado que consulto ingresos por empresa
  Cuando se genera el resumen
  Entonces solo se incluyen datos de esa empresa

### HU-41: Consultar ingresos por parqueadero
Como administrador, quiero consultar ingresos por parqueadero para comparar sedes.

Criterios de aceptacion:
- Dado un parqueadero
  Cuando consulto sus ingresos
  Entonces obtengo el resumen de ingresos
- Dado que el parqueadero no tiene ingresos
  Cuando consulto los ingresos
  Entonces obtengo valores en cero
- Dado que el parqueadero no existe
  Cuando consulto sus ingresos
  Entonces el sistema indica que no fue encontrado

### HU-42: Procesar pago desde vistas
Como operador, quiero procesar un pago desde una vista para agilizar el cierre.

Criterios de aceptacion:
- Dado que hay una reserva abierta
  Cuando proceso el pago desde vistas
  Entonces el pago queda registrado y la reserva cerrada
- Dado que la reserva ya tiene pago
  Cuando intento procesar el pago
  Entonces el sistema rechaza la solicitud
- Dado que el metodo de pago es invalido
  Cuando intento procesar el pago
  Entonces el sistema muestra un error de validacion

### HU-43: Buscar vehiculo desde vistas
Como operador, quiero buscar un vehiculo desde vistas para localizarlo rapidamente.

Criterios de aceptacion:
- Dado que conozco la placa
  Cuando la consulto en vistas
  Entonces obtengo la ubicacion y datos del vehiculo
- Dado que la placa no existe
  Cuando la consulto en vistas
  Entonces el sistema indica que no hay resultados
- Dado que la placa tiene formato invalido
  Cuando la consulto en vistas
  Entonces el sistema muestra un error de validacion

### HU-44: Listar empresas
Como administrador, quiero listar empresas para ver los clientes registrados.

Criterios de aceptacion:
- Dado que soy administrador
  Cuando consulto las empresas
  Entonces obtengo el listado de empresas
- Dado que no existen empresas
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto empresas
  Cuando se genera el listado
  Entonces se incluyen nit y nombre de cada empresa

### HU-45: Ver detalle de empresa
Como administrador, quiero ver el detalle de una empresa para revisar sus datos.

Criterios de aceptacion:
- Dado que existe una empresa
  Cuando consulto su detalle
  Entonces veo su informacion general
- Dado que la empresa no existe
  Cuando consulto su detalle
  Entonces el sistema indica que no fue encontrada
- Dado que consulto el detalle
  Cuando se muestra la informacion
  Entonces incluye los datos generales de la empresa

## Casos de uso

### CU-01: Registrarme como operador
- Actor: Administrador
- Precondiciones: Administrador autenticado
- Flujo principal:
  1. El administrador ingresa datos del operador.
  2. El sistema valida datos.
  3. El sistema crea el operador y lo asocia a la empresa.
- Postcondiciones: Operador registrado.

### CU-02: Iniciar sesion
- Actor: Usuario
- Precondiciones: Usuario registrado
- Flujo principal:
  1. El usuario ingresa correo y contrasena.
  2. El sistema valida credenciales.
  3. El sistema concede acceso.
- Postcondiciones: Sesion iniciada.

### CU-03: Crear parqueadero
- Actor: Administrador
- Precondiciones: Administrador autenticado
- Flujo principal:
  1. El administrador registra nombre, ubicacion y capacidad.
  2. El sistema crea el parqueadero.
- Postcondiciones: Parqueadero disponible.

### CU-04: Listar parqueaderos por empresa
- Actor: Administrador
- Precondiciones: Administrador autenticado
- Flujo principal:
  1. El administrador consulta los parqueaderos de su empresa.
  2. El sistema devuelve el listado.
- Postcondiciones: Parqueaderos listados.

### CU-05: Ver detalle de parqueadero
- Actor: Administrador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El administrador consulta el parqueadero por id.
  2. El sistema devuelve el detalle.
- Postcondiciones: Detalle consultado.

### CU-06: Crear celda
- Actor: Operador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El operador ingresa datos de celda.
  2. El sistema crea la celda.
- Postcondiciones: Celda disponible.

### CU-07: Listar celdas por parqueadero
- Actor: Operador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El operador consulta celdas por parqueadero.
  2. El sistema devuelve el listado.
- Postcondiciones: Celdas listadas.

### CU-08: Ver detalle de celda
- Actor: Operador
- Precondiciones: Celda existente
- Flujo principal:
  1. El operador consulta la celda por id.
  2. El sistema devuelve el detalle.
- Postcondiciones: Detalle consultado.

### CU-09: Actualizar estado de celda
- Actor: Operador
- Precondiciones: Celda existente
- Flujo principal:
  1. El operador actualiza el estado de la celda.
  2. El sistema guarda el nuevo estado.
- Postcondiciones: Estado actualizado.

### CU-10: Registrar vehiculo
- Actor: Operador
- Precondiciones: Vehiculo no registrado
- Flujo principal:
  1. El operador registra placa y tipo.
  2. El sistema crea el vehiculo.
- Postcondiciones: Vehiculo registrado.

### CU-11: Buscar vehiculo por placa
- Actor: Operador
- Precondiciones: Placa registrada
- Flujo principal:
  1. El operador consulta la placa.
  2. El sistema devuelve el vehiculo.
- Postcondiciones: Vehiculo consultado.

### CU-12: Ver vehiculo por id
- Actor: Operador
- Precondiciones: Vehiculo existente
- Flujo principal:
  1. El operador consulta el vehiculo por id.
  2. El sistema devuelve el detalle.
- Postcondiciones: Detalle consultado.

### CU-13: Crear reserva
- Actor: Operador
- Precondiciones: Celda disponible
- Flujo principal:
  1. El operador selecciona vehiculo y celda.
  2. El sistema crea la reserva.
  3. El sistema marca la celda como ocupada.
- Postcondiciones: Reserva activa.

### CU-14: Finalizar reserva
- Actor: Operador
- Precondiciones: Reserva activa
- Flujo principal:
  1. El operador finaliza la reserva.
  2. El sistema registra la fecha de salida.
  3. El sistema libera la celda.
- Postcondiciones: Reserva finalizada.

### CU-15: Listar reservas activas
- Actor: Operador
- Precondiciones: Reservas activas existentes
- Flujo principal:
  1. El operador consulta reservas activas.
  2. El sistema devuelve el listado.
- Postcondiciones: Reservas listadas.

### CU-16: Listar reservas por parqueadero
- Actor: Operador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El operador consulta reservas por parqueadero.
  2. El sistema devuelve el listado.
- Postcondiciones: Reservas listadas.

### CU-17: Ver reserva por id
- Actor: Operador
- Precondiciones: Reserva existente
- Flujo principal:
  1. El operador consulta la reserva por id.
  2. El sistema devuelve el detalle.
- Postcondiciones: Detalle consultado.

### CU-18: Registrar pago
- Actor: Operador
- Precondiciones: Reserva activa sin pago
- Flujo principal:
  1. El operador registra el pago.
  2. El sistema valida que no exista pago previo.
  3. El sistema confirma el pago.
- Postcondiciones: Pago registrado.

### CU-19: Consultar pago por id
- Actor: Administrador
- Precondiciones: Pago existente
- Flujo principal:
  1. El administrador consulta el pago por id.
  2. El sistema devuelve el detalle.
- Postcondiciones: Detalle consultado.

### CU-20: Consultar pago por reserva
- Actor: Administrador
- Precondiciones: Reserva existente
- Flujo principal:
  1. El administrador consulta el pago por reserva.
  2. El sistema devuelve el pago asociado.
- Postcondiciones: Pago consultado.

### CU-21: Listar pagos por parqueadero
- Actor: Administrador
- Precondiciones: Pagos registrados
- Flujo principal:
  1. El administrador consulta pagos por parqueadero.
  2. El sistema devuelve el listado.
- Postcondiciones: Pagos listados.

### CU-22: Registrar cliente de facturacion
- Actor: Administrador
- Precondiciones: Datos del cliente disponibles
- Flujo principal:
  1. El administrador registra el cliente.
  2. El sistema guarda el cliente.
- Postcondiciones: Cliente registrado.

### CU-23: Generar factura electronica
- Actor: Administrador
- Precondiciones: Pago existente
- Flujo principal:
  1. El administrador selecciona el pago.
  2. El sistema genera la factura electronica.
- Postcondiciones: Factura generada.

### CU-24: Marcar factura enviada
- Actor: Administrador
- Precondiciones: Factura existente
- Flujo principal:
  1. El administrador marca la factura como enviada.
  2. El sistema actualiza el estado.
- Postcondiciones: Factura actualizada.

### CU-25: Consultar factura por pago
- Actor: Administrador
- Precondiciones: Pago existente
- Flujo principal:
  1. El administrador consulta la factura por pago.
  2. El sistema devuelve la factura asociada.
- Postcondiciones: Factura consultada.

### CU-26: Listar clientes de facturacion
- Actor: Administrador
- Precondiciones: Clientes existentes
- Flujo principal:
  1. El administrador consulta los clientes.
  2. El sistema devuelve el listado.
- Postcondiciones: Clientes listados.

### CU-27: Crear tarifa
- Actor: Administrador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El administrador define la tarifa.
  2. El sistema guarda la tarifa.
- Postcondiciones: Tarifa creada.

### CU-28: Listar tarifas por parqueadero
- Actor: Administrador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El administrador consulta tarifas por parqueadero.
  2. El sistema devuelve el listado.
- Postcondiciones: Tarifas listadas.

### CU-29: Actualizar tarifa
- Actor: Administrador
- Precondiciones: Tarifa existente
- Flujo principal:
  1. El administrador actualiza el valor.
  2. El sistema guarda el cambio.
- Postcondiciones: Tarifa actualizada.

### CU-30: Crear reporte
- Actor: Administrador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El administrador genera el reporte.
  2. El sistema registra el reporte.
- Postcondiciones: Reporte creado.

### CU-31: Listar reportes por parqueadero
- Actor: Administrador
- Precondiciones: Reportes existentes
- Flujo principal:
  1. El administrador consulta reportes por parqueadero.
  2. El sistema devuelve el listado.
- Postcondiciones: Reportes listados.

### CU-32: Ver reporte por id
- Actor: Administrador
- Precondiciones: Reporte existente
- Flujo principal:
  1. El administrador consulta el reporte por id.
  2. El sistema devuelve el detalle.
- Postcondiciones: Reporte consultado.

### CU-33: Actualizar URL de reporte
- Actor: Administrador
- Precondiciones: Reporte existente
- Flujo principal:
  1. El administrador actualiza la URL.
  2. El sistema guarda la URL.
- Postcondiciones: URL actualizada.

### CU-34: Consultar ocupacion por empresa
- Actor: Administrador
- Precondiciones: Empresa existente
- Flujo principal:
  1. El administrador consulta ocupacion por empresa.
  2. El sistema devuelve el resumen.
- Postcondiciones: Ocupacion consultada.

### CU-35: Consultar ocupacion por parqueadero
- Actor: Administrador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El administrador consulta ocupacion por parqueadero.
  2. El sistema devuelve el nivel.
- Postcondiciones: Ocupacion consultada.

### CU-36: Consultar historial por empresa
- Actor: Administrador
- Precondiciones: Empresa existente
- Flujo principal:
  1. El administrador consulta historial por empresa.
  2. El sistema devuelve las reservas historicas.
- Postcondiciones: Historial consultado.

### CU-37: Consultar historial por placa
- Actor: Administrador
- Precondiciones: Parqueadero y placa existentes
- Flujo principal:
  1. El administrador consulta historial por placa.
  2. El sistema devuelve el detalle.
- Postcondiciones: Historial consultado.

### CU-38: Consultar facturacion por empresa
- Actor: Administrador
- Precondiciones: Empresa existente
- Flujo principal:
  1. El administrador consulta facturacion por empresa.
  2. El sistema devuelve la facturacion.
- Postcondiciones: Facturacion consultada.

### CU-39: Consultar facturacion por documento
- Actor: Administrador
- Precondiciones: Documento existente
- Flujo principal:
  1. El administrador consulta facturacion por documento.
  2. El sistema devuelve el detalle.
- Postcondiciones: Facturacion consultada.

### CU-40: Consultar ingresos por empresa
- Actor: Administrador
- Precondiciones: Empresa existente
- Flujo principal:
  1. El administrador consulta ingresos por empresa.
  2. El sistema devuelve el resumen.
- Postcondiciones: Ingresos consultados.

### CU-41: Consultar ingresos por parqueadero
- Actor: Administrador
- Precondiciones: Parqueadero existente
- Flujo principal:
  1. El administrador consulta ingresos por parqueadero.
  2. El sistema devuelve el resumen.
- Postcondiciones: Ingresos consultados.

### CU-42: Procesar pago desde vistas
- Actor: Operador
- Precondiciones: Reserva abierta
- Flujo principal:
  1. El operador procesa el pago desde vistas.
  2. El sistema registra el pago y cierra la reserva.
- Postcondiciones: Pago procesado.

### CU-43: Buscar vehiculo desde vistas
- Actor: Operador
- Precondiciones: Placa registrada
- Flujo principal:
  1. El operador busca el vehiculo por placa.
  2. El sistema devuelve ubicacion y datos.
- Postcondiciones: Vehiculo localizado.

### CU-44: Listar empresas
- Actor: Administrador
- Precondiciones: Administrador autenticado
- Flujo principal:
  1. El administrador consulta empresas.
  2. El sistema devuelve el listado.
- Postcondiciones: Empresas listadas.

### CU-45: Ver detalle de empresa
- Actor: Administrador
- Precondiciones: Empresa existente
- Flujo principal:
  1. El administrador consulta el detalle de empresa.
  2. El sistema devuelve la informacion general.
- Postcondiciones: Detalle consultado.
