# Casos de prueba para 10 funcionalidades del sistema

FUNCIONALIDAD 1: Iniciar sesion
HU-02
La prueba consiste en el inicio de sesion en el sistema con credenciales validas. El sistema debe permitir el acceso cuando las credenciales son correctas y rechazarlo cuando son invalidas o incompletas.

Casos de prueba
Caso de Prueba 1: Credenciales validas (acceso exitoso)
Caso de Prueba 2: Contrasena incorrecta
Caso de Prueba 3: Correo inexistente
Caso de Prueba 4: Campos obligatorios vacios
Caso de Prueba 5: Formato de correo invalido

FUNCIONALIDAD 2: Registrar operador
HU-01
La prueba consiste en registrar un operador en el sistema con nombre, correo y contrasena. El sistema debe rechazar registros duplicados o incompletos.

Casos de prueba
Caso de Prueba 1: Correo duplicado
Caso de Prueba 2: Datos obligatorios incompletos
Caso de Prueba 3: Contrasena invalida (muy corta)
Caso de Prueba 4: Datos validos (registro exitoso)
Caso de Prueba 5: Intento de registrar rol distinto a operador

FUNCIONALIDAD 3: Crear parqueadero
HU-03
La prueba consiste en crear un parqueadero en el sistema con nombre, ubicacion y capacidad. El sistema debe validar la capacidad y los datos obligatorios.

Casos de prueba
Caso de Prueba 1: Capacidad menor o igual a cero
Caso de Prueba 2: Nombre vacio
Caso de Prueba 3: Ubicacion vacia
Caso de Prueba 4: Datos validos (parqueadero creado)
Caso de Prueba 5: Parqueadero con nombre duplicado en la misma empresa

FUNCIONALIDAD 4: Crear celda
HU-06
La prueba consiste en crear una celda en el sistema para un parqueadero existente. La celda debe quedar disponible y asociada al parqueadero.

Casos de prueba
Caso de Prueba 1: Parqueadero inexistente
Caso de Prueba 2: Tipo de celda invalido
Caso de Prueba 3: Datos validos (celda creada)
Caso de Prueba 4: Celda duplicada en el mismo parqueadero
Caso de Prueba 5: Datos obligatorios vacios

FUNCIONALIDAD 5: Registrar vehiculo
HU-10
La prueba consiste en registrar un vehiculo en el sistema con placa y tipo. El sistema debe rechazar placas duplicadas o con formato invalido.

Casos de prueba
Caso de Prueba 1: Placa duplicada
Caso de Prueba 2: Placa con formato invalido
Caso de Prueba 3: Tipo de vehiculo invalido
Caso de Prueba 4: Datos validos (vehiculo registrado)
Caso de Prueba 5: Placa vacia

FUNCIONALIDAD 6: Crear reserva
HU-13
La prueba consiste en la creacion de una reserva en el sistema, con dos datos principales: vehiculo y celda. El vehiculo debe estar previamente registrado en el sistema, y la celda debe existir y estar disponible. El sistema no debe permitir crear una reserva si la celda esta ocupada o si el vehiculo no existe.

Casos de prueba
Caso de Prueba 1: Vehiculo no registrado
Caso de Prueba 2: Celda ocupada
Caso de Prueba 3: Celda inexistente
Caso de Prueba 4: Datos validos (reserva exitosa)
Caso de Prueba 5: Reserva sin seleccionar celda
Caso de Prueba 6: Reserva sin seleccionar vehiculo
Caso de Prueba 7: Celda pertenece a otra empresa

FUNCIONALIDAD 7: Finalizar reserva
HU-14
La prueba consiste en finalizar una reserva activa en el sistema. Al finalizar, la celda debe quedar disponible.

Casos de prueba
Caso de Prueba 1: Reserva activa (finalizacion exitosa)
Caso de Prueba 2: Reserva ya finalizada
Caso de Prueba 3: Reserva inexistente
Caso de Prueba 4: Reserva de otra empresa
Caso de Prueba 5: Verificacion de celda liberada tras finalizar

FUNCIONALIDAD 8: Registrar pago
HU-18
La prueba consiste en registrar un pago asociado a una reserva abierta en el sistema. El sistema debe rechazar pagos duplicados o montos invalidos.

Casos de prueba
Caso de Prueba 1: Reserva sin pago (registro exitoso)
Caso de Prueba 2: Reserva con pago previo (duplicado)
Caso de Prueba 3: Monto menor o igual a cero
Caso de Prueba 4: Reserva inexistente
Caso de Prueba 5: Metodo de pago invalido

FUNCIONALIDAD 9: Generar factura electronica
HU-23
La prueba consiste en generar una factura electronica asociada a un pago en el sistema. No se permiten facturas duplicadas para el mismo pago.

Casos de prueba
Caso de Prueba 1: Pago existente (factura generada)
Caso de Prueba 2: Pago inexistente
Caso de Prueba 3: Pago con factura previa (duplicado)
Caso de Prueba 4: Cliente de facturacion inexistente
Caso de Prueba 5: Datos obligatorios incompletos

FUNCIONALIDAD 10: Consultar ocupacion por parqueadero
HU-35
La prueba consiste en consultar la ocupacion de un parqueadero en el sistema. La respuesta debe incluir total de celdas y ocupadas.

Casos de prueba
Caso de Prueba 1: Parqueadero con ocupacion registrada
Caso de Prueba 2: Parqueadero sin celdas
Caso de Prueba 3: Parqueadero inexistente
Caso de Prueba 4: Parqueadero de otra empresa
Caso de Prueba 5: Verificacion de totales (celdas y ocupadas)
