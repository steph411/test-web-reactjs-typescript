export interface Article {
    id: string;
    title: string;
    content: string;
    image?: string;
    comments: PostComment[];
}

export interface PostComment {
    id: string;
    content: string;
    date: Date;
}