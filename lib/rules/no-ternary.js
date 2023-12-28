/**
 * @fileoverview Rule to flag use of ternary operators.
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @typedef {import("eslint").Rule.RuleModule} RuleModule */

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "Disallow ternary operators",
            recommended: false,
            url: "https://eslint.org/docs/latest/rules/no-ternary"
        },

        schema: [],

        messages: {
            noTernaryOperator: "Ternary operator used."
        }
    },

    create(context) {

        return {

            ConditionalExpression(node) {
                context.report({ node, messageId: "noTernaryOperator" });
            }

        };

    }
};
