'use strict';



/**
 *
 */
module.exports = {
	meta: {
		docs: {
			description: 'Ensures lazy rendering of elements.',
			category: 'Best Practices',
			recommended: true
		},
		schema: []
	},

	create: function(context) {
		var renderIfVarName;

		function isRenderIfImport(node) {
			return node.source.value === 'render-if';
		}

		function findImportDefaultSpecifier(node) {
			return node.specifiers.find(function(node) {
				return node.type === 'ImportDefaultSpecifier';
			});
		}

		function isRenderIfRendererCall(node) {
			return (
				node.callee
				&& node.callee.callee
				&& node.callee.callee.name === renderIfVarName
			);
		}

		function isFunctionExpression(node) {
			return (
				node.type === 'FunctionExpression'
				|| node.type === 'ArrowFunctionExpression'
			);
		}

		function containsFunctionExpression(node) {
			if (node.arguments.length !== 1) {
				return false;
			}

			return isFunctionExpression(node.arguments[0]);
		}

		return {

			/**
			 *	Extracts render-if's local variable name from imports.
			 */
			ImportDeclaration: function(node) {
				if (isRenderIfImport(node)) {
					var specifier = findImportDefaultSpecifier(node);

					if (specifier) {
						renderIfVarName = specifier.local.name;
					}
				}
			},

			/**
			 *	Ensures a lazy expression is used to render JSX from render-if.
			 */
			CallExpression: function(node) {
				if (
					renderIfVarName
					&& isRenderIfRendererCall(node)
					&& !containsFunctionExpression(node)
				) {
					context.report({
						node: node,
						message: 'Prefer a lazy expression like '
							+ renderIfVarName + '()(() => <div />)'
					});
				}
			}
		};
	}
};
