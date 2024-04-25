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
        "@askui/askui/no-missing-exec": "error",
        "@askui/askui/expect": "error"
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                             |
| :----------------------------------------------- |
| [expect](docs/rules/expect.md)                   |
| [no-missing-exec](docs/rules/no-missing-exec.md) |

<!-- end auto-generated rules list -->


