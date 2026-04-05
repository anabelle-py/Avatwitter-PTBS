import { createTweetElement } from '../elementGenerators/tweetGenerator.js';
import { elementIds } from '../constants/elementIds.js';
import { Filters } from '../constants/filters.js';
import { Tweet } from '../models/Tweet.js';
import { stateItems } from '../constants/stateItems.js';

const allTweets = JSON.parse(localStorage.getItem(stateItems.tweets)) || [];
export let currentFilter =
    localStorage.getItem(stateItems.filter) || Filters.all;

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
            //CR:what do you think about move the tweet delete logic to here so you can inject it to to the tweet generator
            const tweetEl = createTweetElement(tweet, () =>
                startEditTweet(tweet.id),
            );
            container.prepend(tweetEl);
        }
    });
    saveTweets();
}

/*this is a temporary solution */
function startEditTweet(tweetId) {
    //CR: why you render all tweets again? you can just find the tweet element and update it, no need to re-render all tweets
    const tweet = allTweets.find((t) => t.id === tweetId);

    const newContent = prompt('Edit tweet:', tweet.content);

    if (!newContent) return;
    if (newContent && newContent.length > 200) {
        alert('Tweet cannot be longer than 200 characters');
        return;
    }

    tweet.content = newContent;
    //CR: don't forget to update the date of the tweet when editing
    updateTweets();
    saveTweets();
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
