module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "eqeqeq": "warn", // avertissement si opérateur d'égalité non stricte
    "indent": ["warn", 2, { "SwitchCase": 1 }], // avertissement si code pas indenté avec 2 espaces
    "multiline-ternary": ["warn", "always-multiline"],
    "no-unused-vars": "off",
    "no-undef": "off"
  }
}
