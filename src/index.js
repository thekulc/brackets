module.exports = function check(str, bracketsConfig) {
  return isValid(str, bracketsConfig)
}

function isValid(s, b) {
  const { str, brackets } = normConfig(s, b)
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (isClosedBracket(str[i], brackets)) {
      if (brackets[str[i]] !== stack.pop()) return false;
    } else {
      stack.push(str[i]);
    }
  }
  return stack.length === 0;
}

function normConfig(str, bracketsConfig) {
  const dict = [["a", "b"], ['c', 'd']];
  let brackets = {}
  bracketsConfig.forEach(b => {
    if (b[0] === b[1]) {
      let d = dict.pop();
      brackets[d[1]] = d[0]
      str = normStr(str, b[0], d[0], d[1])
    }
    else {
      brackets[b[1]] = b[0]
    }
  })
  return { str, brackets }
}

function isClosedBracket(ch, normBrackets) {
  return Object.keys(normBrackets).includes(ch);
}

function normStr(str, bracket, bracketA, bracketB) {
  let res = true;
  let strA = str.split("");
  let i = str.indexOf(bracket);
  while (str.indexOf(bracket, i) != -1 && i < str.length) {
    i = str.indexOf(bracket, i)
    if (res) {
      strA[i] = bracketA;
      res = false
    }
    else {
      strA[i] = bracketB;
      res = true
    }
    i += 1
  }
  return strA.join("")
}
