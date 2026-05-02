import { classNames } from '../constants/classNames.js';
import { stateItems } from '../constants/stateItems.js';
import { elementIds } from '../constants/elementIds.js';
import { themes } from '../constants/themes.js';

const lightModeImageFilePath = 'assets/Tui.png';
const darkModeImageFilePath = 'assets/La.png';

const lightModeIcon = `<img src="${lightModeImageFilePath}" class="${classNames.largeIcon}"/>`;
const darkModeIcon = `<img src="${darkModeImageFilePath}" class="${classNames.largeIcon}"/>`;


function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle(classNames.darkTheme);

    updateThemeIcon(isDark);

    localStorage.setItem(stateItems.theme, isDark ? themes.dark : themes.light);
}

function updateThemeIcon(isDark) {
    const themeButton = document.getElementById(elementIds.themeToggle);
    themeButton.textContent = '';
    const icon = document.createElement('img');
    icon.src = isDark ? lightModeImageFilePath : darkModeImageFilePath;
    icon.className = classNames.largeIcon;
    themeButton.appendChild(icon);
}

function loadTheme() {
    const saved = localStorage.getItem(stateItems.theme);
    const isDark = saved === themes.dark;

    if (isDark) {
        document.body.classList.add(classNames.darkTheme);
    }
    updateThemeIcon(isDark);
}

export function initializeThemeToggle() {
    const btn = document.getElementById(elementIds.themeToggle);
    btn.addEventListener('click', toggleTheme);

    loadTheme();
}
