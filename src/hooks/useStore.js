import create from "zustand";
import { nanoid } from "nanoid";

export const useStore = create((set) => ({

    texture: 'dirt',
    cubes: [{
        key: nanoid,
        pos:[3,2,1],
        texture: "dirt",
    }],
    addCube: (x,y,z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos:[x,y,z],
                    texture: prev.texture
                }
            ]
        }))
    },

    removeCube: () =>{},
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld:() => {}
}))