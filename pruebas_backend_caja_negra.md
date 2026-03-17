# Pruebas de caja negra - Backend por funcionalidad

> Este documento detalla casos de prueba backend (API REST) para las funcionalidades documentadas en prueba_caja_negra_login.md, incluyendo endpoints y codigos de respuesta esperados.

# Funcionalidad: Iniciar sesion (backend)

## Endpoint
POST /api/auth/login

## HU relacionada
HU-02: Iniciar sesion

## Descripcion de la prueba
Se valida la respuesta del sistema ante credenciales validas e invalidas, sin inspeccionar la implementacion interna. Se verifican codigos de estado y estructura de respuesta.

## Casos de prueba (caja negra)
1. Credenciales validas: 201 + respuesta con access_token.
2. Correo invalido: 401 + mensaje de acceso rechazado.
3. Contrasena invalida: 401 + mensaje de acceso rechazado.
4. Campos vacios: 400 + errores de validacion.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[POST /api/auth/login] --> B{Campos completos?}
  B -- No --> C[400 Validacion]
  B -- Si --> D{Credenciales validas?}
  D -- No --> E[401 Acceso rechazado]
  D -- Si --> F[201 Token]
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> NoAutenticado
  NoAutenticado --> Autenticando: Enviar credenciales
  Autenticando --> Autenticado: 201 Token
  Autenticando --> Error: 401/400
  Error --> NoAutenticado: Reintentar
  Autenticado --> [*]
```

# Funcionalidad: Crear celda (backend)

## Endpoint
POST /api/cells

## HU relacionada
HU-06: Crear celda

## Descripcion de la prueba
Se valida la creacion de una celda asociada a un parqueadero existente. Se revisan errores por parqueadero inexistente, tipo invalido o datos incompletos.

## Casos de prueba (caja negra)
1. Parqueadero inexistente: 404.
2. Tipo de celda invalido: 400.
3. Datos validos: 201 + celda creada.
4. Datos obligatorios vacios: 400.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[POST /api/cells] --> B{Parqueadero existe?}
  B -- No --> C[404 No encontrado]
  B -- Si --> D{Datos validos?}
  D -- No --> E[400 Validacion]
  D -- Si --> F[201 Celda creada]
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> Enviando
  Enviando --> Creada: 201
  Enviando --> Error: 400/404
  Error --> Enviando: Reintentar
  Creada --> [*]
```

# Funcionalidad: Finalizar reserva (backend)

## Endpoint
PATCH /api/reservations/:id/finalizar

## HU relacionada
HU-14: Finalizar reserva

## Descripcion de la prueba
Se valida que una reserva activa pueda finalizarse y que el sistema responda correctamente ante reservas inexistentes o ya finalizadas.

## Casos de prueba (caja negra)
1. Reserva activa: 200 + reserva finalizada.
2. Reserva ya finalizada: 400 o 409 (segun validacion).
3. Reserva inexistente: 404.
4. Verificacion de celda liberada: 200 y estado de celda libre.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[PATCH /api/reservations/:id/finalizar] --> B{Reserva existe?}
  B -- No --> C[404 No encontrado]
  B -- Si --> D{Reserva activa?}
  D -- No --> E[400/409 Rechazo]
  D -- Si --> F[200 Finalizada]
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> Activa
  Activa --> Finalizada: 200
  Activa --> Error: 404
  Finalizada --> Error: 400/409
  Error --> Activa: Reintentar
  Finalizada --> [*]
```

# Funcionalidad: Consultar ocupacion por parqueadero (backend)

## Endpoint
GET /api/views/ocupacion/:idParqueadero

## HU relacionada
HU-35: Consultar ocupacion por parqueadero

## Descripcion de la prueba
Se valida que el sistema responda con el resumen de ocupacion para un parqueadero valido, y con error para parqueadero inexistente.

## Casos de prueba (caja negra)
1. Parqueadero con ocupacion registrada: 200 + totales.
2. Parqueadero sin celdas: 200 + totales en cero.
3. Parqueadero inexistente: 404.
4. Parqueadero de otra empresa: 403 (si aplica restriccion por empresa).

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[GET /api/views/ocupacion/:id] --> B{Parqueadero existe?}
  B -- No --> C[404 No encontrado]
  B -- Si --> D[200 Resumen]
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> Consultando
  Consultando --> Respuesta: 200
  Consultando --> Error: 404/403
  Error --> Consultando: Reintentar
  Respuesta --> [*]
```

# Funcionalidad: Generar factura electronica (backend)

## Endpoint
POST /api/invoicing/facturas

## HU relacionada
HU-23: Generar factura electronica

## Descripcion de la prueba
Se valida la generacion de factura para un pago existente y el rechazo ante pagos inexistentes, duplicados o datos incompletos.

## Casos de prueba (caja negra)
1. Pago existente sin factura: 201 + factura creada.
2. Pago inexistente: 404.
3. Pago con factura previa: 409 o 400 (segun validacion).
4. Cliente inexistente: 404.
5. Datos obligatorios incompletos: 400.

## Grafico de pruebas (flujo)
```mermaid
flowchart TD
  A[POST /api/invoicing/facturas] --> B{Pago existe?}
  B -- No --> C[404 No encontrado]
  B -- Si --> D{Factura previa?}
  D -- Si --> E[400/409 Duplicidad]
  D -- No --> F{Cliente valido?}
  F -- No --> G[404/400 Error]
  F -- Si --> H[201 Factura creada]
```

## Grafo de pruebas (transiciones de estado)
```mermaid
stateDiagram-v2
  [*] --> SinFactura
  SinFactura --> Generando: Enviar solicitud
  Generando --> Emitida: 201
  Generando --> Error: 400/404/409
  Error --> SinFactura: Reintentar
  Emitida --> [*]
```
