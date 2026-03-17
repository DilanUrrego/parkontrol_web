# Prueba de caja negra - Iniciar sesion

## Funcionalidad
Iniciar sesion en el sistema con correo y contrasena.

## HU relacionada
HU-02: Iniciar sesion

## Parametros definidos
- Correo valido: ema1001cano@gmail.com
- Contrasena valida: Prueba1.
- Correo invalido: ema1010@gmail.com
- Contrasena invalida: prueba1.
- Campos vacios: correo vacio y contrasena vacia

## Descripcion de la prueba
La prueba verifica el comportamiento observable del sistema ante intentos de inicio de sesion con datos validos e invalidos. No se inspecciona la implementacion interna, solo las respuestas del sistema, los mensajes de error y el resultado final (acceso concedido o rechazado).

## Casos de prueba (caja negra)
1. Credenciales validas: acceso exitoso.
2. Correo invalido: acceso rechazado.
3. Contrasena invalida: acceso rechazado.
4. Campos vacios: error de validacion.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[Inicio] --> B[Ingresar correo y contrasena]
  B --> C{Campos completos?}
  C -- No --> D[Mostrar error de validacion]
  C -- Si --> E{Credenciales validas?}
  E -- No --> F[Acceso rechazado]
  E -- Si --> G[Acceso concedido]
  D --> H[Fin]
  F --> H
  G --> H
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> NoAutenticado
  NoAutenticado --> Autenticando: Enviar credenciales
  Autenticando --> Autenticado: Credenciales validas
  Autenticando --> Error: Credenciales invalidas
  Error --> NoAutenticado: Reintentar
  Autenticado --> [*]
```

# Prueba de caja negra - Crear celda

## Funcionalidad
Crear celda en el sistema para un parqueadero existente.

## HU relacionada
HU-06: Crear celda

## Parametros definidos
- Parqueadero existente: idParqueadero valido
- Parqueadero inexistente: idParqueadero invalido
- Tipo de celda invalido
- Datos validos (celda creada)

## Descripcion de la prueba
La prueba verifica que el sistema permita crear una celda cuando el parqueadero existe y los datos son validos. El sistema debe rechazar parqueaderos inexistentes o tipos de celda invalidos.

## Casos de prueba (caja negra)
1. Parqueadero inexistente: rechazo.
2. Tipo de celda invalido: error de validacion.
3. Datos validos: celda creada.
4. Datos obligatorios vacios: error de validacion.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[Inicio] --> B[Ingresar datos de celda]
  B --> C{Parqueadero existe?}
  C -- No --> D[Rechazar solicitud]
  C -- Si --> E{Tipo de celda valido?}
  E -- No --> F[Error de validacion]
  E -- Si --> G[Crear celda]
  D --> H[Fin]
  F --> H
  G --> H
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> Preparando
  Preparando --> Validando: Enviar datos
  Validando --> Creada: Datos validos
  Validando --> Error: Datos invalidos
  Error --> Preparando: Corregir datos
  Creada --> [*]
```

# Prueba de caja negra - Finalizar reserva

## Funcionalidad
Finalizar una reserva activa en el sistema y liberar la celda asociada.

## HU relacionada
HU-14: Finalizar reserva

## Parametros definidos
- Reserva activa: idReserva valido
- Reserva finalizada: idReserva en estado finalizada
- Reserva inexistente: idReserva invalido

## Descripcion de la prueba
La prueba verifica que el sistema permita finalizar reservas activas, rechace reservas finalizadas o inexistentes y libere la celda asociada.

## Casos de prueba (caja negra)
1. Reserva activa: finalizacion exitosa.
2. Reserva ya finalizada: rechazo.
3. Reserva inexistente: no encontrada.
4. Verificacion de celda liberada tras finalizar.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[Inicio] --> B[Solicitar finalizar reserva]
  B --> C{Reserva existe?}
  C -- No --> D[No encontrada]
  C -- Si --> E{Reserva activa?}
  E -- No --> F[Rechazar solicitud]
  E -- Si --> G[Finalizar reserva]
  G --> H[Liberar celda]
  D --> I[Fin]
  F --> I
  H --> I
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> Activa
  Activa --> Finalizada: Finalizar reserva
  Finalizada --> [*]
  Activa --> Error: Reserva no existe
  Finalizada --> Error: Intento de finalizacion
  Error --> Activa: Reintentar
```

# Prueba de caja negra - Consultar ocupacion por parqueadero

## Funcionalidad
Consultar la ocupacion de un parqueadero en el sistema.

## HU relacionada
HU-35: Consultar ocupacion por parqueadero

## Parametros definidos
- Parqueadero existente: idParqueadero valido
- Parqueadero inexistente: idParqueadero invalido
- Parqueadero sin celdas

## Descripcion de la prueba
La prueba verifica que el sistema devuelva el nivel de ocupacion con totales de celdas y ocupadas para un parqueadero valido, y que indique error cuando no exista.

## Casos de prueba (caja negra)
1. Parqueadero con ocupacion registrada: respuesta con totales.
2. Parqueadero sin celdas: totales en cero.
3. Parqueadero inexistente: no encontrado.
4. Parqueadero de otra empresa: acceso rechazado.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[Inicio] --> B[Consultar ocupacion]
  B --> C{Parqueadero existe?}
  C -- No --> D[No encontrado]
  C -- Si --> E[Calcular ocupacion]
  E --> F[Responder totales]
  D --> G[Fin]
  F --> G
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> Consultando
  Consultando --> Respuesta: Parqueadero valido
  Consultando --> Error: Parqueadero inexistente
  Respuesta --> [*]
  Error --> Consultando: Reintentar
```

# Prueba de caja negra - Generar factura electronica

## Funcionalidad
Generar una factura electronica en el sistema asociada a un pago.

## HU relacionada
HU-23: Generar factura electronica

## Parametros definidos
- Pago existente sin factura
- Pago inexistente
- Pago con factura previa
- Cliente de facturacion inexistente

## Descripcion de la prueba
La prueba verifica que el sistema genere la factura cuando el pago y cliente existen, y rechace duplicidad o datos invalidos.

## Casos de prueba (caja negra)
1. Pago existente: factura generada.
2. Pago inexistente: rechazo.
3. Pago con factura previa: rechazo.
4. Cliente inexistente: error.
5. Datos obligatorios incompletos: error de validacion.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[Inicio] --> B[Solicitar factura]
  B --> C{Pago existe?}
  C -- No --> D[Rechazar solicitud]
  C -- Si --> E{Factura previa?}
  E -- Si --> F[Rechazar duplicidad]
  E -- No --> G{Cliente valido?}
  G -- No --> H[Error de validacion]
  G -- Si --> I[Generar factura]
  D --> J[Fin]
  F --> J
  H --> J
  I --> J
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> SinFactura
  SinFactura --> Generando: Solicitar factura
  Generando --> Emitida: Datos validos
  Generando --> Error: Pago inexistente
  Generando --> Error: Duplicidad
  Generando --> Error: Cliente invalido
  Error --> SinFactura: Reintentar
  Emitida --> [*]
```
