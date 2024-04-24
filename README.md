# eslint-plugin-askui

Validate correct usage of askui library

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@askui/eslint-plugin-askui`:

```sh
npm install @askui/eslint-plugin-askui --save-dev
```

## Usage

Add `@askui/askui` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@askui/askui"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@askui/askui/no-missing-askui-exec": "error",
        "@askui/askui/correct-askui-expect-usage": "error"
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                                   |
| :--------------------------------------------------------------------- |
| [correct-askui-expect-usage](docs/rules/correct-askui-expect-usage.md) |
| [no-missing-askui-exec](docs/rules/no-missing-askui-exec.md)           |

<!-- end auto-generated rules list -->


