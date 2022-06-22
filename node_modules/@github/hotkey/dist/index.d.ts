import { Leaf, RadixTrie } from './radix-trie';
import eventToHotkeyString from './hotkey';
export { RadixTrie, Leaf, eventToHotkeyString };
export declare function install(element: HTMLElement, hotkey?: string): void;
export declare function uninstall(element: HTMLElement): void;
