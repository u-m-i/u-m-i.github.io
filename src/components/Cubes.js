import { Cube } from "./Cube";
import React, {Component} from "react";
import { useStore } from "../hooks/useStore";

export const Cubes = () =>
{
    const [cubes] = useStore((state) =>[
        state.cubes
    ]);

    return cubes.map(({key ,pos, texture}) => {
        return(
            <Cube key={key} position={pos} texture={texture}/>
        )
    });
}
