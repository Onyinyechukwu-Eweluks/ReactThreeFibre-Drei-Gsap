import { Suspense, useState } from 'react'
import {Canvas} from '@react-three/fiber'
import Three from './components/three'
import './App.css'


function App() {
  

  return (
    <div className="App">
      <Canvas id='three-canvas-container' shadows>
        <Suspense fallback={null}>
          
          
          <Three />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
