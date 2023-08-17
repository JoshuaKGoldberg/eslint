/* eslint no-global-assign: off -- Resetting Mocha globals */
/**
 * @fileoverview Tests for RuleTester without any test runner
 * @author Weijia Wang <starkwang@126.com>
 */
"use strict";

const assert = require("assert");
const { RuleTester } = require("../../../lib/rule-tester");
const tmpIt = it;
const tmpDescribe = describe;

it = null;
describe = null;

// eslint-disable-next-line jsdoc/require-jsdoc -- prototype
async function main() {
    try {
        const ruleTester = new RuleTester();

        await assert.rejects(async () => {
            await ruleTester.run(
                "no-var",
                require("../../fixtures/testers/rule-tester/no-var"),
                {
                    valid: ["bar = baz;"],
                    invalid: [
                        {
                            code: "var foo = bar;",
                            output: "invalid output",
                            errors: 1
                        }
                    ]
                }
            );
        }, new assert.AssertionError({ actual: " foo = bar;", expected: "invalid output", operator: "===" }).message);
    } finally {
        it = tmpIt;
        describe = tmpDescribe;
    }
}

main()
    .catch(error => {
        // eslint-disable-next-line no-console -- prototype
        console.error(error);
        process.exitCode = 1;
    });
