import { NearestFilter, RepeatWrapping, TextureLoader } from 'three'

import{
    dirtImg,
    grassImg,
    glassImg,
    woodImg,
    logImg
} from './images'

const dirtTexture  = new TextureLoader().load(dirtImg)
const logTexture = new TextureLoader().load(logImg)
const  grassTexture = new TextureLoader().load(grassImg)
const  woodTexture = new TextureLoader().load(woodImg)
const  glassTexture = new TextureLoader().load(glassImg)
const groundTexture = new TextureLoader().load(grassImg)

dirtTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;

groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;


export{
    dirtTexture,
    logTexture,
    grassTexture,
    woodTexture,
    glassTexture,
    groundTexture,
}