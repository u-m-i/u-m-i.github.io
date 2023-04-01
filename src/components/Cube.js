import React, {Component} from "react";
import { useStore } from "../hooks/useStore";
import * as textures from "../images/texture";
import { useBox } from "@react-three/cannon";

export const Cube = ({position, texture}) =>
{

    const [ref] = useBox(() => (
        {
            type:"Static",
            position
        }
    ));

    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

    const activeTexture = textures[texture + "Texture"];

    console.log('active texture', activeTexture);

    return (
        <mesh 
        
        onClick= {(e) =>
        {
            e.stopPropagation();
            const pos = ref.current.position;

            
            console.log(pos);
            console.log(e.face);
            console.log(pos.x + e.face.a);

            addCube(pos.x + e.face.a, pos.y + e.face.b, pos.z + e.face.c);

        }}

        ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial map={activeTexture}  attach="material"/>
        </mesh>
    )
}