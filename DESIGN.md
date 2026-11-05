---
name: Hidráulica Francisco
description: Neón prehispánico. Un solo tubo de vidrio que es circuito hidráulico y glifo a la vez.
colors:
  turquesa: "#4ff2df"
  turquesa-suave: "#a9f7ec"
  presion: "#ff6a3d"
  presion-suave: "#ffb199"
  ambar: "#ffc45c"
  obsidiana: "#071418"
  obsidiana-2: "#0c1e23"
  tezontle: "#1f0c0a"
  tezontle-2: "#2d1410"
  jade: "#06201b"
  jade-2: "#0b2d26"
  texto: "#e4efed"
  texto-2: "#b2c7c4"
  tinta-boton: "#04211f"
typography:
  display:
    fontFamily: "Tilt Neon, Archivo, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 6.1rem)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Tilt Neon, Archivo, sans-serif"
    fontSize: "clamp(2.15rem, 4.7vw, 4.4rem)"
    fontWeight: 400
    lineHeight: 1.06
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  foto: "3px"
  campo: "8px"
  tubo: "999px"
spacing:
  galeria: "8px"
  margen: "clamp(26px, 5vw, 84px)"
  seccion: "clamp(76px, 10vw, 150px)"
components:
  button-primary:
    backgroundColor: "{colors.turquesa}"
    textColor: "{colors.tinta-boton}"
    rounded: "{rounded.tubo}"
    padding: "12px 28px"
    height: "54px"
  field:
    backgroundColor: "{colors.obsidiana-2}"
    textColor: "{colors.texto}"
    rounded: "{rounded.campo}"
    padding: "13px 15px"
    height: "54px"
---

# Design System: Hidráulica Francisco

## Overview

**Creative North Star: "El Circuito Encendido"**

Un circuito hidráulico y un rótulo de neón son el mismo dibujo: una línea continua que no debe tener fugas. El sitio es un muro de taller de noche donde un solo tubo de vidrio se dobla en símbolos ISO y glifos mexicas, y termina en el electrodo del botón de WhatsApp.

El neón dibuja la idea y las fotos reales la prueban. La temática prehispánica vive en la geometría y en el significado del agua, nunca como disfraz de piedra y oro.

**Key Characteristics:**
- Un solo tubo continuo en el margen de cada página, que se enciende al bajar.
- Símbolos hidráulicos correctos: un técnico debe poder leerlos.
- Glifos dibujados como tubo, con halo, gas y núcleo.
- Fotos reales del taller, sin filtros ni textos encima, salvo en la portada y los tres caminos.

## Colors

Muros oscuros teñidos por página y gases encendidos que hacen trabajo real.

### Primary
- **Gas Turquesa:** baja presión, retorno, estado encendido y acción principal. Es el agua del logo.

### Secondary
- **Electrodo Rojo:** alta presión y extremos de tubo, y gas alterno en títulos de páginas de tezontle.

### Tertiary
- **Ámbar de Sodio:** uso escaso, para el camino de fabricación y el anillo de foco.

### Neutral
- **Obsidiana, Tezontle y Jade:** muros de sección, cada uno con su variante un paso más clara.
- **Hueso Frío y Hueso Apagado:** texto principal y secundario.

### Named Rules
**The Presión Es Roja Rule.** En un circuito, rojo significa presión y turquesa significa retorno. No se intercambian por gusto.

**The Muro Oscuro Rule.** El oscuro no es una moda aquí: el neón solo existe de noche. Todo texto de lectura se mantiene en Archivo y sin brillo.

## Typography

**Display Font:** Tilt Neon (con Archivo de respaldo)
**Body Font:** Archivo (variable, ancho de 62 % a 125 %)

**Character:** Tilt Neon es un tubo real convertido en letra; Archivo es la placa de datos que se lee sin esfuerzo en un taller.

### Hierarchy
- **Display:** títulos de página, encendidos, máximo uno por página.
- **Headline:** títulos de sección, encendidos.
- **Title:** nombres de servicios y piezas en Archivo, sin brillo.
- **Body:** párrafos con medida máxima de 66 caracteres.

### Named Rules
**The Solo Lo Encendido Brilla Rule.** El brillo es para Tilt Neon y para los tubos. Un párrafo con brillo no se lee.

## Layout

Contenedor de 1320 px con margen fluido, secciones a sangre con muro propio y ritmo vertical amplio. La galería usa 12 columnas con piezas de 6 y 3 columnas, sin huecos. El tubo ocupa el margen izquierdo y nunca cruza el texto. Bajo 820 px todo pasa a una columna, aparece la barra fija con Llamar y WhatsApp, y el circuito se acerca a válvula y cilindro.

## Elevation & Depth

Sin sombras de tarjeta. La profundidad viene de la luz: el halo del gas y el cambio de muro entre secciones. Las fotos son planas.

### Named Rules
**The Luz, No Sombra Rule.** Si algo necesita destacar, se enciende; no se le pone sombra.

## Shapes

Tubo redondo para acciones, ángulos de 90 grados con radio de 6 px en la línea continua, escalones de pirámide para la greca y esquinas casi rectas en fotos.

## Components

### Buttons
- **Shape:** tubo completo con dos electrodos en los extremos.
- **Primary:** gas turquesa con texto oscuro y aura suave.
- **Hover / Focus:** más luz con puntero real; anillo ámbar con teclado; 97 % de escala al presionar.
- **Secondary:** vidrio apagado con electrodos grises.

### Inputs / Fields
- **Style:** vidrio con borde claro y letra de 16 px para evitar el zoom en iPhone.
- **Focus:** el borde se enciende en turquesa.
- **Error:** borde rojo con mensaje debajo que dice qué falta.

### Navigation
Barra opaca y fija. La página actual queda con el tubo encendido. En móvil, menú desplegable y barra inferior de contacto.

### Circuito hidráulico
Tanque con glifo del agua, bomba ISO, válvula 4/2 con solenoide y resorte, y cilindro. El botón o un toque en la válvula cambia presión y retorno y mueve el vástago. El retorno siempre fluye hacia el tanque.

### Visor
Pantalla completa para fotos y video, con flechas, teclado, deslizamiento y WhatsApp prellenado con el nombre de la foto.

## Do's and Don'ts

### Do:
- **Do** dibujar cada glifo nuevo con las tres capas del tubo: halo, gas y núcleo.
- **Do** mantener cada página a un toque de WhatsApp.
- **Do** terminar la línea continua de cada página en el electrodo de una acción real.
- **Do** verificar los símbolos hidráulicos y los datos históricos antes de publicarlos.

### Don't:
- **Don't** inventar años de experiencia, clientes, certificaciones ni garantías.
- **Don't** dibujar remates que parezcan cruces u otros símbolos ajenos sobre glifos y pirámides.
- **Don't** volver al basalto con dorado y letra Cinzel del sitio anterior.
- **Don't** poner animaciones de entrada en el contenido: debe estar visible desde el inicio.
