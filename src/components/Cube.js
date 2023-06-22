import React from "react";
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

    return (
        <mesh 
        
        onClick= {(e) =>
        {
            e.stopPropagation();
            const pos = ref.current.position;

            pos.add(e.face.normal);

            addCube(pos.x, pos.y, pos.z);
        }}

        ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial map={activeTexture}  attach="material"/>
        </mesh>
    )
}