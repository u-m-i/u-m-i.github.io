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

    const activeTexture = textures[texture + "Texture"];

    console.log('active texture', activeTexture);

    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial map={activeTexture}  attach="material"/>
        </mesh>
    )
}