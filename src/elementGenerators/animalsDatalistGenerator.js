import { elementIds } from "../constants/elementIds.js";
import { animalsList } from "../constants/animals.js";

export function initializeAnimalsDatalist() {
    const datalist = document.getElementById(elementIds.animalList);

    animalsList.forEach(animal => {
        const option = document.createElement("option");
        option.value = animal.displayName;
        datalist.appendChild(option);
    });
}
