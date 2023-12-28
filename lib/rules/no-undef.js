/**
 * @fileoverview Rule to flag references to undeclared variables.
 * @author Mark Macdonald
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks if the given node is the argument of a typeof operator.
 * @param {import("eslint").AST.Node} node The AST node being checked.
 * @returns {boolean} Whether or not the node is the argument of a typeof operator.
 */
function hasTypeOfOperator(node) {
    const parent = node.parent;

    return parent.type === "UnaryExpression" && parent.operator === "typeof";
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @typedef {import("eslint").Rule.RuleModule} RuleModule */

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "Disallow the use of undeclared variables unless mentioned in `/*global */` comments",
            recommended: true,
            url: "https://eslint.org/docs/latest/rules/no-undef"
        },

        schema: [
            {
                type: "object",
                properties: {
                    typeof: {
                        type: "boolean",
                        default: false
                    }
                },
                additionalProperties: false
            }
        ],
        messages: {
            undef: "'{{name}}' is not defined."
        }
    },

    create(context) {
        const options = context.options[0];
        const considerTypeOf = options && options.typeof === true || false;
        const sourceCode = context.sourceCode;

        return {
            "Program:exit"(node) {
                const globalScope = sourceCode.getScope(node);

                globalScope.through.forEach(ref => {
                    const identifier = ref.identifier;

                    if (!considerTypeOf && hasTypeOfOperator(identifier)) {
                        return;
                    }

                    context.report({
                        node: identifier,
                        messageId: "undef",
                        data: identifier
                    });
                });
            }
        };
    }
};
