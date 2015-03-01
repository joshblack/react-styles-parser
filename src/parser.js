'use strict';

function Parse(styles) {
  let lines = styles.split('\n')
    .filter((l) => l)
    .map((l) => l.trim());

  let obj = {};
  let ruleNames = [];

  lines.forEach(function (line) {
    if (line.includes('{')) {
      let ruleName = line.slice(0, line.length - 1).trim();
      ruleNames.push(ruleName);

      _touch(obj, ...ruleNames);
    }
    else if (line.includes('}')) {
      ruleNames.pop();
    }
    else {
      let [prop, def] = line.split(':').map((l) => l.trim());
      let rule = obj[ruleNames[0]];

      // Remove semicolon
      def = def.slice(0, def.length - 1);

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