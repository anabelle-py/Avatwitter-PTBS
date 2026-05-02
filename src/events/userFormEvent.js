import { User } from '../models/user.js';
import { createUserCard } from '../elementGenerators/userCardGenerator.js';
import { elementIds } from '../constants/elementIds.js';
import { stateItems } from '../constants/stateItems.js';

export const registeredUsers =
    JSON.parse(localStorage.getItem(stateItems.users)) || [];

function saveUsers() {
    localStorage.setItem(stateItems.users, JSON.stringify(registeredUsers));
}

const userForm = document.getElementById(elementIds.userForm);

function updateAuthorList(user) {
    const authorSelect = document.getElementById(elementIds.tweetAuthor);

    const option = document.createElement('option');
    option.value = user.username;
    option.textContent = user.username;

    authorSelect.appendChild(option);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(userForm);

    const username = formData.get(elementIds.username);
    const age = formData.get(elementIds.age);
    const phone = formData.get(elementIds.phone);
    const animal = formData.get(elementIds.animal);
    const nation = formData.get(elementIds.nation);

    const newUser = new User(username, age, phone, animal, nation);

    registeredUsers.push(newUser);
    saveUsers();

    createUserCard(newUser);
    updateAuthorList(newUser);

    userForm.reset();
}

export function initializeUserForm() {
    userForm.addEventListener('submit', handleFormSubmit);
    registeredUsers.forEach((user) => {
        updateAuthorList(user);
        createUserCard(user);
    });
}
