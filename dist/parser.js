"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var invariant = _interopRequire(require("./vendor/invariant"));

function Parse(styles) {
  var lines = styles.split("\n").map(function (l) {
    return l.trim();
  }).filter(function (l) {
    return l;
  }).filter(function (l) {
    return !l.includes("use strict");
  });

  var obj = {};
  var ruleNames = [];

  lines.forEach(function (line) {
    if (line.includes("{")) {
      var ruleName = line.replace(/{/, "").trim();
      ruleNames.push(ruleName);

      _touch.apply(undefined, [obj].concat(ruleNames));
    } else if (line.includes("}")) {
      ruleNames.pop();
    } else {
      invariant(line.includes(":"), "Property definitions should be separated by a colon");

      invariant(line.endsWith(";"), "Property definitions should end with a semicolon");

      var _line$split$map = line.split(":").map(function (l) {
        return l.trim();
      });

      var _line$split$map2 = _slicedToArray(_line$split$map, 2);

      var prop = _line$split$map2[0];
      var def = _line$split$map2[1];

      var rule = obj[ruleNames[0]];
      def = def.replace(/;/, "");

      for (var i = 1; i < ruleNames.length; i++) {
        rule = rule[ruleNames[i]];
      }

      rule[prop] = def;
    }
  });

  return obj;
}

module.exports = Parse;

function _touch(obj) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  props.reduce(function (o, prop) {
    return !o[prop] ? (o[prop] = {}, o[prop]) : o[prop];
  }, obj);
}