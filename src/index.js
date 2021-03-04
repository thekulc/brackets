// check('()', [['(', ')']]) // -> true
// check('((()))()', [['(', ')']]) // -> true
// check('())(', [['(', ')']]) // -> false
// check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]) // -> true
// check('[(])', [['(', ')'], ['[', ']']]) // -> false
// check('[]()', [['(', ')'], ['[', ']']]) // -> true
// check('[]()(', [['(', ')'], ['[', ']']]) // -> false

// // special case: opening and closing bracket can be the same :)

// check('||', [['|', '|']]) // -> true
// check('|()|', [['(', ')'], ['|', '|']]) // -> true
// check('|(|)', [['(', ')'], ['|', '|']]) // -> false
// check('|()|(||)||', [['(', ')'], ['|', '|']]) // -> true

module.exports = function check(str, bracketsConfig) {
  // console.log(str);
  let levels = []
  let currentLevel = -1;
  // bracketsConfig = bracketsConfig.map( b => b[0] == b[1] ? [b[0], b[1] += 1] : b)
  function isOpenOrClose(s, isOpen) {
    const brs = isOpen ? bracketsConfig.map(b => b[0]) : bracketsConfig.map(b => b[1])
    const ind = brs.indexOf(s)
    return ind != -1 ? brs[ind] : false
  }
  for (let i = 0; i < str.length; i++) {
    const opn = isOpenOrClose(str[i], true)
    if (opn) {
      levels.push([opn])
      currentLevel = levels.length
      continue
    }
    
    const clsd = isOpenOrClose(str[i], false)
    if (clsd && typeof levels[currentLevel - 1] !== 'undefined') {
      currentLevel -= 1;
      console.log(str[i]);
      console.log(currentLevel);
      console.log(levels);
      levels[currentLevel].push(clsd)
    }
  }
  // console.log(levels);
  return levels.every(l => bracketsConfig.every(b => b.join("") === l.join("")))
  return levels
}
