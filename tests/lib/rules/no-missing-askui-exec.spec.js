// no-missing-askui-exec.spec.js
const { RuleTester } = require('eslint');
const noMissingAskuiExecRule = require('../../../lib/rules/no-missing-askui-exec.js');
const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'), // eslint-disable-line
  });
ruleTester.run(
    'no-missing-askui-exec',
    noMissingAskuiExecRule,
    {
    valid: [
        {
            code: 'await aui.click().button().exec()',
        },
        {
            code: 'await aui.click().exec()',
        },
        {
            code: 'await aui.click().button().withText("42").exec()',
        },

        {
            code: 'await aui.expect().button().exists().exec()',
        },
        {
            code: 'await aui.expect().exec()',
        },
        {
            code: 'await aui.expect().button().withText("42").exists().exec()',
        },

        {
            code: 'await aui.mouseDoubleLeftClick().button().exec()',
        },
        {
            code: 'await aui.mouseDoubleLeftClick().exec()',
        },
        {
            code: 'await aui.mouseDoubleLeftClick().button().withText("42").exec()',
        },

        {
            code: 'await aui.mouseLeftClick().button().exec()',
        },
        {
            code: 'await aui.mouseLeftClick().exec()',
        },
        {
            code: 'await aui.mouseLeftClick().button().withText("42").exec()',
        },
    ],
    invalid: [
        {
            code: 'await aui.mouseLeftClick().button().exec',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.mouseLeftClick().exec',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.mouseLeftClick().button().withText("42").exec',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.mouseLeftClick',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.mouseLeftClick()',
            errors: [{ messageId: 'missingAskuiExec' }],
        },

        {
            code: 'await aui.click().button().exec',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.click().exec',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.click().button().withText("42").exec',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.click',
            errors: [{ messageId: 'missingAskuiExec' }],
        },
        {
            code: 'await aui.click()',
            errors: [{ messageId: 'missingAskuiExec' }],
        }
    ]
});
