class Example extends HTMLElement {
  
  // Constructor
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // mas variables
  }

  // Observador de atributos
  static get observedAttributes() {
    // atributos a observar
    return ['variableDeAtributo'];
  }

  // Callback de atributos
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  // Metodo para obtener el la estructura del template, de preferencia usar este metodo para generar el template, si hay que agregar mas metodos o funcionalidades, habrá una seccion para eso
  getTemplate() {
    // constantes de atributos aqui
    const variableDeAtributo = this.getAttribute('variable-de-atributo');
    // Estilos
    <style>
      ${this.getStyles()}
    </style>
    // template
    const miComponente = document.createElement('template');
    miComponente.innerHTML = `
      <div>${variableDeAtributo}</div>
      `;
    return miComponente;
  }

  // Estilos
  getStyles() {
    const styles = `
      /* Estilos */
    `;
    return styles;
  }

  // Area de scripts
  // Aqui se colocan estrictamente todos los metodos o funciones que se ocuparan en el componente, a menos que la funcion amerite colocarla en otro lugar.

  // metodo para renderizar el template
  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  // Callback de conexion
  connectedCallback() {
    this.render();

    // aqui se agregan los metodos o funciones del area espedificada
  }

  // Callback de desconexion
  disconnectedCallback() {
    // aqui se agregan los metodos o funciones del area espedificada que se van a desconectar
  }

}