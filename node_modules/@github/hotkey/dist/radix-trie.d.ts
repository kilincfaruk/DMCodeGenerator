export declare class Leaf<T> {
    parent: RadixTrie<T>;
    children: T[];
    constructor(trie: RadixTrie<T>);
    delete(value: T): boolean;
    add(value: T): Leaf<T>;
}
export declare class RadixTrie<T> {
    parent: RadixTrie<T> | null;
    children: {
        [key: string]: RadixTrie<T> | Leaf<T>;
    };
    constructor(trie?: RadixTrie<T>);
    get(edge: string): RadixTrie<T> | Leaf<T>;
    insert(edges: string[]): RadixTrie<T> | Leaf<T>;
    delete(node: RadixTrie<T> | Leaf<T>): boolean;
}
