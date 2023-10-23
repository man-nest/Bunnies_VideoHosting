
import { sfetch } from "./main"

interface User {
    id: number,
    username: string,
    logoUrl: URL,
    subscribers: number[],
    subscriptions: number[],
    history: History[],
}

interface History {
    videoId: number,
}

export async function getAll(): Promise<User[]>  {
    return sfetch("/users").then(resp => resp.json())
}

export async function getOne(id: number): Promise<User> {
    return fetch(`/users/${id}`).then(resp => resp.json())
}

export async function addSubscribe(id: number): Promise<User> {
    return fetch(`/subscribes/${id}`, {
        method: "POST"
    }).then(resp => resp.json())
}

export async function removeSubscribe(id: number): Promise<User> {
    return fetch(`/subscribes/${id}`, {
        method: "DELETE"
    }).then(resp => resp.json())
}

export async function hasSubscribe(id: number): Promise<User> {
    return fetch(`/subscribes/${id}`).then(resp => resp.json()).then(resp => resp.json()).then(json => json["status"])
}