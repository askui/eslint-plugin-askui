// expect.spec.js
const { RuleTester } = require('eslint');
const correctAskuiExpectUsageRule = require('../../../lib/rules/expect.js');
const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'), // eslint-disable-line
  });
ruleTester.run(
    'expect',
    correctAskuiExpectUsageRule,
    {
    valid: [
        {
            code: 'await aui.expect().text("42").exists().exec()',
        },
        {
            code: 'await aui.expect().text("42").notExists().exec()',
        },
        {
            code: 'await aui.expect().button().withText("42").exists().exec()',
        },
        {
            code: 'await aui.expect().button().withText("42").notExists().exec()',
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().exists().exec()',
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().notExists().exec()',
        },
        {
            code: 'await aui.expect().button().withText("42").or().textfield().exists().exec()',
        },
    ],
    invalid: [
        {
            code: 'await aui.expect().text',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().text()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().text("42").exec()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").exec()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().exec()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().exists()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().exists',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().notExists()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().notExists',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().exists().exec',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().button().withText("42").above().textfield().notExists().exec',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().text("42").and().textfield().exists().exec()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        },
        {
            code: 'await aui.expect().text("42").and().textfield().notExists().exec()',
            errors: [{ messageId: 'correctAskuiExpectUsage' }],
        }
    ]
});
