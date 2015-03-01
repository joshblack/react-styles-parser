"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

function Parse(styles) {
  var lines = styles.split("\n").filter(function (l) {
    return l;
  }).map(function (l) {
    return l.trim();
  });

  var obj = {};
  var ruleNames = [];

  lines.forEach(function (line) {
    if (line.includes("{")) {
      var ruleName = line.slice(0, line.length - 1).trim();
      ruleNames.push(ruleName);

      _touch.apply(undefined, [obj].concat(ruleNames));
    } else if (line.includes("}")) {
      ruleNames.pop();
    } else {
      var _line$split$map = line.split(":").map(function (l) {
        return l.trim();
      });

      var _line$split$map2 = _slicedToArray(_line$split$map, 2);

      var prop = _line$split$map2[0];
      var def = _line$split$map2[1];

      var rule = obj[ruleNames[0]];

      // Remove semicolon
      def = def.slice(0, def.length - 1);

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