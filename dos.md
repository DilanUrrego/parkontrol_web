PARKONTROL 
Entrega 2 
Equipo de Trabajo 
Responsables 
Emanuel Gallego Cano 
Josué Gomez Granda 
Dariana Lopera 
UNIVERSIDAD DE MEDELLÍN 2025 
PROYECTO PARKONTROL.
Lo que se requirió hacer: 
1) Tener su modelo poblado con al menos 100 Empresas que adquieren el Software Parkcontrol como servicio, cada uno tiene al menos 6 usuarios en sistema de los cuales solo 1 es administrador. De las 100 empresas anteriores al menos 50, tienen 3 parqueaderos en diferentes puntos de la ciudad, es de anotar que deben definirle las tarifas a cada una de las empresas y en el registro de vehículos y reservas y pagos vamos a simular que por cada parqueadero que tienen las empresas han pasado al menos 150 Automóviles, a los cuales se les a realizado el debido proceso de facturación y pago. 
2) Crear todos los índices necesario para la solución de acuerdo a los conceptos vistos en clase; cada indice deberá documentarse como parte del primer entregable. 
3) Crear 4 Vistas que ustedes visionen que debe tener su sistema. Nota: Una de las vistas deberá tener 3 join con diferentes tablas de su sistema. 
4) Crear un paquete que tenga por nombre PKG_CENTRAL, y dentro de el cree un procedimiento que permita realizar el control y pago de del parqueo, Cree un segundo procedimiento que permita validar o encontrar por placa el automovil de una persona y que le indique en cual celda se encuentra. 
5) Particionar la tabla Pagos, por el método que ustedes crean es mas eficiente de acuerdo a lo que se va a ver en el curso. 
Lo que se hizo: 
1. Introducción 
El presente documento describe la implementación técnica avanzada realizada sobre la base de datos del proyecto Parkontrol, con el fin de cumplir los requerimientos de: 
● Particionamiento de tablas 
● Optimización por índices y tablespaces 
● Poblamiento masivo 
● Creación de vistas analíticas 
● Estadísticas y performance tuning
● Procedimientos almacenados funcionales para el sistema SaaS 
El objetivo fue garantizar escalabilidad, alto rendimiento, mantenibilidad y consistencia transaccional, acorde al contexto de un sistema real de parqueadero. 
2. Configuración de Tablespaces 
Se creó infraestructura física para separar: 
Tablespace Propósito 
TS_PARKONTROL_DATA Almacenamiento de datos 
TS_PARKONTROL_INDEX Almacenamiento de índices 
TS_PAGO_Q1/Q2/Q3/Q4 Particiones trimestrales para la tabla PAGO Justificación: Mejora en rendimiento, recuperación, administración y balanceo de carga I/O. 
3. Particionamiento de la tabla PAGO 
Se particionó la tabla PAGO por rango por fecha de pago, en trimestres, para escalabilidad histórica: ● PAGO_Q1 = Enero – Marzo 
● PAGO_Q2 = Abril – Junio 
● PAGO_Q3 = Julio – Septiembre 
● PAGO_Q4 = Octubre – Diciembre 
Esta estrategia reduce tiempos de consulta y mantenimiento
Los índices fueron reconstruidos. 
4. Reconstrucción y alineación de Constraints e Índices 
Después de particionar, se: 
✔ Renombraron FK ligadas a PAGO 
✔ Se recrearon índices locales 
✔ Se movieron índices a TS_PARKONTROL_INDEX 
✔ Se activó monitoring usage 
✔ Se verificó uso real (V$OBJECT_USAGE) 
Esto garantiza que el optimizador use los índices correctos para las particiones. 
5. Poblamiento Masivo (30.000+ registros) 
Se desarrolló un script PL/SQL para insertar datos simulados: ● 200 parqueaderos 
● 200 celdas c/u 
● Reservas por 2 años históricos 
● Pagos asociados 
● Clientes factura 
● Facturas electrónicas 
Resultados: 
Registros aprox. +30.000
Commit por batch 
Manejo de excepciones 
Simulación realista de flujo de parqueadero 
6. Procedimientos Almacenados (Paquete PKG_CENTRAL) 
Se creó paquete funcional para integrarse con Backend NodeJS + Angular: 
Procedimiento Función 
PROC_CONTROL_PAGO Procesa el pago de una reserva abierta
PROC_BUSCAR_PLACA Localiza vehículo en tiempo real Validaciones realizadas 
Solo permite pago si reserva está ABIERTA 
No permite pagos duplicados por misma reserva 
Actualiza inmediatamente estado y salida del vehículo 
Comportamiento listo para consumo desde IU en Angular 
�� 7. Vistas Operacionales y Analíticas 
Vista Propósito 
VW_OCUPACION_PARQUEADERO Nivel de ocupación actual VW_HISTORIAL_RESERVAS Trazabilidad completa VW_FACTURACION_COMPLETA Auditoría contable 

VW_INGRESOS_POR_PARQUEADER O_MENSUAL 
Probadas con EXPLAIN PLAN (F10) 
8. Estadísticas y Optimización
KPI de ingresos mensuales 

Acciones realizadas: 
● DBMS_STATS.GATHER_TABLE_STATS en tablas clave 
● Análisis de cardinalidad y costos 
● Activación de index monitoring 
● Verificación de uso real de índices 
● Validación de plan de ejecución (EXPLAIN PLAN con F10) 
Oracle confirmó uso de HASH JOIN + INDEX JOIN eficientes 
9. Integridad, consistencia y transaccionalidad 
Se garantizó que: 
● No se permiten pagos duplicados 
● Pagos dependen de reservas válidas 
● Consistencia al cerrar reserva vs. liberar celda 
● Uso de EXCEPTION WHEN y mensajes controlados 
● ACID mediante COMMIT controlado 
10. Justificación de Arquitectura y Resiliencia 
Tema Decisión Razón 

Alta disponibilidad Active–Standb y 
(Master–Stand 
by) 
Modelo óptimo para OLTP + integridad de pagos
Índices particionados No particionados 
Mejor rendimiento ya que cardinalidad por partición no lo requería 

Particionamiento PAGO Trimestral Consultas históricas + auditoría fiscal 

Reglas de negocio Validación de pago único 
Modelo profesional basado en buenas prácticas empresariales Estructura del directorio 
1. Modulo AdminGlobal : 
coherencia transaccional 

a. depende servicio empresas: crear empresa, listar empresa, obtener empresa por id, 
b. depende servicio usuarios : crear usuario con rol “admin”
Metodo 
Endpoint 
descripcion 
DTo entrada Dto Salida 
Rol requerido
POST 
/empresas 
Crea una nueva empresa en el sistema. Puede crearse sin administrador asignado.
createEmpresaDt 
empresaCreate 
o 
dResponseDto 
Body: { nit: 
200: { id, 
string, 
nit, 
nombre: 
nombre,fech 
string, 
aCreacion }
direccion?: 
string } 
Super_admin
GET 
GET 
/empresas 
empresas/:id 
Lista todas las empresas 
registradas (con o sin admin asignado). 
Obtiene los detalles de una empresa específica (datos 
generales, si tiene administrador asignado, y parqueaderos 
asociados).
empresaRespo 
nseDto[] 
200: { id, 
nombre, 
nit, 
administrad 
or?: { id, 
nombre, 
email }, 
parqueadero 
s: [] } 
Params: id: 
EmpresaResp 
number 
onseDto 
200: { id, 
nombre, 
nit, 
administrad 
or?: { id, 
nombre, 
email }, 
parqueadero 
s:[]}
super_admin 
super_admin, admin: ver 
detalles solo 
de empresa 
propia



PUT 
/empresas/:id/ cambiar-admin
Cambia el administrador 
principal de una empresa (por ejemplo, reasignar otro usuario con rol ADMIN_EMPRESA). Nota: se debe eliminar el admin reemplazado
Params: id: 
userResponseD 
number 
to 
createUserDto 
201: { id, 
Body: { 
nombre, 
nombre: 
correo, 
string, 
rol, 
email: 
empresa: { 
string, 
id, nombre 
password: 
} }
string } 
super_admin
POST 
/empresas/:id/ usuarios
Crea un nuevo usuario con rol ADMIN_EMPRESA y lo asocia a una empresa que no tenga administrador asignado, en la q esta ubicado 
Nota: se valida que se envio un usuario con rol admin
createUserDto 
userAdminResp 
Body: { 
onseDto 
nombre: 
201: { id, 
string, 
nombre, 
email: 
email, rol: 
string, 
'ADMIN_EMPR 
password: 
ESA', 
string. 
empresa: { 
role: “admin” 
id, nombre 
} 
} }
super_admin
DELETE 
/empresas/:id 
recibe id de una empresa busca si existe y elimina de la Bd
Params: id: 
204: deleted 
number 
recurso 
bieneliminado
super_admin



2. Modulo empresas
Metodo 
Endpoint 
descripcion 
DTo entrada Dto Salida 
Rol requerido
GET 
/empresas/:id 
Nota: toma el 
empresaId del 
token payload del admin , 
empresaid 
relacionada
Obtiene los detalles de su 
empresa (datos generales, tiene administrador asignado, y 
parqueaderos asociados). 
Nota: aca mismo se obtienes los operadores y admin de la 
empresa
- 200: { id, nombre, nit, 
administrado 
r?: { id, 
nombre, 
email }, 
parqueaderos 
:[]}
admin: solo 
puede ver 
detalles su 
empresa 
relacionada
PUT 
POST 
/empresas 
Nota: toma el 
empresaId del 
token payload del admin , 
empresaid 
relacionada 
/empresas/usuar ios 
Nota: toma el 
empresaId del 
token payload del admin , 
empresaid 
relacionada
Actualiza los datos básicos de la empresa (nombre, nit, dirección, teléfono, etc.). 
Crea un nuevo usuario 
operador asociado la empresa. Solo el administrador de esa empresa puede hacerlo. 
Nota: se valida se envio rol de operador 
llama servicio user -> crear usuario
createEmpresa 
EmpresaRespo 
Dto 
nseDto 
Body: { nit: 
200: { id, 
string, 
nombre, nit, 
nombre: 
administrado 
string, 
r?: { id, 
direccion?: 
nombre, 
string } 
email }, 
parqueaderos 
:[]} 
CreateUserDto 
userResponseDt 
Body: { 
o 
nombre, 
201: { id, 
correo, 
nombre, 
contraseña, 
correo, rol, 
id_rol (solo 
empresa: { 
operador) } 
id, nombre } 
}
admin: 
modifica 
propiedades 
basicas de su empresa 
admin: crea 
operadores 
para su 
empresa
















