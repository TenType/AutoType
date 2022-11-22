import { ClientEvents } from 'discord.js';

export default class Event<K extends keyof ClientEvents> {
    constructor(public props: EventProps<K>) {}
}

export interface EventProps<K extends keyof ClientEvents> {
    name: K;
    once: boolean;
    execute: (...args: ClientEvents[K]) => void;
}
