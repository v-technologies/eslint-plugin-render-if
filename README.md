# eslint-plugin-render-if

ESLint rules for [render-if](https://github.com/ajwhite/render-if).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-render-if`:

```
$ npm install eslint-plugin-render-if --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-render-if` globally.

## Usage

Add `render-if` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "render-if"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "render-if/rule-name": 2
    }
}
```

## Supported Rules

* [prefer-lazy](docs/rules/prefer-lazy.md)


