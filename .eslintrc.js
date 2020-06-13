module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    //设置"script"（默认）或"module"如果你的代码是在ECMAScript中的模块。
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ["alloy", "alloy/vue"],
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    indent: [
      2,
      4,
      {
        SwitchCase: 1
      }
    ], //缩进风格
    "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
    "no-undef": 0, //不能有未定义的变量
    "no-caller": 1, //禁止使用arguments.caller或arguments.callee
    "no-case-declarations": 0,
    complexity: [0, 11], //循环复杂度
    quotes: [2, "single"], //引号类型
    "consistent-this": [2, "that"], //this别名
    camelcase: 2, //强制驼峰法命名
    semi: [2, "never"]
  }
};
