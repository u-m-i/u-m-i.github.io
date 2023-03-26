import { Cube } from "./Cube";
import { useStore } from "../hooks/useStore";

export const Cubes = () =>
{
    const [cubes] = useStore((state) =>[
        state.cubes
    ]);

    return cubes.map(({key ,x,y,z, texture}) => {
        return(
            <Cube key={key} position={position}/>
        )
    });
}
