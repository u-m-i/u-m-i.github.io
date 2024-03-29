import React, {Component} from "react";
import { useStore } from '../hooks/useStore';
import {usePlane} from '@react-three/cannon';
import { groundTexture } from '../images/texture';

export const Ground = () => {

    const [ref] = usePlane(() => ({
        rotation:[-Math.PI/2,0,0], position:[0,-0.5,0]
    }))

    const [addCube] = useStore((state) =>[state.addCube]);

    groundTexture.repeat.set(100,100);


    return (
        <mesh 
        onClick= {(e) =>
        {
            e.stopPropagation();
            const [x,y,z] = Object.values(e.point).map(val => Math.ceil(val));

            console.log(x,y,z);
            addCube(x,y,z);

        }}

        ref = {ref}>
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <meshStandardMaterial attach='material' map={groundTexture}/>
        </mesh>
    )
}