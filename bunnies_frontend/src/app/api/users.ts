
import { sfetch } from "./main"

export interface User {
    id: number,
    username: string,
    logoUrl?: string,
    subscribers: number[],
    subscriptions: number[],
    history: History[],
    likes: number[],
    dislikes: number[]
}

export interface History {
    video: number,
}

export async function getAll(): Promise<User[]>  {
    return sfetch("/users").then(resp => resp.json())
}

export async function getOne(id: number): Promise<User> {
    return sfetch(`/users/${id}`).then(resp => resp.json())
}

export async function getMe(): Promise<User> {
    return sfetch(`/users/me`).then(resp => resp.json())
}

export async function addSubscribe(id: number): Promise<Response> {
    return sfetch(`/subscribes/${id}`, {
        method: "POST"
    })
}

export async function removeSubscribe(id: number): Promise<Response> {
    return sfetch(`/subscribes/${id}`, {
        method: "DELETE"
    })
}

export async function hasSubscribe(id: number): Promise<Boolean> {
    return sfetch(`/subscribes/${id}`).then(resp => resp.json()).then(json => json["status"])
}