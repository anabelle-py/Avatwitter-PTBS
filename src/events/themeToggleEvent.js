import { classNames } from "../constants/classNames.js";
import { stateItems } from '../constants/stateItems.js';
import { elementIds } from '../constants/elementIds.js';

const lightModeIcon = `<img src="assets/Tui.png" class="${classNames.largeIcon}"/>`
const darkModeIcon = `<img src="assets/La.png" class="${classNames.largeIcon}"/>`

const lightMode = 'light';
const darkMode = 'dark';

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle(classNames.darkTheme);

    updateThemeIcon(isDark);

    localStorage.setItem(stateItems.theme, isDark ? darkMode : lightMode);
}

function updateThemeIcon(isDark) {
    const themeButton = document.getElementById(elementIds.themeToggle);
    themeButton.innerHTML = isDark ? lightModeIcon : darkModeIcon;
}

function loadTheme() {
    const saved = localStorage.getItem(stateItems.theme);
    const isDark = saved === darkMode;

    if (isDark) {
        document.body.classList.add(classNames.darkTheme);
    }
    updateThemeIcon(isDark);
}


export function initializeThemeToggle() {
    const btn = document.getElementById(elementIds.themeToggle);
    btn.addEventListener('click', toggleTheme);

    loadTheme()
}