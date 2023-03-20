import { Vector3 } from 'three'
import {useEffect, useRef } from 'react'
import { useFrame,useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'

export const Player = () =>
{
    const {camera} = useThree();

    const [ref,api] = useSphere(() => ({
        mass:1,
        type: 'Dynamic',
        position: [0,0,10]
    }));

    // Velocity
    const vel = useRef([0,0,0]);

    useEffect(() =>{

        api.velocity.subscribe((v) => vel.current = v);

    }, [api.velocity])


    // Position

    const pos = useRef([0,0,0]);

    useEffect(() => {

        api.position.subscribe((p) => pos.current = p);

    },[api.position]);

    // This hook will run in every frame
    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))
    });

    return (
        <mesh ref={ref}></mesh>
    );
}