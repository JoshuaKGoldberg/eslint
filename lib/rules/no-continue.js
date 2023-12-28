/**
 * @fileoverview Rule to flag use of continue statement
 * @author Borislav Zhivkov
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
            description: "Disallow `continue` statements",
            recommended: false,
            url: "https://eslint.org/docs/latest/rules/no-continue"
        },

        schema: [],

        messages: {
            unexpected: "Unexpected use of continue statement."
        }
    },

    create(context) {

        return {
            ContinueStatement(node) {
                context.report({ node, messageId: "unexpected" });
            }
        };

    }
};
