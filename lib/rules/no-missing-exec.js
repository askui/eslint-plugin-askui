// no-missing-exec.js

const askuiActions = {
    click : "click",
    execOnShell : "execOnShell",
    mouseDoubleLeftClick : "mouseDoubleLeftClick",
    mouseDoubleMiddleClick : "mouseDoubleMiddleClick",
    mouseDoubleRightClick : "mouseDoubleRightClick",
    mouseLeftClick : "mouseLeftClick",
    mouseMiddleClick : "mouseMiddleClick",
    mouseRightClick : "mouseRightClick",
    mouseToggleDown : "mouseToggleDown",
    mouseToggleUp : "mouseToggleUp",
    moveMouse : "moveMouse",
    moveMouseRelatively : "moveMouseRelatively",
    moveMouseRelativelyTo : "moveMouseRelativelyTo",
    moveMouseTo : "moveMouseTo",
    pressAndroidKey : "pressAndroidKey",
    pressAndroidThirdKey : "pressAndroidThirdKey",
    pressAndroidTwoKey : "pressAndroidTwoKey",
    pressKey : "pressKey",
    pressThreeKeys : "pressThreeKeys",
    pressTwoKeys : "pressTwoKeys",
    scrollInside : "scrollInside",
    swipe : "swipe",
    type : "type",
    typeIn : "typeIn",
}

module.exports = {
    meta: {
        messages: {
            missingAskuiExec: 'Missing askui exec() is not allowed',
        },
        type: "problem",
        schema: [],
    },
    create(context) {
        return {
            AwaitExpression(node) {
                let firstMemberExpression = undefined;
                let execIsOnlyProperty = false;
                let execIsValid = false;

                // Check if exec is without ()
                if ("argument" in node && node.argument.type === "MemberExpression") {
                    firstMemberExpression = node.argument;
                    if ("property" in firstMemberExpression && firstMemberExpression.property.name === "exec") {
                        execIsOnlyProperty = true;
                    }
                }
                // exec() is in the first MemberExpression of the CallExpression
                else if ("argument" in node && node.argument.type === "CallExpression") {
                    firstMemberExpression = node.argument.callee;
                    if ("property" in firstMemberExpression && firstMemberExpression.property.name === "exec") {
                        execIsValid = true;
                    }
                }

                // Validate if it is an askui instruction that needs exec
                let needsValidExec = false;
                let memberExpression = firstMemberExpression;
                if (memberExpression != undefined) {
                    while ("object" in memberExpression && memberExpression.object.type === "CallExpression") {
                        if ("callee" in memberExpression.object && memberExpression.object.callee.type === "MemberExpression") {
                            memberExpression = memberExpression.object.callee;
                        }
                    }
                    if ("property" in memberExpression && Object.values(askuiActions).includes(memberExpression.property.name)) {
                        needsValidExec = true;
                    }
                }

                // await aui.mouseLeftClick().exec
                if (execIsOnlyProperty && needsValidExec) {
                    context.report({ node: node, messageId: 'missingAskuiExec' });
                }
                
                // await aui.mouseLeftClick();
                if (!execIsOnlyProperty && !execIsValid && needsValidExec) {
                    context.report({ node: node, messageId: 'missingAskuiExec' });
                }
            },
        }
    }
};
