import { ClientEvents } from 'discord.js';

export default interface Event<K extends keyof ClientEvents> {
    name: K;
    once: boolean;
    execute: (...args: ClientEvents[K]) => void;
}
