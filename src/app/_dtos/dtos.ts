export interface User {
    id: string;
    name: string;
    email: string;
    gender: string;
}

export interface UserData {
    id: string;
    name: string;
    surname: string;
    initials: string;
    email: string;
    gender: string;
    posts: number;
}

export interface Post {
    id: string;
    userId: string;
    title: string;
}
