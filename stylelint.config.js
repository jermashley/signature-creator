module.exports = {
  extends: [`stylelint-config-standard`, `stylelint-config-rational-order`],
  plugins: [`stylelint-order`, `stylelint-config-rational-order/plugin`],
  rules: {
    'no-empty-source': null,
    'color-hex-length': `long`,
    'max-nesting-depth': 4,
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false,
      },
    ],
    'property-no-unknown': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          `tailwind`,
          `apply`,
          `variants`,
          `responsive`,
          `screen`,
        ],
      },
    ],
  },
}
