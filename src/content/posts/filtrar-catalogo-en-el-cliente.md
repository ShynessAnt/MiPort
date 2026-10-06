---
title: Qué aprendí al filtrar un catálogo en el cliente
date: 2026-07-05
category: Aprendizaje
tags:
  - javascript
  - ux
excerpt: Búsqueda, categoría en la URL y paginación sin servidor, con estados vacíos claros.
cover: /images/posts/catalogo.svg
---

Filtrar en el cliente funciona bien cuando el contenido es poco y está en el repositorio. La categoría viaja en la consulta de la URL para que el enlace se pueda compartir.

La búsqueda espera un instante (debounce) para no recalcular en cada tecla. Si no hay resultados, un mensaje simple vale más que una tabla vacía.

La paginación de seis entradas es suficiente para un blog corto. El objetivo no es escalar a miles de artículos, sino mostrar un flujo completo y predecible.
