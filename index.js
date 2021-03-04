const check = require('./src/index');
console.log(
    check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]) 
);
