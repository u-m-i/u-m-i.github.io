import {FPV} from './components/FPV';
import { Sky } from '@react-three/drei';
import React, { Component } from "react";
import {Cubes} from './components/Cubes';
import { Canvas } from '@react-three/fiber';
import { Player } from './components/Player';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground';

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[80, 100, 20]} />
        <ambientLight intensity={0.3}/>
        <FPV />
        <Physics>
          <Player/>
          <Cubes/>
          <Ground/>
        </Physics>
      </Canvas>
      <div className ="absolute centered cursor">+</div>
    </>
  );
}

export default App;
