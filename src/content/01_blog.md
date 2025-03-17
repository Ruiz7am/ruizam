# Creando el "Foundational site"

## Como empecé el sitio

Hola!, soy Armando, te doy la bienvenida a mi sitio, es el primero que dejaré en línea despues de varios prototipos, estos prototipos eran prácticas que había estado realizando los últimos cuatro meses, después de que decidí comenzar a estudiar una _"carrera"_ de frontend developer en línea.

Por el momento sólo estoy utilizando los fundamentos de la web, HTML, CSS y JavaScript, sin ningun Framework robusto como React, Angular o Vue, estoy utilizando un preprocesador de CSS, Sass, y estoy utilizando Web Components.

En donde estoy estudiando, y no solo ahí, sino en muchos lugares de internet, he visto la tendencia hacia esta filosofía de _"regereso a los origenes"_ en la que se resalta el mínimo uso de framworks y librerias y la readopción de estilización mediante CSS puro, sin tener que cargarle toda esa responsabilidad al script, cosa que he leído mencionar como "componentes monolíticos".

En fin, terminando con esta introducción, te invito a seguir leyendo y que cheques mi [Github](https://github.com/Ruiz7am) y veas mi código, toda sugerencia u opinión es más que bienvenida.

### Resumen del proceso

Primero comencé diseñando un poco en Figma, ya que tenia un boceto/sketch comence a maquetar primero el html, en plano, toda la estructura, con contenido _"hardcoded"_. Una vez hecha la estructura, comence a darle estilos con CSS puro, ya hechos los estilos agregue la interacción que requería, por el momento solo pequeñas animaciones en enlaces y por supuesto el Toggle para el tema oscuro. Todo esto lo logré en un dia, claro que es un diseño muy sencillo, espero lograr diseños mas complejos.

Después comencé a destripar la estructura en componentes, los organicé en una sola carpeta, los estilos los comencé a manejar con Sass y tardé otro día en poder organizar los estilos y hacer que el dark theme toggle funcionará en los demas componentes. **Tengo que darle mas sobré este tema, para poder estandarizar la gestión de estilos y crear un sistema.**

### A lo que me enfrento hoy

Al sitio, proyecto darle mas vida con animaciones css, a los iconos del footer quiero darles un hover que muestre una pequeña descripción de lo que son, quiero y tengo que meter también la estructura responsiva, adaptarla a la _"componentización"_ de la arquitectura. 

Agregar un portafolio con mis proyectos _"escolares"_ remasterizados, y claro esta un portafolio con proyectos profesionales.

Crear en el index un carrusel de entradas de blogs, pensamientos, imagenes, o algo, aún no se muy bien que quiero colocar en esa parte, tengo que comenzar a desarrollar para que se me vayan ocurriendo cosas _"on the fly"_.

Que al navegar en el sitio se sienta como si se estuviera navegando en un mismo lugar, es decir que se vean transiciones muy épicas, el concepto de "Single Page"

Lo principal que sigue después es crear el template para la pagina principal donde se mostraran los blog posts, una pagina secundaria en donde 

Quiero una sección de mini juegos. Crear mini juegos solo por diversión, solo que tomará tiempo lograr esto, hay otras prioridades

## Documentando lo creado.

### La estructura, el esqueleto

El esqueleto es sencillo, del body se desprenden dos etiquetas, main y aside, de main se desprenden header y section, de aside navbar, mi componente de tema y el footer, esa es la estructura base. 


Ahora revisamos los demas hijos:

- **Header**: este contiene el componente _"the-logo"_, el cual a su vez contiene un avatar o imagen, un titulo y un subtitulo. 
- **Section**: en el section tengo el carrusel u otra cosa, hay potencial aquí.
- **navbar**: contiene la barra de navegación, quiero _"legolizarla"_ más, que se pueda colocar cualuqier enlace modificando o agregando lo mínimo.
- **footer**: el footer, muuuy sencillo, solo los iconos de los pilares de la web.

