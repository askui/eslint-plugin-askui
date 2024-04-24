// correct-askui-expect-usage.js

module.exports = {
  meta: {
      messages: {
        correctAskuiExpectUsage: 'Correct askui expect() usage: expect().<your element-description>.(exists()|notExists()); No and() in the element-description.',
      },
      type: "problem",
      schema: [],
  },
  create(context) {
      return {
          AwaitExpression(node) {
              let firstMemberExpression = undefined;
              let execIsOnlyProperty = false;
              let execIsValidFirstExpression = false;

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
                    execIsValidFirstExpression = true;
                }
              }

              // Validate if it is an expect()
              let isExpect = false;
              let memberExpression = firstMemberExpression;
              if (memberExpression != undefined) {
                  while ("object" in memberExpression && memberExpression.object.type === "CallExpression") {
                      if ("callee" in memberExpression.object && memberExpression.object.callee.type === "MemberExpression") {
                          memberExpression = memberExpression.object.callee;
                      }
                  }
                  if ("property" in memberExpression && "expect" === memberExpression.property.name) {
                      isExpect = true;
                  }
              }

              // Now we know we have an expect() -> needsValidExec === true
              // Now we need to check if exists() or notExists() is there
              if (isExpect) {

                if (execIsOnlyProperty) {
                    context.report({ node: node, messageId: 'correctAskuiExpectUsage' });
                    return;
                }

                // Check for exists().exec()
                // -> Check second expression
                if (execIsValidFirstExpression) {
                    if ("object" in firstMemberExpression && (firstMemberExpression.object.callee.property.name !== "exists" && firstMemberExpression.object.callee.property.name !== "notExists")) {
                        context.report({ node: node, messageId: 'correctAskuiExpectUsage' });
                        return;
                    }
                    // Scan for any usage of and()
                    let memberExpression = firstMemberExpression;
                    while ("object" in memberExpression && memberExpression.object.type === "CallExpression") {
                        if ("callee" in memberExpression.object && memberExpression.object.callee.type === "MemberExpression") {
                            memberExpression = memberExpression.object.callee;
                        }
                        if ("property" in memberExpression && "and" === memberExpression.property.name) {
                            context.report({ node: node, messageId: 'correctAskuiExpectUsage' });
                            return;
                        }
                    }
                }
                // Only exists or exists() or none of them
                else {
                    context.report({ node: node, messageId: 'correctAskuiExpectUsage' });
                }
              }
          },
      }
  }
};
