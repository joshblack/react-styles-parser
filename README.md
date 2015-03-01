# React Styles Parser

The purpose of this package is to allow developers/designers to write styles for React Styles using syntax that they are familiar with. Using this parser, we can let anyone write styles as if they were writing scss.

For example:

```javascript
// Style Examples
// You can even use variables in the template string.
// Just define/import the variables above and use them
// like background: ${backgroundColor} in the string.

module.exports = `
h1 {
    background: blue;

    minWidth {
        320 {
            background: lightblue
        }
    }
}

button {
    background: blue;
    border-radius: 15px;
    padding: 25px;

    .open {
        background: darkblue;

        minWidth {
            640 {
                margin: 15px;
            }
        }

        maxWidth {
            480 {
                margin: 30px;
            }
        }
    }
}`;
```

Here's how we would use these styles in a build step:

```javascript
'use strict';

import Parser from './parser';
import styles from './styles';

Parser(styles);

// Output:
{
    h1: {
        'background': 'blue',
        'minWidth': { '320': { 'background': 'lightblue' } }
    },
    button: {
        'background': 'blue',
        'border-radius': '15px',
        'padding': '25px',
        '.open': {
            'background': 'darkblue',
            'minWidth': { '640': { 'margin': '15px' } },
            'maxWidth': { '480': { 'margin': '30px' } }
        }
    }
}
```

This output then can be passed through any transformations that you want, such as an autoprefixer step. Eventually these styles will be passed into React Components and will be used with React Styles and React Styles helpers.