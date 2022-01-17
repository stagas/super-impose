const html = /*html*/ `<style>
  :host {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    resize: both;
    width: 100%;
    height: 100%;
  }

  #leader {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #leader::slotted(:first-child) {
    display: inline-flex;
    width: 100%;
    height: 100%;
    overflow: scroll;
    resize: none !important;
    margin: 0;
    box-sizing: border-box;
  }

  [name="follower"] {
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  [name="follower"] {
    display: contents;
  }

  [part="scroll"] {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
  }
</style><slot id="leader"></slot><div part="scroll"><slot name="follower"></slot></div>`

/**
 * Super imposes one child over another.
 *
 * ```js
 * import { SuperImposeElement } from 'super-impose'
 * customElements.define('super-impose', SuperImposeElement)
 * ```
 *
 * ```html
 * <super-impose>
 *   <div></div> <!-- leader -->
 *   <div slot="follower"></div>
 * </super-impose>
 * ```
 */
export class SuperImposeElement extends HTMLElement {
  leaderSlot: HTMLSlotElement
  followerSlot: HTMLSlotElement
  scrollEl: HTMLDivElement

  #leaderNode?: HTMLElement

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.innerHTML = html
    this.leaderSlot = this.shadowRoot!.querySelector('#leader')!
    this.followerSlot = this.shadowRoot!.querySelector('[name="follower"]')!
    this.scrollEl = this.shadowRoot!.querySelector('[part="scroll"]')!

    this.shadowRoot!.addEventListener('slotchange', () => {
      const nodes = this.leaderSlot.assignedNodes().filter(x => x.nodeType !== document.TEXT_NODE)
      const leaderNode = nodes[0] as HTMLElement
      if (leaderNode) {
        this.#leaderNode = leaderNode
        this.#leaderNode.addEventListener('scroll', () => {
          Object.assign(this.scrollEl.style, {
            left: -this.#leaderNode!.scrollLeft + 'px',
            top: -this.#leaderNode!.scrollTop + 'px',
          })
          this.dispatchEvent(new CustomEvent('scroll', { bubbles: true }))
        })
      }
    })
  }

  get scrollLeft() {
    return this.#leaderNode!.scrollLeft
  }

  get scrollTop() {
    return this.#leaderNode!.scrollTop
  }
}

export default SuperImposeElement
