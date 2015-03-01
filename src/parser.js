'use strict';

import invariant from './vendor/invariant';

function Parse(styles) {
  let lines = styles.split('\n')
    .map((l) => l.trim())
    .filter((l) => l);

  let obj = {};
  let ruleNames = [];

  lines.forEach(function (line) {
    if (line.includes('{')) {
      let ruleName = line.replace(/{/, '').trim();
      ruleNames.push(ruleName);

      _touch(obj, ...ruleNames);
    }
    else if (line.includes('}')) {
      ruleNames.pop();
    }
    else {
      invariant(
        line.includes(':'),
        'Property definitions should be separated by a colon'
      );

      invariant(
        line.endsWith(';'),
        'Property definitions should end with a semicolon'
      )

      let [prop, def] = line.split(':').map((l) => l.trim());
      let rule = obj[ruleNames[0]];
      def = def.replace(/;/, '');

      for (let i = 1; i < ruleNames.length; i++) {
        rule = rule[ruleNames[i]];
      }

      rule[prop] = def;
    }
  });

  return obj;
}

export default Parse;

function _touch(obj, ...props) {
  props.reduce((o, prop) => {
    return !o[prop]
      ? (o[prop] = {}, o[prop])
      : o[prop];
  }, obj);
}