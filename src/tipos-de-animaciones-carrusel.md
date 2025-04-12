
# 🎠 Tipos de Animaciones para Autoslide en Carrusel

Explora diferentes estilos de animación para carruseles web. Cada técnica tiene su propio toque visual, como sacada del universo de *Akira*.

---

## 1. 🌀 Loop Infinito con Fade
En lugar de mover físicamente el carrusel, solo cambias la opacidad de la card actual.

**Sensación:** suave, elegante, estilo galería.

---

## 2. 📸 Slide con escala (Zoom In/Out)
Al deslizar, una card se aleja (scale down) y la nueva entra con zoom (scale up).

**Sensación:** dinámica, tipo presentación animada.

---

## 3. 🎥 Slide tipo cinematográfico (con blur)
Cuando cambia la slide, la actual se difumina y la siguiente entra nítida.

**Sensación:** transición fílmica, sofisticada, muy vaporwave.

---

## 4. 🪀 Scroll Infinito real (clonando nodos)
Técnica avanzada donde clonas los primeros N elementos al final y haces un loop sin cortes perceptibles.

**Sensación:** cinta real como los sliders de Netflix o los carruseles de TikTok Shop.

---

## 5. 🛹 Slide con "Bounce" easing
En vez de `ease`, usamos `cubic-bezier` para que el movimiento haga un pequeño rebote al final.

```css
.carousel-track {
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* rebote */
}
```

**Sensación:** movimiento juguetón, estilo app de diseño interactiva.

---

## 6. ✨ Tipo cubo 3D (CSS transform)
Simula una caja tridimensional que rota mostrando cada cara como un slide nuevo.

**Sensación:** futurista y experimental, estilo feria de Neo-Tokyo.

---

## 7. 🛸 Transición tipo desmaterialización (opacity + blur + scale)
Como si las slides desaparecieran como partículas o teletransportación.

**Sensación:** elegante y tecnológica, ideal para experiencias inmersivas.

---

## 🚀 ¿Cómo usarlas?
Pide cualquiera de estas animaciones y se puede implementar paso a paso. También podemos construir un playground de botones para probarlas.

**¡Explora y encuentra el estilo que mejor le queda a tu carrusel!**
