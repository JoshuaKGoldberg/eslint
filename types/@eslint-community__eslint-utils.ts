declare module "@eslint-community/eslint-utils" {
    import * as estree from "estree";
    import * as eslint from "eslint";

    function isCommentToken(value: estree.Comment | eslint.AST.Token): value is estree.Comment;

    function isParenthesized(times: number, node: eslint.AST.Token, sourceCode: eslint.SourceCode): boolean;
    function isParenthesized(node: eslint.AST.Token, sourceCode: eslint.SourceCode): boolean;
}
