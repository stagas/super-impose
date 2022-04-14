import { SuperImposeElement } from '../src'

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
