import { createTweetElement } from '../elementGenerators/tweetGenerator.js';
import { elementIds } from '../constants/elementIds.js';
import { Filters } from '../constants/filters.js';
import { Tweet } from '../models/Tweet.js';
import { stateItems } from '../constants/stateItems.js';
import { startEditTweet } from './editTweet.js';

const allTweets = JSON.parse(localStorage.getItem(stateItems.tweets)) || [];
export let currentFilter = localStorage.getItem(stateItems.filter) || Filters.all;

function saveTweets() {
    localStorage.setItem(stateItems.tweets, JSON.stringify(allTweets));
}
function saveFilter() {
    localStorage.setItem(stateItems.filter, currentFilter);
}

export function setTweetFilter(filter) {
    currentFilter = filter;
    saveFilter();
    updateTweets();
}

export function updateTweets() {
    const container = document.getElementById(elementIds.tweetsContainer);
    container.innerHTML = '';

    allTweets.forEach((tweet) => {
        if (currentFilter === Filters.all || currentFilter === tweet.type) {
            const tweetEl = createTweetElement(
                tweet,
                (tweet, tweetContainer) => startEditTweet(tweet, tweetContainer),
                (tweetId) => deleteTweet(tweetId),
            );
            container.prepend(tweetEl);
        }
    });
    saveTweets();
}

function deleteTweet(tweetId) {
    const tweetIndex = allTweets.findIndex((t) => t.id === tweetId);
    if (tweetIndex !== -1) {
        allTweets.splice(tweetIndex, 1);
        saveTweets();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const tweetForm = document.getElementById(elementIds.tweetForm);
    const formData = new FormData(tweetForm);

    const author = formData.get(elementIds.tweetAuthor);
    const type = formData.get(elementIds.tweetType);
    const content = formData.get(elementIds.tweetContent);

    if (!author || !content) {
        return;
    }

    const tweet = new Tweet(author, type, new Date(), content);
    allTweets.push(tweet);

    updateTweets();
    tweetForm.reset();
}

export function initializeTweetForm() {
    const form = document.getElementById(elementIds.tweetForm);
    form.addEventListener('submit', handleFormSubmit);

    updateTweets();
}
