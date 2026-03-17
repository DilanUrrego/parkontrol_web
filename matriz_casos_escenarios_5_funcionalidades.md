# Matriz de casos y escenarios de prueba (5 funcionalidades)

## Funcionalidad 1: Iniciar sesion

**Casos de prueba (especificos)**
1. Acceso valido - Credenciales validas (correo y contrasena correctos).
2. Correo invalido - Correo invalido con contrasena valida.
3. Contrasena invalida - Contrasena invalida con correo valido.
4. Campos vacios - Campos vacios (correo y contrasena).
5. Formato invalido - Formato de correo invalido.

**Escenarios de prueba (exito/fracaso)**
1. Exito: el sistema permite el acceso y genera token.
2. Fracaso: el sistema rechaza credenciales invalidas con 401.
3. Fracaso: el sistema rechaza campos incompletos con 400.
4. Exito: el usuario con rol administrador es redirigido a dashboard.
5. Exito: el usuario con rol operador es redirigido a operador-dashboard.

## Funcionalidad 2: Crear celda

**Casos de prueba (especificos)**
1. Parqueadero inexistente - Parqueadero inexistente.
2. Tipo invalido - Tipo de celda invalido.
3. Sensor inexistente - Sensor inexistente.
4. Datos validos - Datos validos (celda creada).
5. Campos obligatorios vacios - Datos obligatorios vacios.

**Escenarios de prueba (exito/fracaso)**
1. Exito: se crea la celda y queda disponible.
2. Fracaso: se rechaza por parqueadero inexistente.
3. Fracaso: se rechaza por tipo de celda invalido.
4. Fracaso: se rechaza por sensor inexistente.
5. Fracaso: se rechaza por datos incompletos.

## Funcionalidad 3: Finalizar reserva

**Casos de prueba (especificos)**
1. Reserva activa - Reserva activa (finalizacion exitosa).
2. Reserva cerrada - Reserva ya finalizada.
3. Reserva inexistente - Reserva inexistente.
4. Liberacion de celda - Verificar liberacion de celda tras finalizar.
5. Otra empresa - Reserva de otra empresa (si aplica control por empresa).

**Escenarios de prueba (exito/fracaso)**
1. Exito: la reserva pasa a CERRADA y la celda queda LIBRE.
2. Fracaso: el sistema rechaza finalizar una reserva ya cerrada.
3. Fracaso: el sistema indica que la reserva no existe.
4. Exito: el listado de reservas se actualiza tras finalizar.
5. Fracaso: el sistema evita finalizar reservas de otra empresa.

## Funcionalidad 4: Consultar ocupacion por parqueadero

**Casos de prueba (especificos)**
1. Ocupacion registrada - Parqueadero con ocupacion registrada.
2. Sin celdas - Parqueadero sin celdas.
3. Parqueadero inexistente - Parqueadero inexistente.
4. Restriccion por empresa - Parqueadero de otra empresa (si aplica restriccion).
5. Totales y ocupadas - Verificar totales de celdas y ocupadas.

**Escenarios de prueba (exito/fracaso)**
1. Exito: el sistema devuelve el resumen de ocupacion.
2. Exito: el sistema devuelve totales en cero cuando no hay celdas.
3. Fracaso: el sistema responde 404 si el parqueadero no existe.
4. Fracaso: el sistema rechaza acceso si no pertenece a la empresa.
5. Exito: el sistema muestra porcentajes calculados correctamente en el front.

## Funcionalidad 5: Generar factura electronica

**Casos de prueba (especificos)**
1. Pago sin factura - Pago existente sin factura previa.
2. Pago inexistente - Pago inexistente.
3. Factura previa - Pago con factura previa.
4. Cliente inexistente - Cliente de facturacion inexistente.
5. Datos incompletos - Datos obligatorios incompletos.

**Escenarios de prueba (exito/fracaso)**
1. Exito: el sistema crea la factura y retorna datos.
2. Fracaso: el sistema rechaza el pago inexistente.
3. Fracaso: el sistema rechaza la duplicidad de factura.
4. Fracaso: el sistema rechaza cliente inexistente.
5. Fracaso: el sistema rechaza datos incompletos.
