import { initializeTweetForm } from "./src/events/tweetformEvent.js";
import { initializeThemeToggle } from './src/events/themeToggleEvent.js';
import { initializeAnimalsDatalist } from "./src/elementGenerators/animalsDatalistGenerator.js";
import {initializeUserForm} from './src/events/userFormEvent.js';
import { initializeTweetFiltersEvent } from "./src/events/tweetFiltersEvent.js";


function onDOMContentLoaded() {
    initializeTweetForm();
    initializeUserForm()
    initializeThemeToggle();
    initializeAnimalsDatalist();
    initializeTweetFiltersEvent();
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

