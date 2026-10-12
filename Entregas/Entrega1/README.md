# ⛏️ Inventario de Minecraft — Simulador en JavaScript ES6

> **Desarrollo Web en Entorno Cliente (DWEC)**  
> **Entrega 1:** La documentación en su primer estado es generada mediante DeepWiki y Gemini (Versión Pro), sin embargo ha sido revisada y cambiada manualmente por el dueño.

---

## 📖 Índice

1. [Descripción General](#-descripción-general)
2. [Estructura de Datos y Matriz](#-estructura-de-datos-y-matriz)
3. [Clase `Item`](#-clase-item)
4. [Menú y Funcionalidades](#-menú-y-funcionalidades)
   * [1. Mostrar inventario completo](#1-mostrar-inventario-completo)
   * [2. Mostrar barra de accesos rápidos](#2-mostrar-barra-de-accesos-rápidos)
   * [3. Buscar un objeto](#3-buscar-un-objeto)
   * [4. Añadir un objeto](#4-añadir-un-objeto)
   * [5. Mover un objeto](#5-mover-un-objeto)
   * [6. Eliminar un objeto](#6-eliminar-un-objeto)
   * [7. Mostrar huecos libres](#7-mostrar-huecos-libres)
   * [8. Mostrar el objeto más abundante](#8-mostrar-el-objeto-más-abundante)
5. [Funciones Modulares y Auxiliares](#-funciones-modulares-y-auxiliares)
6. [Validaciones y Tratamiento de Errores](#-validaciones-y-tratamiento-de-errores)
7. [Estructura del Proyecto y Entrega](#-estructura-del-proyecto-y-entrega)
8. [Criterios de Evaluación (Rúbrica)](#-criterios-de-evaluación-rúbrica)
9. [Instrucciones de Uso y Ejecución](#-instrucciones-de-uso-y-ejecución)

---

## 📌 Descripción General

El objetivo de esta práctica es implementar la lógica de gestión de inventario de un jugador de Minecraft en un entorno de ejecución puramente nativo. La interacción se realiza íntegramente a través de la consola del navegador (`console.log`) y ventanas modales estándar (`prompt`, `alert`, `confirm`).

El sistema permite manipular objetos apilables (*stacks*), moverlos entre ranuras, transferir excedentes, eliminar ítems con confirmación y analizar estadísticas en tiempo real.

---

## 🗺️ Estructura de Datos y Matriz

El inventario está modelado mediante una **matriz bidimensional de 4 filas por 9 columnas** ($4 \times 9$, totalizando 36 ranuras):

$$\text{Dimensiones} = 4 \text{ filas} \times 9 \text{ columnas} = 36 \text{ slots}$$

```text
Fila 0 (Hotbar / Accesos rápidos):
[0,0] [0,1] [0,2] [0,3] [0,4] [0,5] [0,6] [0,7] [0,8]

Filas 1 a 3 (Inventario principal):
[1,0] [1,1] [1,2] [1,3] [1,4] [1,5] [1,6] [1,7] [1,8]
[2,0] [2,1] [2,2] [2,3] [2,4] [2,5] [2,6] [2,7] [2,8]
[3,0] [3,1] [3,2] [3,3] [3,4] [3,5] [3,6] [3,7] [3,8]
```

* **Fila 0**: Corresponde a la **Barra de accesos rápidos** (*Hotbar*).
* **Filas 1 a 3**: Representan el **Inventario principal** del jugador.
* **Huecos vacíos**: Se representan como casillas sin instanciar (`undefined` / no asignadas).
* **Huecos ocupados**: Contienen una instancia individual de la clase `Item`.

### Datos iniciales precargados (Hardcodeados para pruebas)
Para verificar el funcionamiento inmediato, el inventario se inicializa con los siguientes ítems de prueba:

| Posición | Objeto | Descripción | Stack Máximo | Cantidad Inicial |
| :---: | :--- | :--- | :---: | :---: |
| `[0,0]` | **Piedra** | Trozo sólido de roca dura | 64 | 64 |
| `[1,2]` | **Manzana** | El fruto que Eva se comió cuando no debía | 64 | 16 |
| `[2,8]` | **Antorcha** | Un palo con un cacho carbón que arde | 64 | 32 |
| `[1,4]` | **Espada de diamante** | Espada hecha del material más duro del planeta | 1 | 1 |
| `[2,3]` | **Pico de hierro** | Pico hecho de 3 simples lingotes de hierro | 1 | 1 |
| `[3,1]` | **Prueba** | Objeto de testeo unitario | 1 | 1 |

---

## 🧱 Clase `Item`

La clase `Item` encapsula las propiedades y comportamientos de cada unidad almacenada.

```javascript
class Item {
    constructor(name, description, maxStack, quantity) { ... }
    get quantity() { ... }
    set quantity(value) { ... }
    showInfo() { ... }
    showInfoShorted() { ... }
}
```

### Propiedades y Métodos

* **`name`** *(String)*: Nombre del objeto (ej. `"Piedra"`, `"Espada de diamante"`).
* **`description`** *(String)*: Descripción contextual del objeto.
* **`maxStack`** *(Number)*: Límite superior de unidades que admite un único casillero para este ítem (ej. `64` para bloques/consumibles, `1` para herramientas/armas).
* **`_quantity`** *(Number)*: Propiedad privada/interna que almacena la cantidad actual.
* **`get quantity()`**: Retorna el valor actual de `_quantity`.
* **`set quantity(value)`**: Valida que el nuevo valor cumpla con la restricción $0 \le \text{value} \le \text{maxStack}$. Si desborda, trunca el valor al máximo permitido.
* **`showInfo()`**: Emite por consola un bloque descriptivo multilinea con todos los atributos del ítem.
* **`showInfoShorted()`**: Retorna una representación compacta en formato `Nombre(cantidad)`.

---

## 🕹️ Menú y Funcionalidades

El flujo de ejecución se gestiona con un bucle `do...while` y un selector `switch`, manteniendo activo el programa hasta que el usuario decida salir introduciendo `0` o cancelando la ventana principal.

```text
INVENTARIO DE MINECRAFT
======================================
1. Mostrar inventario completo
2. Mostrar barra de accesos rápidos
3. Buscar un objeto
4. Añadir un objeto al inventario
5. Mover un objeto
6. Eliminar un objeto
7. Mostrar huecos libres
8. Mostrar el objeto más abundante
0. Salir
```

---

### 1. Mostrar inventario completo
* **Función**: `showInventory()`
* **Comportamiento**: Recorre las 4 filas y 9 columnas de la matriz. Construye una cadena visual por cada fila indicando el nombre, cantidad y coordenadas de cada objeto, o la etiqueta `VACIO[i,j]` si el slot no contiene ningún ítem.

### 2. Mostrar barra de accesos rápidos
* **Función**: `showQuickAccessBar()`
* **Comportamiento**: Aísla la fila de índice `0` (`inventory[0]`) y la recorre mediante el método funcional **`Array.prototype.forEach()`**. Emplea `showInfoShorted()` para representar cada elemento de manera concisa.

### 3. Buscar un objeto
* **Función**: `searchItem()`
* **Comportamiento**:
  * Solicita el nombre del ítem mediante `prompt()`.
  * Realiza una búsqueda case-insensitive (`toLowerCase()`) en toda la matriz.
  * Si se localiza, acumula todas las coordenadas donde aparece (ej. `[1][2], [2][5]`), suma la cantidad global de todas sus instancias y muestra su descripción detallada por consola.
  * Si no existe, muestra un mensaje de advertencia.

### 4. Añadir un objeto
* **Función**: `addItem()`
* **Comportamiento inteligente de apilado**:
  1. Solicita el nombre. Comprueba con `findItemInInventory()` si el ítem ya existe en alguna ranura para heredar automáticamente su descripción y su `maxStack`.
  2. Si es un ítem nuevo, solicita descripción y stack máximo validando que sea entero positivo.
  3. Solicita la cantidad a ingresar.
  4. **Fase 1 (Completar stacks)**: Localiza huecos que ya contengan el mismo ítem y que tengan espacio disponible (`maxStack - quantity > 0`), rellenándolos hasta su tope.
  5. **Fase 2 (Nuevos huecos)**: Si aún sobra cantidad por ubicar, busca casillas vacías (`undefined`) y crea nuevas instancias de `Item` respetando el límite por stack.
  6. **Fase 3 (Control de excedente)**: Si el inventario se llena antes de acomodar todo, avisa al usuario indicando con exactitud cuántas unidades pudieron guardarse y cuántas quedaron fuera.

### 5. Mover un objeto
* **Función**: `moveItem()`
* **Comportamiento y combinatoria**:
  * Solicita coordenadas de origen y destino mediante `prompt()` (acepta sintaxis `F.C` o `F,C`).
  * Valida que el origen contenga un ítem y que las coordenadas de destino sean distintas a las de origen.
  * **Destino vacío**: Traslada la referencia del objeto directamente y limpia el casillero de origen (`undefined`).
  * **Destino con el mismo ítem**:
    * Calcula el espacio disponible en el destino: $\text{hueco} = \text{maxStack} - \text{destino.quantity}$.
    * Si la cantidad origen cabe completa, se suma al destino y el origen queda vacío.
    * Si la cantidad origen supera el hueco disponible, llena el destino hasta `maxStack` y deja el sobrante en el origen.
  * **Destino ocupado por otro ítem**: Bloquea la acción y emite un mensaje de error por pantalla.

### 6. Eliminar un objeto
* **Función**: `deleteItem()`
* **Comportamiento**: Solicita la coordenada del slot que se desea limpiar. Si la casilla está ocupada, solicita confirmación explícita mediante la función nativa `confirm()`. En caso afirmativo, desasigna la casilla (`undefined`) y refresca la visualización.

### 7. Mostrar huecos libres
* **Función**: `countFreeSpaces()`
* **Comportamiento**: Computa la cantidad total de huecos vacíos en toda la matriz ($36$ ranuras) y desglosa cuántos de esos huecos libres corresponden a la barra rápida ($9$ ranuras). Emite el resultado por consola y mediante alerta visual.

### 8. Mostrar el objeto más abundante
* **Función**: `getMostQuantityStack()`
* **Comportamiento**: Itera sobre todas las ranuras y construye un mapa de totales acumulados `{ [nombre]: { name, totalQuantity } }`. Suma las cantidades dispersas de cada objeto y determina cuál posee el mayor volumen consolidado en todo el inventario.

---

## ⚙️ Funciones Modulares y Auxiliares

Para garantizar un código limpio, desacoplado y reutilizable (requisito de la sección 7 del PDF), la aplicación implementa funciones de soporte:

```javascript
// Recorre toda la matriz ejecutando una función callback por cada ranura.
// Si el callback retorna false, interrumpe el ciclo de forma temprana.
function forEachSlot(callback) { ... }

// Busca en el inventario y retorna la primera referencia que coincida con el nombre dado.
function findItemInInventory(itemToSearch) { ... }

// Obtiene de forma segura el ítem en una coordenada comprobando límites matriciales.
function findItemWithCordinates(row, col) { ... }

// Parsea y valida cadenas de coordenadas en formato "F.C" o "F,C" usando RegExp.
function getCordinates(input) { ... }
```

---

## 🛡️ Validaciones y Tratamiento de Errores

El proyecto implementa controles defensivos para prevenir estados inconsistentes:

* **Validación de Coordenadas**: Expresión regular `^([0-3])[.,]([0-8])$` que garantiza que las filas estén acotadas en $[0, 3]$ y las columnas en $[0, 8]$, aceptando tanto punto como coma como separador decimal.
* **Integridad de Cantidades**: Verificación de números mediante `Number.isInteger()` impidiendo cadenas vacías, valores negativos o flotantes no válidos.
* **Respeto a `maxStack`**: Control matemático en el setter de `Item` y en las operaciones de adición/fusión para que ninguna casilla supere su capacidad asignada.
* **Movimientos Inválidos**: Prevención de traslados desde slots vacíos, sobreescritura de ítems diferentes o movimientos hacia la misma casilla.
* **Resiliencia en el Menú**: Opciones no reconocidas o cancelaciones de prompt son capturadas sin interrumpir la ejecución ni provocar errores fatales en consola.

---

## 📁 Estructura del Proyecto y Entrega

Conforme a las pautas de entrega especificadas:

```text
Entrega1_NombreYApellido/
├── index.html          # Punto de entrada para abrir en el navegador
├── js/
│   └── inventario.js   # Script con la clase Item, funciones y lógica del menú
└── README.md           # Documentación técnica completa del proyecto
```

---

## 📊 Criterios de Evaluación (Rúbrica)

| Criterio evaluado | Puntuación | Estado |
| :--- | :---: | :---: |
| **Clase `Item`, constructor, objetos, getter y setter** | 1,5 pts | Totalmente implementado |
| **Uso correcto de arrays y matriz de objetos** | 1,5 pts | Totalmente implementado |
| **Estructuras de control y recorridos** | 1,0 pts | Totalmente implementado |
| **Funciones y organización del código** | 1,5 pts | Totalmente implementado |
| **Funcionalidades del menú (opciones 1 a 8)** | 2,0 pts | Totalmente implementado |
| **Validación y tratamiento de errores** | 1,0 pts | Totalmente implementado |
| **Uso de ES6 / Arrow Functions** | 0,5 pts | Totalmente implementado |
| **Claridad, nombres, indentación y comentarios** | 1,0 pts | Totalmente implementado |
| **TOTAL** | **10,0 pts** | **100% Cubierto** |

---

## 🚀 Instrucciones de Uso y Ejecución

1. **Descargar / Clonar** los archivos del proyecto dentro de una misma carpeta.
2. Comprobar que `index.html` enlaza correctamente el script dentro de la etiqueta `<head>` o antes del cierre de `<body>`:
   ```html
   <script src="js/inventario.js"></script>
   ```
3. Abrir `index.html` en cualquier navegador web moderno (Google Chrome, Firefox, Edge, Safari).
4. Abrir la **Consola del Desarrollador** pulsando `F12` o `Ctrl + Shift + I` (en macOS: `Cmd + Option + I`) para visualizar la salida detallada de las acciones.
5. Interactuar con las ventanas emergentes del menú numérico.