import { events, mixter, on, onSlotChange, props, shadow, state } from 'mixter'

const style = /*css*/ `
:host {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  width: 100%;
  height: 100%;
}

[part='scroller'] {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}

[name='leader'] {
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
}

[name='leader']::slotted(:first-child) {
  box-sizing: border-box;
  display: inline-flex;
  width: 100%;
  height: 100%;
  margin: 0;
  resize: none;
  overflow: scroll;
}

[name='follower'] {
  display: contents;
}`

/**
 * Super imposes one child (`follower`) contents over another
 * at the same scroll position determined by the `leader`.
 *
 * ```js
 * import { SuperImposeElement } from 'super-impose'
 * customElements.define('super-impose', SuperImposeElement)
 * ```
 *
 * --
 *
 * ```html
 * <super-impose>
 *   <div slot="leader"></div>
 *   <div slot="follower"></div>
 * </super-impose>
 * ```
 */
export class SuperImposeElement extends mixter(
  HTMLElement,
  shadow(
    /*html*/ `<style>${style}</style><slot name="leader"></slot><div part="scroller"><slot name="follower"></slot></div>`
  ),
  events<{ scroll: Event }>(),
  props(
    class {
      scrollLeft = 0
      scrollTop = 0
      scroller?: HTMLDivElement
      leader?: Element
      onScroll?: (e: Event) => void
    }
  ),
  state<SuperImposeElement>(({ $, effect, reduce }) => {
    $.scroller = reduce<HTMLDivElement>(({ root }) => root.querySelector('[part=scroller]')!)

    effect(({ root }) =>
      onSlotChange(root as ShadowRoot, ({ firstChild }) => {
        $.leader = firstChild
      })
    )

    $.onScroll = reduce(({ host }) => ((e: Event) => {
      const el = e.currentTarget as Element
      if (el) {
        Object.assign($, {
          scrollLeft: el.scrollLeft,
          scrollTop: el.scrollTop,
        })
        host.dispatchEvent(new Event('scroll', { bubbles: true }))
      }
    }))

    effect(({ leader, onScroll }) => on()(leader, 'scroll', onScroll))

    effect(({ scroller, scrollLeft, scrollTop }) => {
      Object.assign(scroller.style, {
        left: -scrollLeft + 'px',
        top: -scrollTop + 'px',
      })
    })
  })
) {}
