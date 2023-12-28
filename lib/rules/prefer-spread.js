/**
 * @fileoverview A rule to suggest using of the spread operator instead of `.apply()`.
 * @author Toru Nagashima
 */

"use strict";

const astUtils = require("./utils/ast-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks whether or not a node is a `.apply()` for variadic.
 * @param {import("eslint").AST.Node} node A CallExpression node to check.
 * @returns {boolean} Whether or not the node is a `.apply()` for variadic.
 */
function isVariadicApplyCalling(node) {
    return (
        astUtils.isSpecificMemberAccess(node.callee, null, "apply") &&
        node.arguments.length === 2 &&
        node.arguments[1].type !== "ArrayExpression" &&
        node.arguments[1].type !== "SpreadElement"
    );
}

/**
 * Checks whether or not `thisArg` is not changed by `.apply()`.
 * @param {import("eslint").AST.Node|null} expectedThis The node that is the owner of the applied function.
 * @param {import("eslint").AST.Node} thisArg The node that is given to the first argument of the `.apply()`.
 * @param {RuleContext} context The ESLint rule context object.
 * @returns {boolean} Whether or not `thisArg` is not changed by `.apply()`.
 */
function isValidThisArg(expectedThis, thisArg, context) {
    if (!expectedThis) {
        return astUtils.isNullOrUndefined(thisArg);
    }
    return astUtils.equalTokens(expectedThis, thisArg, context);
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @typedef {import("eslint").Rule.RuleModule} RuleModule */

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "Require spread operators instead of `.apply()`",
            recommended: false,
            url: "https://eslint.org/docs/latest/rules/prefer-spread"
        },

        schema: [],
        fixable: null,

        messages: {
            preferSpread: "Use the spread operator instead of '.apply()'."
        }
    },

    create(context) {
        const sourceCode = context.sourceCode;

        return {
            CallExpression(node) {
                if (!isVariadicApplyCalling(node)) {
                    return;
                }

                const applied = astUtils.skipChainExpression(astUtils.skipChainExpression(node.callee).object);
                const expectedThis = (applied.type === "MemberExpression") ? applied.object : null;
                const thisArg = node.arguments[0];

                if (isValidThisArg(expectedThis, thisArg, sourceCode)) {
                    context.report({
                        node,
                        messageId: "preferSpread"
                    });
                }
            }
        };
    }
};
