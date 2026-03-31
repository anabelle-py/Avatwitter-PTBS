import { animalsList } from "../constants/animals.js";

const defaultPath = './assets/animals/Flying_bison_family.png';

export function getProfilePic(favAnimal) {
    const foundAnimal = animalsList.find(animal => animal.displayName === favAnimal)
    return foundAnimal ? foundAnimal.imgUrl : defaultPath;
}