declare module "espree" {
    import { Node } from "eslint";

    const latestEcmaVersion: number;
    const version: number;

    interface Tokenized extends Array<Node> {
        comments: Comment[];
    }

    function tokenize(value, options): Tokenized
}
