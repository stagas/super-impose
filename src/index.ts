import $ from 'sigl'

const style = /*css*/ `
:host {
  contain: size style layout paint;
  position: relative;
  overflow: hidden;
  /* display: inline-flex; */
  width: 100%;
  height: 100%;
}

[part=scroller] {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}

[name=leader] {
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
}

[name=leader]::slotted(:first-child) {
  box-sizing: border-box;
  display: inline-flex;
  width: 100%;
  height: 100%;
  margin: 0;
  resize: none;
  overflow: hidden;
  touch-action: none;
}

[name=leader]:hover::slotted(:first-child) {
  overflow: scroll;
}

[name=follower] {
  display: contents;
}`

export interface SuperImposeElement extends $.Element<SuperImposeElement> {}

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
@$.element()
export class SuperImposeElement extends HTMLElement {
  root = $(this).shadow(
    /*html*/ `<style>${style}</style><slot name="leader"></slot><div part="scroller"><slot name="follower"></slot></div>`
  )

  scrollLeft = 0
  scrollTop = 0
  scroller?: HTMLDivElement
  leader?: HTMLElement

  onScroll = $(this).reduce(({ $, host, leader }) =>
    () => {
      $.mutate(() => {
        Object.assign($, {
          scrollLeft: leader.scrollLeft,
          scrollTop: leader.scrollTop,
        })
      })
      $.dispatch.composed(host, 'scroll')
    }
  )

  rescroll = $(this).callback(({ leader, scrollLeft, scrollTop }) =>
    () => {
      Object.assign(leader!, {
        scrollLeft,
        scrollTop,
      })
    }
  )

  mounted($: SuperImposeElement['$']) {
    $.scroller = $.query<HTMLDivElement>(/*css*/ `[part=scroller]`)

    $.effect(({ root }) =>
      $.onSlotChange(root, ({ firstChild }) => {
        $.leader = firstChild as HTMLElement
      })
    )

    $.effect(({ leader, onScroll, rescroll }) =>
      $.chain(
        $.on(leader).scroll.passive.raf(onScroll),
        $.observe.resize(leader, rescroll)
      )
    )

    $.effect(({ scroller, scrollLeft, scrollTop }) => {
      Object.assign(scroller.style, {
        left: -scrollLeft + 'px',
        top: -scrollTop + 'px',
      })
    })
  }
}
