import { setTweetFilter } from "./tweetformEvent.js";


export function initializeTweetFiltersEvent() {
    document.querySelectorAll('input[name="type-filter"]').forEach((radio) => {
        radio.addEventListener("change", (event) => {
            setTweetFilter(event.target.value);
        });
    });
}
