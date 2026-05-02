import { classNames } from '../constants/classNames.js';
import { displayNames } from '../constants/DisplayNames.js';
import { updateTweets } from './tweetformEvent.js';
import { elementIds } from '../constants/elementIds.js';

export function createEditTextarea(tweet) {
    const textarea = document.createElement('textarea');
    textarea.value = tweet.content;
    textarea.maxLength = 200;
    textarea.className = `${classNames.formInput} ${classNames.tweetEditTextarea}`;
    return textarea;
}

export function createEditButtons(tweet, textarea) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = classNames.tweetEditContainer;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = displayNames.cancel;
    cancelBtn.className = classNames.ghostButton;

    const submitBtn = document.createElement('button');
    submitBtn.textContent = displayNames.save;
    submitBtn.className = classNames.button;

    const submitEvent = () => {
        const newContent = textarea.value.trim();
        if (!newContent) {
            alert(displayNames.tweetCannotBeEmpty);
            return;
        }
        tweet.content = newContent;
        tweet.isEdited = true;
        updateTweets();
    }

    submitBtn.addEventListener('click', submitEvent);

    cancelBtn.addEventListener('click', updateTweets);

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(submitBtn);

    return buttonContainer;
}

export function startEditTweet(tweet, tweetContainer) {
    const contentElement = document.getElementById(`${elementIds.tweetContent}-${tweet.id}`);

    if (!contentElement) return;

    const textarea = createEditTextarea(tweet);
    const buttonContainer = createEditButtons(tweet, textarea);

    contentElement.replaceWith(textarea);
    textarea.parentNode.insertBefore(buttonContainer, textarea.nextSibling);
    textarea.focus();
}
