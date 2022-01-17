import { SuperImposeElement } from '../src'

customElements.define('super-impose', SuperImposeElement)

class WrapElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          position: relative;
        }
        [part="box"] {
        }
      </style>

      <super-impose part="box">
        <div slot="leader" part="leader">
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
          some content wide enough to scroll<br />
        </div>
        <div slot="follower">
          other content<br />
          other content<br />
          other content<br />
          other content<br />
          other content<br />
          other content<br />
        </div>
      </super-impose>
    `
  }
}

customElements.define('wrap-element', WrapElement)
