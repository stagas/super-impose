import { SuperImposeElement } from '../src'

customElements.define('super-impose', SuperImposeElement)

class WrapElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          position: relative;
          resize: both;
          white-space: pre;
          overflow: scroll;
        }
        [part="box"] {
        }
      </style>

      <super-impose part="box">
        <textarea slot="leader" part="leader" wrap="off">
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
        </textarea>
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

document.body.innerHTML = /*html*/ `
<style>
  * {
    background: transparent;
    color: #bbb;
  }
  wrap-element {
    width: 100px;
    height: 100px;
  }
</style>

<pre>
    one
    two
    three
    </pre>
    <div style="padding: 20px; border: 1px solid #000; width: 100px; height: 100px; overflow: hidden; resize: both">
      <super-impose onscroll="console.log(this.scrollTop, this.scrollLeft)">
        <textarea slot="leader" wrap="off">
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
some content wide enough to scroll
        </textarea>
        <pre slot="follower" style="white-space: pre">
other content
other content
other content
other content
other content
other content
other content
        </pre>
      </super-impose>
    </div>
    <wrap-element></wrap-element>
`

const el = document.body.querySelector('super-impose')!
setTimeout(() => {
  el.remove()
  setTimeout(() => {
    document.body.appendChild(el)
  }, 500)
}, 2500)
