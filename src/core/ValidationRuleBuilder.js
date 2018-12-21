export class ValidationRuleBuilder {
  static buildAccountNumberRule() {
    return [{ name: "min", value: 10 }, { name: "max", value: 10 }];
  }

  static buildBvnNumberRule() {
    return [{ name: "min", value: 11 }, { name: "max", value: 11 }];
  }

  static buildMobileNumberRule() {
    return [{ name: "min", value: 11 }, { name: "max", value: 11 }];
  }

  static buildOfficePhoneRule() {
    return [{ name: "min", value: 7 }, { name: "max", value: 10 }];
  }

  static buildDefaultRule() {
    return baseRule;
  }
}

const baseRule = [];
