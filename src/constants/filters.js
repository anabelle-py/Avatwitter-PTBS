import { TweetType } from "../models/Tweet.js";

export const Filters = {
    all: 'all',
    normalOnly: TweetType.normal,
    fightOnly: TweetType.fight,
}