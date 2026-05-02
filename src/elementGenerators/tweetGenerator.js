import { formatTweetTime } from '../utils/dateUtils.js';
import { classNames } from '../constants/classNames.js';
import { isTextOffensive } from '../utils/bannedUtils.js';
import { registeredUsers } from '../events/userFormEvent.js';
import { createProfilePicture } from './userCardGenerator.js';
import { TweetType } from '../models/Tweet.js';
import { elementIds } from '../constants/elementIds.js';
import { displayNames } from '../constants/DisplayNames.js';

export function createTweetElement(tweet, tweetEditCallback, tweetDeleteCallback) {
    const tweetContainer = document.createElement('div');
    tweetContainer.id = tweet.id;
    tweetContainer.className = `${classNames.tweet} ${classNames.paper} ${tweet.type === TweetType.normal ? '' : TweetType.fight}`;

    const editCallback = () => tweetEditCallback(tweet, tweetContainer);

    const tweetHeaderEl = createTweetHeader(
        tweet.author,
        tweet.date,
        isTextOffensive(tweet.content),
        tweetContainer,
        editCallback,
        tweetDeleteCallback,
        tweet.id,
        tweet.isEdited
    );

    const contentEl = document.createElement('p');
    contentEl.className = classNames.tweetContent;
    contentEl.id = `${elementIds.tweetContent}-${tweet.id}`;
    contentEl.textContent = tweet.content;

    tweetContainer.appendChild(tweetHeaderEl);
    tweetContainer.appendChild(contentEl);
    return tweetContainer;
}

function createTweetHeader(
    author,
    date,
    isDeletable,
    tweetEl,
    tweetEditCallback,
    tweetDeleteCallback,
    tweetId,
    isEdited
) {
    const header = document.createElement('div');
    header.className = classNames.tweetHeader;

    const rightPart = createTweetHeaderRightPart(author);
    const leftPart = createTweetHeaderLeftPart(
        isDeletable,
        tweetEl,
        tweetDeleteCallback,
        tweetId,
        isEdited,
        date,
        tweetEditCallback
    );

    header.appendChild(rightPart);
    header.appendChild(leftPart);

    return header;
}

function createTweetHeaderRightPart(author) {
    const rightPart = document.createElement('span');
    rightPart.className = classNames.userDetails;

    const profilePic = getProfilePictureFromAuthorName(author);
    rightPart.appendChild(profilePic);

    const authorEl = document.createElement('h4');
    authorEl.className = classNames.tweetAuthor;
    authorEl.textContent = author;
    rightPart.appendChild(authorEl);

    return rightPart;
}

function createTweetHeaderLeftPart(
    isDeletable,
    tweetEl,
    tweetDeleteCallback,
    tweetId,
    isEdited,
    date,
    tweetEditCallback
) {
    const leftPart = document.createElement('span');

    const callback = () => {
        tweetDeleteCallback(tweetId);
        tweetEl.remove();
    }

    if (isDeletable) {
        const deleteButton = createIconButton('./assets/delete.svg', callback);
        leftPart.appendChild(deleteButton);
    }

    if (isEdited) {
        const editedIndicator = document.createElement('span');
        editedIndicator.textContent = displayNames.edited;
        editedIndicator.className = classNames.tweetTime;
        leftPart.appendChild(editedIndicator);
    }

    const editButton = createIconButton('./assets/edit.svg', tweetEditCallback);
    leftPart.appendChild(editButton);

    const dateEl = document.createElement('span');
    dateEl.className = classNames.tweetTime;
    dateEl.textContent = formatTweetTime(date);
    leftPart.appendChild(dateEl);

    return leftPart;
}

function getProfilePictureFromAuthorName(author) {
    const user = registeredUsers.find((user) => user.username === author);
    return createProfilePicture(user?.animal ?? '');
}

function createIconButton(iconSrc, onClickCallback) {
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.className = classNames.smallIcon;

    const button = document.createElement('button');
    button.appendChild(icon);
    button.className = classNames.ghostButton;

    button.addEventListener('click', onClickCallback);
    return button;
}
