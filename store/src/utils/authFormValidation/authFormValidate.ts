export enum validationErrorMessages {
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_WHITESPACE = 'Email must not contain whitespace',
  EMAIL_VALID = 'Email must be a valid address: user@example.com',
  EMAIL_DOMAIN_EXIST = 'Email must contain a domain name: @example.com',
  EMAIL_AT_SYMBOL = 'Email must contain an "@" symbol',
  PASSWORD_LENGTH = 'Password should have at least 8 characters',
  PASSWORD_UPPERCASE_LETTER = 'Password must contain at least 1 Latin uppercase letter',
  PASSWORD_LOWERCASE_LETTER = 'Password must contain at least 1 Latin lowercase letter',
  PASSWORD_DIGIT = 'Password must contain at least 1 digit',
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_WHITESPACE = 'Password must not contain whitespace',
}

export const emailValidationRules = {
  noSpace: (value: string) =>
    !/\s/.test(value) || validationErrorMessages.EMAIL_WHITESPACE,
  domainExisting: (value: string) =>
    !value.endsWith('@') || validationErrorMessages.EMAIL_DOMAIN_EXIST,
  atSymbolExisting: (value: string) =>
    value.includes('@') || validationErrorMessages.EMAIL_AT_SYMBOL,
  matchPattern: (value: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    validationErrorMessages.EMAIL_VALID,
};

export const passwordValidationRules = {
  noSpace: (value: string) =>
    !/\s/.test(value) || validationErrorMessages.PASSWORD_WHITESPACE,
  length: (value: string) =>
    value.length >= 8 || validationErrorMessages.PASSWORD_LENGTH,

  uppercaseLetter: (value: string) =>
    /[A-Z]/.test(value) || validationErrorMessages.PASSWORD_UPPERCASE_LETTER,

  lowercaseLetter: (value: string) =>
    /[a-z]/.test(value) || validationErrorMessages.PASSWORD_LOWERCASE_LETTER,

  // digitExisting: (value: string) =>
  //   /[0-9]/.test(value) || validationErrorMessages.PASSWORD_DIGIT,
};
