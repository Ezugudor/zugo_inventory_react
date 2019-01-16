export class ValidationRuleBuilder {
  static buildAccountNumberRule() {
    return [{ name: "min", value: 10 }, { name: "max", value: 10 }].concat(
      baseRule
    );
  }

  static buildBvnNumberRule() {
    return [{ name: "min", value: 11 }, { name: "max", value: 11 }].concat(
      baseRule
    );
  }

  static buildMobileNumberRule() {
    return [{ name: "min", value: 11 }, { name: "max", value: 11 }].concat(
      baseRule
    );
  }

  static buildOfficePhoneRule() {
    return [{ name: "min", value: 7 }, { name: "max", value: 10 }].concat(
      baseRule
    );
  }

  static buildDefaultRule() {
    return baseRule;
  }
}

const baseRule = [{ required: true }];
