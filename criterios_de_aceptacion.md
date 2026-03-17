# Criterios de aceptacion por requisito (Given/When/Then)

## RF-01: Registrar usuarios operadores
- Dado que soy administrador
  Cuando registro un operador con nombre, correo y contrasena
  Entonces el operador queda creado y asociado a mi empresa
- Dado que el correo ya existe
  Cuando intento registrar el operador
  Entonces el sistema rechaza la solicitud
- Dado que faltan datos obligatorios
  Cuando intento registrar el operador
  Entonces el sistema muestra un error de validacion

## RF-02: Iniciar sesion con correo y contrasena
- Dado que tengo credenciales validas
  Cuando inicio sesion
  Entonces accedo al sistema
- Dado que las credenciales son invalidas
  Cuando inicio sesion
  Entonces el sistema rechaza el acceso
- Dado que faltan campos obligatorios
  Cuando intento iniciar sesion
  Entonces el sistema muestra un error de validacion

## RF-03: Crear usuarios operadores desde administrador
- Dado que soy administrador
  Cuando creo un usuario operador
  Entonces el usuario queda asociado a mi empresa
- Dado que el rol no es operador
  Cuando intento crear el usuario
  Entonces el sistema rechaza el registro
- Dado que el correo ya existe
  Cuando intento crear el usuario
  Entonces el sistema indica duplicidad

## RF-04: Consultar usuarios por empresa
- Dado que soy administrador
  Cuando consulto usuarios por empresa
  Entonces obtengo el listado de operadores
- Dado que no existen usuarios en la empresa
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto usuarios por empresa
  Cuando se genera el listado
  Entonces solo se incluyen usuarios de esa empresa

## RF-05: Consultar detalle de usuario
- Dado que el usuario existe
  Cuando consulto por id
  Entonces obtengo el detalle del usuario
- Dado que el usuario no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que el usuario pertenece a otra empresa
  Cuando consulto por id
  Entonces el sistema rechaza el acceso

## RF-06: Eliminar usuario operador
- Dado que el usuario operador existe
  Cuando solicito eliminarlo
  Entonces el usuario queda eliminado
- Dado que el usuario no existe
  Cuando intento eliminarlo
  Entonces el sistema indica que no fue encontrado
- Dado que el usuario no es operador
  Cuando intento eliminarlo
  Entonces el sistema rechaza la solicitud

## RF-07: Listar empresas
- Dado que soy administrador
  Cuando consulto las empresas
  Entonces obtengo el listado completo
- Dado que no existen empresas
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto empresas
  Cuando se genera el listado
  Entonces se incluyen nit y nombre de cada empresa

## RF-08: Consultar detalle de empresa
- Dado que existe una empresa
  Cuando consulto su detalle
  Entonces obtengo su informacion general
- Dado que la empresa no existe
  Cuando consulto su detalle
  Entonces el sistema indica que no fue encontrada
- Dado que consulto su detalle
  Cuando se muestra la informacion
  Entonces incluye nit y nombre

## RF-09: Crear parqueaderos por empresa
- Dado que soy administrador
  Cuando creo un parqueadero con nombre, ubicacion y capacidad
  Entonces el parqueadero queda asociado a mi empresa
- Dado que la capacidad es menor o igual a cero
  Cuando intento crear el parqueadero
  Entonces el sistema rechaza la solicitud
- Dado que faltan datos obligatorios
  Cuando intento crear el parqueadero
  Entonces el sistema muestra un error de validacion

## RF-10: Listar parqueaderos por empresa
- Dado que soy administrador
  Cuando consulto los parqueaderos de mi empresa
  Entonces obtengo el listado completo
- Dado que la empresa no tiene parqueaderos
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto los parqueaderos
  Cuando se genera el listado
  Entonces solo se incluyen parqueaderos de mi empresa

## RF-11: Consultar parqueadero por id
- Dado que el parqueadero existe
  Cuando consulto por id
  Entonces obtengo su detalle
- Dado que el parqueadero no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que el parqueadero pertenece a otra empresa
  Cuando consulto por id
  Entonces el sistema rechaza el acceso

## RF-12: Crear celdas en un parqueadero
- Dado que existe un parqueadero
  Cuando creo una celda
  Entonces la celda queda disponible
- Dado que el parqueadero no existe
  Cuando intento crear la celda
  Entonces el sistema rechaza la solicitud
- Dado que el tipo de celda es invalido
  Cuando intento crearla
  Entonces el sistema muestra un error de validacion

## RF-13: Listar celdas por parqueadero
- Dado que existe un parqueadero
  Cuando consulto sus celdas
  Entonces obtengo el listado
- Dado que no existen celdas
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto celdas por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen celdas de ese parqueadero

## RF-14: Consultar celda por id
- Dado que existe la celda
  Cuando consulto por id
  Entonces obtengo su detalle
- Dado que la celda no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrada
- Dado que la celda pertenece a otro parqueadero
  Cuando consulto por id
  Entonces el sistema rechaza el acceso

## RF-15: Actualizar estado de celda
- Dado que existe la celda
  Cuando actualizo su estado
  Entonces el nuevo estado queda registrado
- Dado que el estado es invalido
  Cuando intento actualizarlo
  Entonces el sistema rechaza el cambio
- Dado que actualizo el estado
  Cuando consulto la celda
  Entonces veo el estado actualizado

## RF-16: Registrar vehiculos
- Dado que la placa no existe
  Cuando registro la placa y el tipo
  Entonces el vehiculo queda registrado
- Dado que la placa ya existe
  Cuando intento registrar el vehiculo
  Entonces el sistema rechaza la solicitud
- Dado que la placa tiene formato invalido
  Cuando intento registrar el vehiculo
  Entonces el sistema muestra un error de validacion

## RF-17: Buscar vehiculos por placa
- Dado que conozco la placa
  Cuando la consulto
  Entonces obtengo el vehiculo correspondiente
- Dado que la placa no existe
  Cuando la consulto
  Entonces el sistema indica que no hay resultados
- Dado que la placa tiene formato invalido
  Cuando la consulto
  Entonces el sistema muestra un error de validacion

## RF-18: Consultar vehiculo por id
- Dado que existe el vehiculo
  Cuando consulto por id
  Entonces obtengo su detalle
- Dado que el vehiculo no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que el vehiculo pertenece a otra empresa
  Cuando consulto por id
  Entonces el sistema rechaza el acceso

## RF-19: Crear reservas
- Dado que hay una celda disponible
  Cuando creo la reserva
  Entonces la reserva queda activa y la celda se marca ocupada
- Dado que la celda esta ocupada
  Cuando intento crear la reserva
  Entonces el sistema rechaza la solicitud
- Dado que el vehiculo no esta registrado
  Cuando intento crear la reserva
  Entonces el sistema solicita registrar el vehiculo

## RF-20: Finalizar reservas
- Dado que la reserva esta activa
  Cuando la finalizo
  Entonces la reserva queda finalizada y la celda se libera
- Dado que la reserva ya esta finalizada
  Cuando intento finalizarla
  Entonces el sistema rechaza la solicitud
- Dado que la reserva no existe
  Cuando intento finalizarla
  Entonces el sistema indica que no fue encontrada

## RF-21: Listar reservas activas
- Dado que existen reservas activas
  Cuando consulto las reservas activas
  Entonces veo la lista actual
- Dado que no existen reservas activas
  Cuando consulto las reservas activas
  Entonces obtengo una lista vacia
- Dado que consulto reservas activas
  Cuando se genera el listado
  Entonces solo se incluyen reservas en estado activa

## RF-22: Listar reservas por parqueadero
- Dado un parqueadero
  Cuando consulto sus reservas
  Entonces obtengo el listado asociado
- Dado que el parqueadero no existe
  Cuando consulto sus reservas
  Entonces el sistema indica que no fue encontrado
- Dado que consulto reservas por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen reservas de ese parqueadero

## RF-23: Consultar reserva por id
- Dado que existe la reserva
  Cuando consulto por id
  Entonces obtengo su informacion completa
- Dado que la reserva no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrada
- Dado que consulto la reserva
  Cuando se muestra el detalle
  Entonces incluye estado, celda y vehiculo

## RF-24: Crear pagos asociados a reservas
- Dado que la reserva esta abierta y sin pago
  Cuando registro el pago
  Entonces el pago queda asociado a la reserva
- Dado que la reserva ya tiene pago
  Cuando intento registrar otro pago
  Entonces el sistema rechaza la solicitud
- Dado que el monto es menor o igual a cero
  Cuando intento registrar el pago
  Entonces el sistema muestra un error de validacion

## RF-25: Consultar pagos por parqueadero
- Dado que soy administrador
  Cuando consulto pagos por parqueadero
  Entonces obtengo el listado de pagos asociados
- Dado que el parqueadero no tiene pagos
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto pagos por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen pagos de ese parqueadero

## RF-26: Consultar pago por reserva
- Dado que existe una reserva
  Cuando consulto su pago
  Entonces obtengo el pago asociado
- Dado que la reserva no tiene pago
  Cuando consulto su pago
  Entonces el sistema indica que no hay resultados
- Dado que la reserva no existe
  Cuando consulto su pago
  Entonces el sistema indica que no fue encontrada

## RF-27: Consultar pago por id
- Dado que existe el pago
  Cuando consulto por id
  Entonces veo su detalle
- Dado que el pago no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que consulto el pago
  Cuando se muestra el detalle
  Entonces incluye monto y fecha de pago

## RF-28: Registrar clientes de facturacion
- Dado que tengo datos del cliente
  Cuando lo registro
  Entonces el cliente queda disponible para facturar
- Dado que el documento ya existe
  Cuando intento registrar el cliente
  Entonces el sistema rechaza el registro
- Dado que faltan datos obligatorios
  Cuando intento registrar el cliente
  Entonces el sistema muestra un error de validacion

## RF-29: Crear facturas electronicas
- Dado que existe un pago
  Cuando genero la factura
  Entonces la factura queda asociada al pago y al cliente
- Dado que el pago no existe
  Cuando intento generar la factura
  Entonces el sistema rechaza la solicitud
- Dado que el pago ya tiene factura
  Cuando intento generar una nueva
  Entonces el sistema rechaza la duplicidad

## RF-30: Marcar factura como enviada
- Dado que existe la factura
  Cuando la marco como enviada
  Entonces su estado cambia a enviada
- Dado que la factura no existe
  Cuando intento marcarla como enviada
  Entonces el sistema indica que no fue encontrada
- Dado que la factura ya esta enviada
  Cuando intento marcarla de nuevo
  Entonces el sistema conserva el estado sin error

## RF-31: Consultar facturas por pago
- Dado que existe el pago
  Cuando consulto su factura
  Entonces obtengo la factura asociada
- Dado que el pago no tiene factura
  Cuando consulto su factura
  Entonces el sistema indica que no hay resultados
- Dado que el pago no existe
  Cuando consulto su factura
  Entonces el sistema indica que no fue encontrado

## RF-32: Listar clientes de facturacion
- Dado que existen clientes
  Cuando consulto la lista
  Entonces veo todos los clientes registrados
- Dado que no existen clientes
  Cuando consulto la lista
  Entonces obtengo una lista vacia
- Dado que consulto clientes
  Cuando se genera el listado
  Entonces se incluyen los datos principales de contacto

## RF-33: Crear tarifas por parqueadero y tipo de vehiculo
- Dado que existe un parqueadero
  Cuando creo una tarifa
  Entonces la tarifa queda disponible para el calculo
- Dado que ya existe una tarifa para ese tipo de vehiculo
  Cuando intento crearla de nuevo
  Entonces el sistema rechaza la duplicidad
- Dado que el valor de tarifa es negativo
  Cuando intento crearla
  Entonces el sistema muestra un error de validacion

## RF-34: Listar tarifas por parqueadero
- Dado un parqueadero
  Cuando consulto sus tarifas
  Entonces obtengo el listado
- Dado que el parqueadero no tiene tarifas
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto tarifas por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen tarifas de ese parqueadero

## RF-35: Actualizar tarifa
- Dado que existe una tarifa
  Cuando actualizo su valor
  Entonces la tarifa queda actualizada
- Dado que la tarifa no existe
  Cuando intento actualizarla
  Entonces el sistema indica que no fue encontrada
- Dado que el nuevo valor es invalido
  Cuando intento actualizarla
  Entonces el sistema muestra un error de validacion

## RF-36: Crear reportes de ingresos
- Dado que tengo datos del parqueadero
  Cuando genero un reporte
  Entonces el reporte queda registrado
- Dado que el parqueadero no existe
  Cuando intento generar el reporte
  Entonces el sistema rechaza la solicitud
- Dado que el periodo es invalido
  Cuando intento generar el reporte
  Entonces el sistema muestra un error de validacion

## RF-37: Listar reportes por parqueadero
- Dado un parqueadero
  Cuando consulto sus reportes
  Entonces obtengo el listado de reportes
- Dado que el parqueadero no tiene reportes
  Cuando consulto el listado
  Entonces obtengo una lista vacia
- Dado que consulto reportes por parqueadero
  Cuando se genera el listado
  Entonces solo se incluyen reportes de ese parqueadero

## RF-38: Consultar reporte por id
- Dado que existe el reporte
  Cuando consulto por id
  Entonces obtengo su detalle
- Dado que el reporte no existe
  Cuando consulto por id
  Entonces el sistema indica que no fue encontrado
- Dado que consulto el reporte
  Cuando se muestra el detalle
  Entonces incluye la URL del archivo

## RF-39: Actualizar URL del reporte
- Dado que existe el reporte
  Cuando actualizo su URL
  Entonces la URL queda registrada
- Dado que la URL esta vacia
  Cuando intento actualizarla
  Entonces el sistema muestra un error de validacion
- Dado que el reporte no existe
  Cuando intento actualizar la URL
  Entonces el sistema indica que no fue encontrado

## RF-40: Consultar ocupacion por empresa
- Dado que soy administrador
  Cuando consulto ocupacion por empresa
  Entonces veo el resumen de ocupacion
- Dado que la empresa no existe
  Cuando consulto ocupacion
  Entonces el sistema indica que no fue encontrada
- Dado que consulto ocupacion por empresa
  Cuando se genera el resumen
  Entonces solo se incluyen datos de esa empresa

## RF-41: Consultar ocupacion por parqueadero
- Dado un parqueadero
  Cuando consulto su ocupacion
  Entonces veo el nivel de ocupacion
- Dado que el parqueadero no existe
  Cuando consulto su ocupacion
  Entonces el sistema indica que no fue encontrado
- Dado que consulto la ocupacion
  Cuando se muestra el resultado
  Entonces incluye total de celdas y ocupadas

## RF-42: Consultar historial de reservas por empresa
- Dado que soy administrador
  Cuando consulto el historial por empresa
  Entonces veo las reservas historicas
- Dado que no hay historial
  Cuando consulto el historial
  Entonces obtengo una lista vacia
- Dado que consulto el historial por empresa
  Cuando se genera el resultado
  Entonces solo se incluyen reservas de esa empresa

## RF-43: Consultar historial por placa y parqueadero
- Dado un parqueadero y una placa
  Cuando consulto el historial
  Entonces obtengo el detalle correspondiente
- Dado que la placa no tiene historial
  Cuando consulto el historial
  Entonces obtengo una lista vacia
- Dado que el parqueadero no existe
  Cuando consulto el historial
  Entonces el sistema indica que no fue encontrado

## RF-44: Consultar facturacion por empresa
- Dado que soy administrador
  Cuando consulto facturacion por empresa
  Entonces veo la facturacion consolidada
- Dado que la empresa no tiene facturacion
  Cuando consulto la facturacion
  Entonces obtengo una lista vacia
- Dado que consulto facturacion por empresa
  Cuando se genera el resultado
  Entonces solo se incluyen datos de esa empresa

## RF-45: Consultar facturacion por documento
- Dado un numero de documento
  Cuando consulto la facturacion
  Entonces obtengo los datos asociados
- Dado que el documento no existe
  Cuando consulto la facturacion
  Entonces el sistema indica que no hay resultados
- Dado que el documento tiene formato invalido
  Cuando consulto la facturacion
  Entonces el sistema muestra un error de validacion

## RF-46: Consultar ingresos por empresa
- Dado que soy administrador
  Cuando consulto ingresos por empresa
  Entonces veo el resumen de ingresos
- Dado que la empresa no tiene ingresos
  Cuando consulto los ingresos
  Entonces obtengo valores en cero
- Dado que consulto ingresos por empresa
  Cuando se genera el resumen
  Entonces solo se incluyen datos de esa empresa

## RF-47: Consultar ingresos por parqueadero
- Dado un parqueadero
  Cuando consulto sus ingresos
  Entonces obtengo el resumen de ingresos
- Dado que el parqueadero no tiene ingresos
  Cuando consulto los ingresos
  Entonces obtengo valores en cero
- Dado que el parqueadero no existe
  Cuando consulto sus ingresos
  Entonces el sistema indica que no fue encontrado

## RF-48: Procesar pago desde vistas
- Dado que hay una reserva abierta
  Cuando proceso el pago desde vistas
  Entonces el pago queda registrado y la reserva cerrada
- Dado que la reserva ya tiene pago
  Cuando intento procesar el pago
  Entonces el sistema rechaza la solicitud
- Dado que el metodo de pago es invalido
  Cuando intento procesar el pago
  Entonces el sistema muestra un error de validacion

## RF-49: Buscar vehiculos por placa desde vistas
- Dado que conozco la placa
  Cuando la consulto en vistas
  Entonces obtengo la ubicacion y datos del vehiculo
- Dado que la placa no existe
  Cuando la consulto en vistas
  Entonces el sistema indica que no hay resultados
- Dado que la placa tiene formato invalido
  Cuando la consulto en vistas
  Entonces el sistema muestra un error de validacion

## RF-50: Impedir pagos duplicados por reserva
- Dado que una reserva ya tiene pago
  Cuando intento registrar otro pago
  Entonces el sistema rechaza la solicitud
- Dado que una reserva tiene un pago registrado
  Cuando consulto sus pagos
  Entonces solo aparece un pago
- Dado que se registra un pago
  Cuando se intenta un duplicado
  Entonces el sistema mantiene el pago original

## RF-51: Permitir pago solo si la reserva esta abierta
- Dado que la reserva esta abierta
  Cuando registro el pago
  Entonces el pago es aceptado
- Dado que la reserva esta finalizada
  Cuando intento registrar el pago
  Entonces el sistema rechaza la solicitud
- Dado que la reserva no existe
  Cuando intento registrar el pago
  Entonces el sistema indica que no fue encontrada

## RF-52: Sincronizar cierre de reserva con liberacion de celda
- Dado que finalizo una reserva
  Cuando el sistema actualiza el estado
  Entonces la celda queda libre
- Dado que una reserva queda finalizada
  Cuando consulto la celda
  Entonces aparece como disponible
- Dado que ocurre un error al liberar la celda
  Cuando se finaliza la reserva
  Entonces el sistema registra el error

## RF-53: Soporte multiempresa con datos aislados
- Dado que soy usuario de una empresa
  Cuando consulto datos
  Entonces solo veo datos de mi empresa
- Dado que consulto recursos de otra empresa
  Cuando intento acceder
  Entonces el sistema rechaza el acceso
- Dado que existen varias empresas
  Cuando se crean datos
  Entonces quedan aislados por empresa

## RF-54: Roles diferenciados (administrador y operador)
- Dado que soy administrador
  Cuando accedo a funciones administrativas
  Entonces el sistema permite el acceso
- Dado que soy operador
  Cuando intento acceder a funciones administrativas
  Entonces el sistema lo rechaza
- Dado que un usuario no tiene rol definido
  Cuando intenta ingresar
  Entonces el sistema impide el acceso

## RF-55: No integrar hardware de control
- Dado que no hay hardware integrado
  Cuando se ejecuta el sistema
  Entonces no se requieren dispositivos externos
- Dado que se solicita integrar camaras o sensores
  Cuando se revisa el alcance
  Entonces el sistema indica que no esta incluido
- Dado que se intenta registrar un dispositivo fisico
  Cuando se realiza la operacion
  Entonces el sistema rechaza la integracion

## RF-56: No reconocimiento automatico de placas
- Dado que se registra un vehiculo
  Cuando se ingresa la placa
  Entonces el registro es manual
- Dado que se intenta cargar una imagen
  Cuando se espera reconocimiento
  Entonces el sistema no procesa imagenes
- Dado que se consulta una placa
  Cuando se busca el vehiculo
  Entonces se usa el registro manual

## RF-57: No pasarelas de pago externas
- Dado que se registra un pago
  Cuando se selecciona metodo
  Entonces no se invoca un proveedor externo
- Dado que se intenta pagar con pasarela
  Cuando se ejecuta la accion
  Entonces el sistema rechaza la integracion
- Dado que se consulta la configuracion
  Cuando se revisan integraciones
  Entonces no hay pasarelas activas

## RF-58: No aplicacion movil nativa
- Dado que el usuario busca la app movil
  Cuando revisa las plataformas
  Entonces no existe app nativa
- Dado que se accede al sistema
  Cuando se hace desde movil
  Entonces se usa la version web responsiva
- Dado que se solicita una app nativa
  Cuando se revisa el alcance
  Entonces se indica que no esta incluida

## RF-59: No integracion contable automatica
- Dado que se generan reportes
  Cuando se requiere contabilidad externa
  Entonces se exporta manualmente
- Dado que se intenta conectar un software contable
  Cuando se realiza la accion
  Entonces el sistema rechaza la integracion
- Dado que se revisa el alcance
  Cuando se solicita integracion contable
  Entonces el sistema indica que no esta incluida

## RF-60: No politicas avanzadas de tarifas
- Dado que se calculan tarifas
  Cuando se aplica el cobro
  Entonces solo se usa tiempo de permanencia
- Dado que se intenta aplicar membresias o descuentos
  Cuando se registra la tarifa
  Entonces el sistema lo rechaza
- Dado que se solicita una validacion de consumo
  Cuando se revisa el alcance
  Entonces se indica que no esta incluida
