// src/scripts/web-components-loader.js

/**
 * Interfaz para definir un componente web personalizado
 */
interface WebComponentDefinition {
  /** Nombre de la etiqueta personalizada */
  tag: string;
  /** Ruta de importación del componente */
  path: string;
}

/**
 * Lista de componentes personalizados a cargar
 */
const components: WebComponentDefinition[] = [
  {
    tag: 'blog-carousel',
    path: '@components/blog-carousel/blog-carousel.js',
  },
  // Aquí puedes agregar más componentes...
];

/**
 * Carga condicional de los componentes web
 * Solo carga aquellos que no estén ya registrados
 */
components.forEach(({ tag, path }: WebComponentDefinition): void => {
  if (!customElements.get(tag)) {
    import(/* @vite-ignore */ path)
      .then((): void => console.log(`[loader] <${tag}> cargado desde ${path}`))
      .catch((err: Error): void => console.error(`[loader] Error cargando ${tag}:`, err));
  }
});
