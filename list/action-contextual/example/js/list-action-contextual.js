(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.list||(g.list = {}));g.actionContextual = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = require("focus/component/builder");
var React = window.React;
var Button = require("../../common/button/action").component;
var SelectAction = require("../../common/select-action").component;
var type = require("focus/component/types");

var actionContextualMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-contextual",

    /**
     * Init default props.
     * @returns {{operationList: List of operations.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: []
        };
    },
    /**
     * Init default state.
     * @returns {{isSecondaryActionListExpanded: true if secondary actionList is expanded.}}
     */
    getInitialState: function getInitialState() {
        return {
            isSecondaryActionListExpanded: false
        };
    },
    /**
     * render the component.
     * @returns Html code.
     */
    render: function renderContextualAction() {
        var primaryActionList = [];
        var secondaryActionList = [];
        for (var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if (operation.priority === 1) {
                primaryActionList.push(React.createElement(Button, { style: operation.style, handleOnClick: operation.action, label: operation.label }));
            } else {
                secondaryActionList.push(operation);
            }
        }
        return React.createElement(
            "div",
            { className: "list-action-contextual" },
            React.createElement(
                "span",
                null,
                " ",
                primaryActionList
            ),
            React.createElement(SelectAction, { operationList: secondaryActionList, isExpanded: this.state.isSecondaryActionListExpanded })
        );
    }
};

module.exports = builder(actionContextualMixin);

},{"../../common/button/action":2,"../../common/select-action":4,"focus/component/builder":5,"focus/component/types":6}],2:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = require("focus/component/builder");
/**/
var buttonMixin = {
	getDefaultProps: function getInputDefaultProps() {
		return {
			type: "submit",
			action: undefined,
			isPressed: false,
			style: {}
		};
	},
	handleOnClick: function handleButtonOnclick() {
		if (this.props.handleOnClick) {
			return this.props.handleOnClick.apply(this, arguments);
		}
		if (!this.props.action || !this.action[this.props.action]) {
			return console.warn("Your button action is not implemented");
		}
		return this.action[this.props.action].apply(this, arguments);
	},
	getInitialState: function getInitialState() {
		return {
			isPressed: this.props.isPressed
		};
	},
	_className: function buttonClassName() {
		return "btn " + (this.props.style.className ? "btn-" + this.props.style.className : "");
	},
	renderPressedButton: function renderPressedButton() {
		return React.createElement(
			"button",
			null,
			" Loading... "
		);
	},
	/**
  * Render the button.
  * @return {[type]} [description]
  */
	render: function renderInput() {
		if (this.state.isPressed) {
			return this.renderPressedButton();
		}
		return React.createElement(
			"button",
			{ onClick: this.handleOnClick,
				type: this.props.type,
				className: this._className() },
			" ",
			this.props.label,
			" "
		);
	}
};

module.exports = builder(buttonMixin);

},{"focus/component/builder":5}],3:[function(require,module,exports){
"use strict";

var builder = require("focus/component/builder");
var React = window.React;

var imgMixin = {
    /**
     * Display name.
     */
    displayName: "img",
    /**
     * Default props.
     * @returns {{src: name of the picture, onClick: action handler on click.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns Html code.
     */
    render: function renderImg() {
        var className = "icon " + this.props.src;
        return React.createElement(
            "span",
            { className: className, onClick: this.props.onClick },
            " "
        );
    }
};

module.exports = builder(imgMixin);

},{"focus/component/builder":5}],4:[function(require,module,exports){
"use strict";

var builder = require("focus/component/builder");
var React = window.React;
var Img = require("../img").component;

var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    /**
     * Default props.
     * @returns {{isExpanded: true if list of action is expanded.,
     *              operationList: list of operations,
     *              style: css class of the selector.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isExpanded: false,
            operationList: [],
            style: "dots-three-vertical"
        };
    },
    /**
     * Define defautl state.
     * @returns {{isExpanded: true if list of action is expanded}}
     */
    getInitialState: function getInitialState() {
        return {
            isExpanded: this.props.isExpanded
        };
    },
    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderSelectAcion() {
        var liList = this._getList(this.props.operationList);
        return React.createElement(
            "div",
            { className: "select-action" },
            React.createElement(Img, { onClick: this.expandHandler, src: this.props.style }),
            React.createElement("br", null),
            React.createElement(
                "ul",
                null,
                liList
            )
        );
    },

    _getList: function _getList(operationList) {
        var liList = [];
        if (this.state.isExpanded) {
            for (var key in operationList) {
                var operation = operationList[key];
                liList.push(React.createElement(
                    "li",
                    { onClick: operation.action, className: operation.style },
                    operation.label
                ));
                if (operation.childOperationList) {
                    liList.push(React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "ul",
                            null,
                            this._getList(operation.childOperationList)
                        )
                    ));
                }
            }
        }
        return liList;
    },

    /**
     * Action on the root click.
     */
    expandHandler: function expandHandler() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }
};

module.exports = builder(selectActionMixin);

},{"../img":3,"focus/component/builder":5}],5:[function(require,module,exports){
"use strict";

var React = window.React;
var assign = require("object-assign");
//var isObject = require('lodash/lang/isObject');
//var isFunction = require('lodash/lang/isFunction');

/**
 * Create a component with a mixin except id the component is mixin only.
 * @param {object}  mixin - The component mixin.
 * @param {Boolean} isMixinOnly - define if the component is a mixin only.
 * @return {object} - {component} the built react component.
 */
function createComponent(mixin, isMixinOnly) {
  if (isMixinOnly) {
    return undefined; //Error('Your class publish a mixin only...');
  }
  return { component: React.createClass(mixin) };
}

/**
 * Build a module with a mixin and a React component.
 * @param  {object} componentMixin - Mixin of the component.
 * @param {boolean} isMixinOnly - Bolean to set .
 * @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
 */
module.exports = function (componentMixin, isMixinOnly) {

  return assign({
    mixin: componentMixin
    /*extend: function extendMixin(properties){
      if(isFunction(componentMixin)){
        throw new Error('You cannot extend a mixin function');
      }
      if(!isObject(properties)){
        throw new Error('properties should be an object');
      }
      return assign({}, componentMixin, properties);
    },*/
  }, createComponent(componentMixin, isMixinOnly));
};
},{"object-assign":14}],6:[function(require,module,exports){
"use strict";

//Dependencies.
var React = window.React;
var isString = require("lodash/lang/isString");
var isArray = require("lodash/lang/isArray");

/**
 * Expose a React type validation for the component properties validation.
 * @see http://facebook.github.io/react/docs/reusable-components.html
 * @param  {string} type - String or array of the types to use.
 * @return {object} The corresponding react type.
 */
module.exports = function (type) {
  var isStringType = isString(type);
  if (!isStringType && !isArray(type)) {
    throw new Error("The type should be a string or an array");
  }
  if (isStringType) {
    return React.PropTypes[type];
  }
  return React.PropTypes.oneOf(type);
};
},{"lodash/lang/isArray":10,"lodash/lang/isString":12}],7:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],8:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],9:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],10:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":8,"../internal/isObjectLike":9,"./isNative":11}],11:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":9,"../string/escapeRegExp":13}],12:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
}

module.exports = isString;

},{"../internal/isObjectLike":9}],13:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":7}],14:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}]},{},[1])(1)
});