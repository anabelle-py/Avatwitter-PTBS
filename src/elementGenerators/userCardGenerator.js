import { elementIds } from '../constants/elementIds.js';
import { classNames } from '../constants/classNames.js';
import { nationsImgUrls } from '../constants/nations.js';
import { getProfilePic } from '../utils/profilePictureUtils.js';

export function createUserCard(user) {
    const usersContainer = document.getElementById(elementIds.usersContainer);

    const card = document.createElement("div");
    card.className = `${classNames.userCard} ${classNames.paper}`;

    const name = document.createElement("div");
    name.textContent = user.username;
    name.className = classNames.userName;

    const age = document.createElement("div");
    age.textContent = `גיל ${user.age}`;
    age.className = classNames.age;

    const nation = document.createElement("img");
    nation.src = nationsImgUrls[user.nation];
    nation.className = classNames.smallIcon;

    const profilePic = createProfilePicture(user.animal);

    card.appendChild(profilePic);
    card.appendChild(name);
    card.appendChild(age);
    card.appendChild(nation);

    usersContainer.prepend(card);
}

export function createProfilePicture(animalDisplayName) {
    const profilePic = document.createElement("img");
    profilePic.src = getProfilePic(animalDisplayName);
    profilePic.className = classNames.profilePic;
    return profilePic;
}