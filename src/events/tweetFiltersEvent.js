import { setTweetFilter, currentFilter } from "./tweetformEvent.js";


export function initializeTweetFiltersEvent() {
    document.querySelectorAll('input[name="type-filter"]').forEach((radio) => {
        radio.addEventListener("change", (event) => {
            setTweetFilter(event.target.value);
        });
        if (currentFilter === radio.value) {
            radio.checked = true;
        }
    });
}
