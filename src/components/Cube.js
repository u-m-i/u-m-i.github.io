
export const Cube = ({position, texture}) =>
{
    const [ref] = useBox(() => (
        {
            type:"Static",
            position
        }
    ));

    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial color="violet" attach="material"/>
        </mesh>
    )
}