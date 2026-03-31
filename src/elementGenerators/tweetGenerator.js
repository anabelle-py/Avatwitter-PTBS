import { formatTweetTime } from '../utils/dateUtils.js';
import { classNames } from '../constants/classNames.js';
import { isTextOffensive } from '../utils/bannedUtils.js';
import { registeredUsers } from '../events/userFormEvent.js';
import { createProfilePicture } from './userCardGenerator.js';
import { TweetType } from '../models/Tweet.js';

export function createTweetElement(tweet, tweetEditCallback) {
    const tweetContainer = document.createElement('div');
    tweetContainer.id = tweet.id;
    tweetContainer.className = `${classNames.tweet} ${classNames.paper} ${tweet.type === TweetType.normal ? '' : 'fight'}`;

    const tweetHeaderEl = createTweetHeader(tweet.author, tweet.date, isTextOffensive(tweet.content), tweetContainer, tweetEditCallback);

    const contentEl = document.createElement('p');
    contentEl.className = classNames.tweetContent;
    contentEl.textContent = tweet.content;

    tweetContainer.appendChild(tweetHeaderEl);
    tweetContainer.appendChild(contentEl);
    return tweetContainer;
}


function createTweetHeader(author, date, isDeletable, tweetEl, tweetEditCallback) {
    const header = document.createElement('div');
    header.className = classNames.tweetHeader;

    const leftPart = document.createElement('span');
    const rightPart = document.createElement('span');
    rightPart.className = classNames.userDetails;

    const authorEl = document.createElement('h4');
    authorEl.className = classNames.tweetAuthor;
    authorEl.textContent = author;

    const dateEl = document.createElement('span');
    dateEl.className = classNames.tweetTime;
    dateEl.textContent = formatTweetTime(date);

    const profilePic = getProfilePictureFromAuthorName(author);

    if (isDeletable) {
        const deleteButton = createIconButton('./assets/delete.svg', () => tweetEl.remove());
        leftPart.appendChild(deleteButton);
    }

    const editButton = createIconButton('./assets/edit.svg', tweetEditCallback);
    leftPart.appendChild(editButton);

    leftPart.appendChild(dateEl);
    rightPart.appendChild(profilePic);
    rightPart.appendChild(authorEl);
    header.appendChild(rightPart);
    header.appendChild(leftPart);

    return header;
}

function getProfilePictureFromAuthorName(author) {
    const user = registeredUsers.find(user => user.username === author);
    return createProfilePicture(user?.animal ?? '')
}


function createIconButton(iconSrc, onClickCallback) {
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.className = classNames.smallIcon;

    const button = document.createElement("button");
    button.appendChild(icon);
    button.className = classNames.ghostButton;

    button.addEventListener("click", onClickCallback);
    return button;
}
