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
        }
    ]
});
