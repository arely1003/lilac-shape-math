# Lilac Shape Math

Actúa como un desarrollador web experto en frontend, diseño UI/UX y accesibilidad. Quiero que construyas una página web completa, funcional y visualmente atractiva llamada FormaFácil: Calculadora de Áreas y Perímetros.

1. Objetivo del proyecto

Crear una calculadora web educativa que permita calcular el área y el perímetro de distintas figuras geométricas de manera sencilla. Debe ser intuitiva para estudiantes, visualmente atractiva y fácil de utilizar tanto en computadoras como en celulares.

2. Tecnologías

Utiliza React, TypeScript y Tailwind CSS, si están disponibles en el entorno.

Implementa los cálculos directamente en el frontend con JavaScript o TypeScript.

No utilices base de datos, registro de usuarios, autenticación ni servicios externos.

No simules una conexión con un backend o una API.

Mantén el código organizado en componentes reutilizables.

3. Identidad visual

Quiero un estilo lila, pastel, elegante, moderno y delicado, inspirado en interfaces de diseño profesional.

Paleta de colores:

Fondo principal: #F8F5FF.

Lila claro: #EDE4FF.

Morado principal: #8052C7.

Morado oscuro para títulos: #382451.

Blanco para tarjetas: #FFFFFF.

Gris lavanda para textos secundarios: #776B87.

Utiliza:

Tipografía moderna y legible, como Inter o Poppins.

Tarjetas con esquinas redondeadas.

Sombras suaves y bordes discretos.

Botones morados con efectos hover.

Iconos geométricos sencillos.

Ilustraciones de figuras geométricas.

Espacios equilibrados y márgenes consistentes.

Animaciones sutiles, sin movimientos excesivos.

Un diseño limpio, profesional y sin saturación visual.

Evita colores demasiado fuertes, exceso de elementos decorativos y textos pequeños.

4. Estructura de la página

A. Encabezado

Incluye el nombre FormaFácil y un pequeño icono geométrico. Agrega un menú con las opciones Inicio, Calculadora y Ayuda. Incluye un botón para activar o desactivar el modo oscuro.

B. Sección principal

Muestra el título:
“Las matemáticas, más sencillas.”

Agrega el texto:
“Calcula áreas y perímetros de tus figuras geométricas favoritas de forma rápida, visual y sencilla.”

Incluye un botón principal que diga “Comenzar a calcular”, que lleve a la calculadora.

C. Selector de figuras

Crea tarjetas visuales para las siguientes figuras:

Cuadrado.

Rectángulo.

Triángulo.

Círculo.

Cada tarjeta debe tener una ilustración clara, el nombre de la figura y una breve descripción. Al seleccionarla, debe actualizar la calculadora con los campos correspondientes.

D. Calculadora funcional

Incluye un formulario con:

Selector de figura geométrica.

Campos numéricos para las medidas necesarias.

Etiquetas claras que expliquen cada medida.

Botón “Calcular”.

Botón “Limpiar”.

Área de resultados que muestre el área y el perímetro.

Utiliza estas fórmulas:

Cuadrado:

Área = lado × lado.

Perímetro = 4 × lado.

Rectángulo:

Área = base × altura.

Perímetro = 2 × (base + altura).

Triángulo:

Área = (base × altura) / 2.

Perímetro = lado A + lado B + lado C.

Círculo:

Área = π × radio².

Perímetro = 2 × π × radio.

Para el triángulo, solicita base, altura y las longitudes de sus tres lados. Valida que las medidas sean positivas y que los lados cumplan la desigualdad triangular. No permitas calcular con medidas inválidas.

Muestra los resultados con sus unidades cuadradas para el área y unidades lineales para el perímetro. Permite elegir una unidad de longitud entre cm, m y km; ambas unidades de resultado deben actualizarse correctamente.

E. Explicación de fórmulas

Agrega una sección con las fórmulas de las cuatro figuras, acompañadas de ilustraciones y explicaciones breves. Usa expresiones matemáticas legibles.

F. Ejemplo práctico

Incluye una tarjeta de ejemplo con un cuadrado de lado 5 cm:

Área: 25 cm².

Perímetro: 20 cm.

Incluye un botón “Probar ejemplo” que rellene los campos con esos datos.

G. Sección de ayuda

Agrega instrucciones breves:

Selecciona una figura.

Ingresa las medidas.

Selecciona la unidad.

Presiona Calcular.

Consulta los resultados.

H. Pie de página

Incluye el nombre FormaFácil, el texto “Herramienta educativa de geometría” y un enlace interno para volver al inicio.

5. Funcionalidades y validaciones

Todos los cálculos deben funcionar realmente.

Cambiar la figura debe actualizar los campos.

No aceptar campos vacíos, valores cero ni números negativos.

Mostrar mensajes de error comprensibles.

Evitar que se muestren resultados incorrectos cuando los datos sean inválidos.

El botón Limpiar debe borrar los campos, los resultados y los mensajes de error.

El botón Probar ejemplo debe cargar el ejemplo del cuadrado.

Redondear los resultados a un máximo de cuatro decimales sin alterar innecesariamente los valores exactos.

Mostrar las unidades correctas.

El modo oscuro debe funcionar en toda la interfaz y recordar la preferencia durante la sesión.

Los botones y enlaces deben realizar la acción que indican.

6. Diseño responsive y accesibilidad

Diseña primero para computadoras y adapta la interfaz a celulares y tabletas.

En celulares, organiza las tarjetas en una sola columna cuando sea necesario.

Evita desplazamiento horizontal.

Utiliza etiquetas visibles en todos los campos.

Asegura buen contraste entre texto y fondo.

Permite navegar con teclado.

Incluye estados de foco visibles.

Añade nombres accesibles a los botones con iconos.

Utiliza encabezados en orden lógico.

Respeta las preferencias del usuario para reducir animaciones.

7. Detalles finales

Crea una interfaz coherente y terminada, no un wireframe.

No dejes botones sin funcionalidad.

No incluyas textos de relleno ni enlaces que no funcionen.

Añade transiciones suaves y estados hover discretos.

Cuida los márgenes, la alineación, las proporciones y la jerarquía visual.

Define un título de página y una descripción apropiada.

Comprueba los cálculos y las validaciones.

Comprueba el diseño en tamaños de pantalla grandes y pequeños.

Genera directamente la aplicación funcional y visualmente terminada. Prioriza la calidad visual, la facilidad de uso, la accesibilidad y la correcta ejecución de los cálculos.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lilac-shape-math.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b82bc113-8aaa-5870-9446-a2d3724d606a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
