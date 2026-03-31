export class Tweet {
    constructor(author, type, date, content, isEdited = false) {
        this.id = crypto.randomUUID();
        this.author = author;
        this.type = type;
        this.date = date;
        this.content = content;
        this.isEdited = isEdited;
    }
}

export const TweetType = {
    normal: "normal",
    fight: "fight"
}