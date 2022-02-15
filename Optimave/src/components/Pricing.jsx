import { useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { Link } from 'react-router-dom'

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 30,
  (x - rect.left - rect.width / 2) / 30,
  1.2
]
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const Pricing = () => {
  const ref = useRef(null)
  const [xys, set] = useState([0, 0, 1])
  const props = useSpring({ xys })

  return (
    <div className='ccard-main' ref={ref}>
      <animated.div
        className='ccard'
        style={{ transform: props.xys.to(trans) }}
        onMouseLeave={() => set([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref.current.getBoundingClientRect()
          set(calc(e.clientX, e.clientY, rect))
        }}
      >
        <h4>Buy Optimave</h4>
        <h1>$100.00 mxn</h1>
        <p>Unlimited Access</p>
        <p>Private channel on Discord</p>
        <p>Direct contact with out Team</p>
        <Link className='link' to='Buy'>Buy Now!</Link>
      </animated.div>
    </div>
  )
}

export default Pricing
