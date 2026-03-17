# Detalle de pruebas unitarias (backend y frontend)

## Backend (Jest)

### AuthService
Ubicacion: backend/src/auth/auth.service.spec.ts
- Login exitoso: simula usuario valido y bcrypt.compare true, espera token.
- Correo invalido: UsuariosService devuelve null y se espera UnauthorizedException.
- Contrasena invalida: bcrypt.compare false y se espera UnauthorizedException.

### CeldasService
Ubicacion: backend/src/celdas/celdas.service.spec.ts
- Falla si no existe tipo de celda: NotFoundException.
- Falla si no existe sensor: NotFoundException.
- Crea celda con datos validos y guarda en repositorio.

### ReservasService
Ubicacion: backend/src/reservas/reservas.service.spec.ts
- Rechaza crear reserva si celda no esta libre.
- Crea reserva y marca celda como ocupada.
- Rechaza finalizar reserva ya cerrada.
- Finaliza reserva y libera celda.

### VistasService
Ubicacion: backend/src/vistas/vistas.service.spec.ts
- Retorna ocupacion con llaves transformadas a camelCase.
- Retorna null si no hay ocupacion para el parqueadero.

### FacturacionService
Ubicacion: backend/src/facturacion/facturacion.service.spec.ts
- Falla si no existe cliente de facturacion.
- Crea factura con datos validos.

## Frontend (Karma/Jasmine)

### LoginComponent
Ubicacion: frontend-angular/src/app/pages/login/login.component.spec.ts
- Login valido navega a /dashboard.
- Credenciales invalidas muestran "Acceso rechazado".
- Contrasena invalida muestra "Acceso rechazado".
- Formulario vacio no llama al servicio.

### CeldasComponent
Ubicacion: frontend-angular/src/app/pages/celdas/celdas.component.spec.ts
- Carga parqueaderos y celdas al iniciar.
- Error de creacion con tipo invalido muestra mensaje.

### ReservasComponent
Ubicacion: frontend-angular/src/app/pages/reservas/reservas.component.spec.ts
- Carga parqueaderos y reservas al iniciar.
- Finalizar reserva dispara creacion de pago.
- Maneja error de pago con mensaje.

### VistasComponent
Ubicacion: frontend-angular/src/app/pages/vistas/vistas.component.spec.ts
- Carga ocupacion al iniciar con idEmpresa.
- Calcula promedio de ocupacion.

### FacturacionComponent
Ubicacion: frontend-angular/src/app/pages/facturacion/facturacion.component.spec.ts
- Crear factura muestra mensaje de exito.
- Error al crear factura muestra mensaje de error.

### App (root)
Ubicacion: frontend-angular/src/app/app.spec.ts
- Crea la aplicacion.
- Verifica que existe router-outlet.
