# Niveles de prueba

## 1. Proposito
Definir los niveles de prueba del proyecto Parkontrol y establecer criterios de entrada y salida para cada nivel.

## 2. Pruebas unitarias
**Objetivo:** Validar funciones, servicios y validadores de manera aislada.
**Alcance:** Servicios de negocio, validadores, utilidades, reglas de negocio criticas.
**Tecnicas sugeridas:** particiones de equivalencia, valores limite, cobertura de ramas.

**Criterios de entrada:**
- Requisitos y HU relacionados definidos.
- Codigo compilando sin errores.
- Datos y mocks disponibles.

**Criterios de salida:**
- Casos unitarios ejecutados y aprobados.
- Cobertura minima acordada en componentes criticos.
- Defectos severos corregidos o documentados.

## 3. Pruebas de integracion
**Objetivo:** Validar la interaccion entre modulos y capas (controladores, servicios, BD).
**Alcance:** Endpoints REST, servicios con repositorios, integracion con Oracle.

**Criterios de entrada:**
- Unitarias aprobadas en los componentes a integrar.
- Entorno de BD disponible.
- Datos semilla o fixtures cargados.

**Criterios de salida:**
- Flujos integrados ejecutados sin errores bloqueantes.
- Defectos criticos corregidos o registrados.
- Reporte de integracion emitido.

## 4. Integracion Top-Down
**Objetivo:** Integrar desde capas superiores hacia inferiores, usando stubs en dependencias.
**Alcance:** Controladores y servicios principales con dependencias simuladas.

**Criterios de entrada:**
- Interfaces de dependencias definidas.
- Stubs disponibles para capas inferiores.
- Unitarias aprobadas en capas superiores.

**Criterios de salida:**
- Flujos principales de capa superior validados.
- Defectos en integracion documentados.
- Evidencia de pruebas con stubs.

## 5. Integracion Bottom-Up
**Objetivo:** Integrar desde capas inferiores hacia superiores, usando drivers.
**Alcance:** Repositorios, servicios de datos y reglas de negocio base.

**Criterios de entrada:**
- Componentes de bajo nivel implementados.
- Drivers de prueba disponibles.
- Datos de prueba cargados.

**Criterios de salida:**
- Componentes base integrados y estables.
- Defectos criticos corregidos o registrados.
- Evidencia de pruebas con drivers.

## 6. Pruebas de sistema
**Objetivo:** Validar el sistema completo en condiciones cercanas a produccion.
**Alcance:** Flujos completos de administrador y operador, API + UI + BD.

**Criterios de entrada:**
- Integracion aprobada.
- Entorno estable con configuraciones equivalentes a produccion.
- Datos de prueba representativos.

**Criterios de salida:**
- Flujos criticos aprobados (reservas, pagos, facturacion, reportes).
- Rendimiento basico aceptable (sin errores de tiempo de espera).
- Defectos severos resueltos o en plan de mitigacion.

## 7. Pruebas de aceptacion
**Objetivo:** Confirmar que el sistema satisface las necesidades del usuario.
**Alcance:** Escenarios reales de uso por roles (admin y operador).

**Criterios de entrada:**
- Pruebas de sistema aprobadas.
- Casos de aceptacion definidos en formato Given/When/Then.
- Participacion de usuarios o representantes.

**Criterios de salida:**
- Aprobacion formal de los usuarios clave.
- No existen defectos bloqueantes en flujos principales.
- Acta o evidencia de aceptacion registrada.

## 8. Resumen de relacion entre niveles
- Unitarias validan unidades de codigo aisladas.
- Integracion valida interfaces entre componentes.
- Top-Down y Bottom-Up son estrategias de integracion con criterios propios.
- Sistema valida el producto completo.
- Aceptacion valida la satisfaccion del usuario final.
