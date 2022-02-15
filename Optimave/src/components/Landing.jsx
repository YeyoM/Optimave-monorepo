import Header from './Header.jsx'
import AboutOptimave from './AboutOptimave'
import Pricing from './Pricing'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const Landing = () => {
  return (
    <Parallax pages={3} style={{ top: '0', left: '0' }}>
      <ParallaxLayer
        offset={0}
        speed={1}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: '#fff'
        }}
      >
        <Header />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: 'rgb(25, 25, 25)', height: 'auto' }} />

      <ParallaxLayer
        className='About-parallax'
        offset={1}
        speed={1}
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: 'white',
          flexDirection: 'column'
        }}
      >
        <AboutOptimave />
      </ParallaxLayer>

      <ParallaxLayer className='parallax-footer' offset={2} speed={1} style={{ height: 'auto', backgroundColor: 'rgb(29 29 41)' }} />

      <ParallaxLayer
        className='parallax-footer'
        offset={2}
        speed={1}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: '#fff'
        }}
      >
        <Pricing />
      </ParallaxLayer>

    </Parallax>
  )
}

export default Landing
