<h1>
super-impose <a href="https://npmjs.org/package/super-impose"><img src="https://img.shields.io/badge/npm-v2.0.1-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-77-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/super-impose@2.0.1/dist/super-impose.min.js"><img src="https://img.shields.io/badge/brotli-1.9K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Web Component that super imposes one child over another to the same scroll position

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i super-impose </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add super-impose </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add super-impose</code>
</td></tr></table>
</h4>

## Examples

<details id="example$complex" title="complex" open><summary><span><a href="#example$complex">#</a></span>  <code><strong>complex</strong></code></summary>  <ul>  <p><a href="https://stagas.github.io/super-impose/example/complex.html"><strong>Try it live</strong></a></p>  <details id="source$complex" title="complex source code" ><summary><span><a href="#source$complex">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/complex.ts">example/complex.ts</a>  <p>

```ts
import { SuperImposeElement } from 'super-impose'

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
```

</p>
</details></ul></details><details id="example$web" title="web" open><summary><span><a href="#example$web">#</a></span>  <code><strong>web</strong></code></summary>  <ul><p></p>  <a href="https://stagas.github.io/super-impose/example/web.html"><img width="137.14285714285714" src="example/web.webp"></img>  <p><strong>Try it live</strong></p></a>    <details id="source$web" title="web source code" ><summary><span><a href="#source$web">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/web.ts">example/web.ts</a>  <p>

```ts
import { SuperImposeElement } from 'super-impose'

customElements.define('super-impose', SuperImposeElement)

document.body.innerHTML = /*html*/ `
<super-impose
  id="demo"
  style="width: 120px; height: 120px; overflow: hidden; resize: both">
<pre slot="leader" style="color: #fa4; font-size: 25px;">
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
🎈🎈🎈🎈🎈🎈🎈🎈🎈
</pre>
<pre slot="follower" style="white-space: pre; color:#1ff; font-size: 15px;">
🌀🌀🌀🌀🌀🌀🌀
🌀🌀🌀🌀🌀🌀🌀
🌀🌀🌀🌀🌀🌀🌀
🌀🌀🌀🌀🌀🌀🌀
🌀🌀🌀🌀🌀🌀🌀
🌀🌀🌀🌀🌀🌀🌀
</pre>
</super-impose>
</div>
`

const leader = document.querySelector('[slot=leader]')!
const mag = 20
let i = 0
const render = () => {
  requestAnimationFrame(render)
  const x = (i * (1 / 1000)) * Math.PI * 2
  Object.assign(leader, {
    scrollLeft: mag + Math.sin(x) * mag,
    scrollTop: mag + Math.cos(x) * mag,
  })
  i += 1000 / 60
}
requestAnimationFrame(render)
```

</p>
</details></ul></details>

## API

<p>  <details id="SuperImposeElement$1" title="Class" open><summary><span><a href="#SuperImposeElement$1">#</a></span>  <code><strong>SuperImposeElement</strong></code>     &ndash; Super imposes one child (<code>follower</code>) contents over another
at the same scroll position determined by the <code>leader</code>.</summary>  <a href="src/index.ts#L61">src/index.ts#L61</a>  <ul>  <p>

```js
import { SuperImposeElement } from 'super-impose'
customElements.define('super-impose', SuperImposeElement)
```

--

```html
<super-impose>
  <div slot="leader"></div>
  <div slot="follower"></div>
</super-impose>
```

</p>
      <p>  <details id="constructor$7" title="Constructor" ><summary><span><a href="#constructor$7">#</a></span>  <code><strong>constructor</strong></code><em>()</em>    </summary>    <ul>    <p>  <details id="new SuperImposeElement$8" title="ConstructorSignature" ><summary><span><a href="#new SuperImposeElement$8">#</a></span>  <code><strong>new SuperImposeElement</strong></code><em>()</em>    </summary>    <ul><p><a href="#SuperImposeElement$1">SuperImposeElement</a></p>        </ul></details></p>    </ul></details><details id="leader$10" title="Property" ><summary><span><a href="#leader$10">#</a></span>  <code><strong>leader</strong></code>    </summary>  <a href="src/index.ts#L72">src/index.ts#L72</a>  <ul><p><span>Element</span></p>        </ul></details><details id="onScroll$11" title="Property" ><summary><span><a href="#onScroll$11">#</a></span>  <code><strong>onScroll</strong></code>    </summary>  <a href="src/index.ts#L73">src/index.ts#L73</a>  <ul><p><details id="__type$12" title="Function" ><summary><span><a href="#__type$12">#</a></span>  <em>(e)</em>    </summary>    <ul>    <p>    <details id="e$14" title="Parameter" ><summary><span><a href="#e$14">#</a></span>  <code><strong>e</strong></code>    </summary>    <ul><p><span>Event</span></p>        </ul></details>  <p><strong></strong><em>(e)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>        </ul></details><details id="scroller$9" title="Property" ><summary><span><a href="#scroller$9">#</a></span>  <code><strong>scroller</strong></code>    </summary>  <a href="src/index.ts#L71">src/index.ts#L71</a>  <ul><p><span>HTMLDivElement</span></p>        </ul></details></p></ul></details></p>

## Credits

- [mixter](https://npmjs.org/package/mixter) by [stagas](https://github.com/stagas) &ndash; A Web Components framework.

## Contributing

[Fork](https://github.com/stagas/super-impose/fork) or [edit](https://github.dev/stagas/super-impose) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
