import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from './components/Ground'
import { Player } from './components/Player'

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[80, 100, 20]} />
        <ambientLight intensity={0.3}/>
        <Physics>
          <Player/>
          <Ground/>
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
