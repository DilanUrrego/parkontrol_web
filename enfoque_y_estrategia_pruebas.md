# Enfoque y estrategia de pruebas

## 1. Proposito y alcance
Este documento define el enfoque y la estrategia de pruebas para Parkontrol, con foco en asegurar el cumplimiento de requisitos funcionales, la calidad tecnica y la experiencia del usuario final. Se cubren backend (NestJS), frontend (Angular) y base de datos (Oracle).

## 2. Principios y enfoque general
- Se aplican pruebas de caja negra, blanca y gris.
- Se aplican pruebas basadas en requisitos y basadas en riesgo.
- Se usan tecnicas formales de diseno ISTQB.
- Se combina automatizacion con pruebas manuales complementarias.
- Se aplica validacion (orientada al usuario) y verificacion (orientada al cumplimiento tecnico).

## 3. Niveles de prueba
- Unitarias: validan servicios, validadores y utilidades aisladas.
- Integracion: validan controladores, servicios y repositorios con BD.
- Sistema: validan flujos completos de negocio en entorno integrado.
- Aceptacion (UAT): validan que los flujos satisfacen a usuarios admin y operador.

## 4. Tipos de prueba definidos

### 4.1 Pruebas de caja negra
Se validan entradas y salidas desde la perspectiva del usuario o del consumidor de la API, sin considerar la implementacion interna. Se verifican reglas de negocio observables, mensajes de error, codigos de respuesta y consistencia del estado visible.
- Alcance: formularios UI, endpoints REST, validaciones de datos y respuestas HTTP.
- Criterio clave: resultados correctos ante datos validos e invalidos.
- Ejemplo: crear reserva con celda disponible y confirmar que queda activa y la celda ocupada.

### 4.2 Pruebas de caja blanca
Se verifica la logica interna del codigo, cubriendo rutas, decisiones y excepciones. Se analiza la calidad del flujo interno, cobertura de ramas y manejo de errores en servicios y repositorios.
- Alcance: servicios de negocio, validadores, funciones criticas y procedimientos.
- Criterio clave: cobertura de decisiones en reglas de negocio sensibles.
- Ejemplo: validar que el metodo de pago impide duplicados y solo acepta reservas abiertas.

### 4.3 Pruebas de caja gris
Se combina el conocimiento parcial de la arquitectura con pruebas externas. Se diseñan casos con base en reglas, estructura de BD y estados internos, pero ejecutados como pruebas funcionales.
- Alcance: endpoints con datos preparados en BD, flujos que dependen de estados previos.
- Criterio clave: coherencia entre estado interno y respuesta externa.
- Ejemplo: consultar historial por placa luego de insertar reservas con diferentes estados.

### 4.4 Pruebas basadas en requisitos
Se derivan casos directamente de los requisitos funcionales (RF) y se asegura trazabilidad RF-HU-CU-CP. Cada requisito se valida con escenarios normales, alternos y de error.
- Alcance: RF-01..RF-60 con minimo un caso cada uno.
- Criterio clave: evidencia de cumplimiento por requisito.
- Ejemplo: RF-24 crear pagos asociados a reservas con casos validos e invalidos.

### 4.5 Pruebas basadas en riesgo
Se priorizan pruebas segun impacto y probabilidad de falla. Los riesgos altos se ejecutan primero y con mayor profundidad.
- Riesgo alto: pagos duplicados, inconsistencias en reservas, errores de facturacion.
- Riesgo medio: reportes inexactos, consultas lentas, fallos de integracion.
- Riesgo bajo: textos UI, estilos, detalles visuales.
- Criterio clave: cobertura ampliada en flujos de ingresos y cierres de reserva.

### 4.6 Tecnicas ISTQB aplicadas
- Particiones de equivalencia: conjuntos validos e invalidos por campo (placa, montos, documentos).
- Valores limite: limites de fechas, montos, capacidad y tiempos de reserva.
- Tablas de decision: reglas de pago, facturacion y estados de reserva.
- Transiciones de estado: reserva activa -> finalizada, celda libre -> ocupada.
- Casos de uso: flujos completos de operador y administrador.
- Criterio clave: diseno sistematico que reduzca omisiones.

### 4.7 Automatizacion de pruebas
Se automatizan pruebas repetitivas, criticas y de regresion para reducir tiempo y errores manuales.
- Backend: Jest + Supertest (unitarias e integracion de endpoints).
- Frontend: Karma/Jasmine (unitarias), E2E planificadas con Cypress o Playwright.
- BD: scripts de prueba para procedimientos y vistas.
- Criterio clave: ejecucion consistente en CI o entornos locales.

### 4.8 Pruebas manuales complementarias
Se usan para validar experiencia de usuario, usabilidad y escenarios exploratorios no cubiertos por automatizacion.
- Validacion de dashboards y vistas analiticas.
- Exploracion de flujos en horas pico simuladas.
- Criterio clave: identificar defectos de usabilidad o navegacion.

## 5. Verificacion y validacion
- Verificacion: cumplimiento tecnico de requisitos, reglas y consistencia de datos.
- Validacion: que el usuario admin y operador logran su objetivo sin fricciones.

## 6. Entorno y herramientas
- Backend: NestJS, Jest, Supertest.
- Frontend: Angular, Karma, Jasmine.
- E2E (propuesto): Cypress o Playwright.
- Base de datos: Oracle XE, scripts PL/SQL de prueba.
- Control de versiones: Git.

## 7. Criterios de entrada y salida
- Entrada: requisitos aprobados, HU y CU definidos, entorno disponible.
- Salida: pruebas criticas ejecutadas, defectos severos resueltos, reporte final emitido.

## 8. Trazabilidad
- Cada HU se vincula a uno o varios casos de prueba.
- Cada RF tiene al menos un caso de prueba automatizado o manual.

## 9. Entregables de pruebas
- Plan de pruebas.
- Casos de prueba con datos y resultados esperados.
- Reporte de ejecucion y defectos.
- Matriz de trazabilidad RF-HU-CU-CP.
