'use strict';

var RuleTester = require("eslint").RuleTester;
var rule = require('../../../lib/rules/prefer-lazy');



/**
 *
 */
var tester = new RuleTester();
var parserOptions = {
	ecmaVersion: 6,
	sourceType: 'module'
};

tester.run('prefer-lazy', rule, {
	valid: [
		{
			code: 'import renderIf from "render-if"; renderIf()(() => {});',
			parserOptions: parserOptions
		},
		{
			code: 'import renderIf from "render-if"; renderIf()(function() {});',
			parserOptions: parserOptions
		},
		{
			code: 'import r from "render-if"; r()(() => {});',
			parserOptions: parserOptions
		},
		{
			code: 'import r from "render-if"; r()(function() {});',
			parserOptions: parserOptions
		}
	],
	invalid: [
		{
			code: 'import renderIf from "render-if"; renderIf()();',
			parserOptions: parserOptions,
			errors: [{
				message: 'Prefer a lazy expression like renderIf()(() => <div />)'
			}]
		},
		{
			code: 'import r from "render-if"; r()();',
			parserOptions: parserOptions,
			errors: [{
				message: 'Prefer a lazy expression like r()(() => <div />)'
			}]
		}
	]
});
