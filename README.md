# eslint-plugin-askui

Validate correct usage of askui library

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@askui/eslint-plugin`:

```sh
npm install @askui/eslint-plugin --save-dev
```

## Usage

Add `askui` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@askui"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@askui/no-missing-askui-exec": "error"
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                         |
| :----------------------------------------------------------- |
| [no-missing-askui-exec](docs/rules/no-missing-askui-exec.md) |

<!-- end auto-generated rules list -->


