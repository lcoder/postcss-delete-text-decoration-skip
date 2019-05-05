var postcss = require('postcss')
var PROPTDSI = 'text-decoration-skip-ink' ,
	TDSIAUTO = 'auto'

/**
 * Main function
 */
module.exports = postcss.plugin('postcss-delete-text-decoration-skip', function () {
	return function (css) {
		css.walkRules(function (rule) {
			rule.walkDecls(/^text-decoration-skip$/, function (decl) {
				var rule = decl.parent ,
					nodes = rule.nodes ,
					hasSkipInk = false
				nodes.forEach(function (node) {
					if ( node.prop === PROPTDSI && node.value === TDSIAUTO ) {
						hasSkipInk = true
					}
				});
				if ( decl.value === 'ink' ) {
					if ( hasSkipInk === false ) {
						rule.insertAfter( decl , { prop: PROPTDSI , value: TDSIAUTO });
					}
					rule.removeChild( decl )
				}
			});
		});
	};
});
