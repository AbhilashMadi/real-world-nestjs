const RegexPatterns = {
  PASSWORD_REGEX_PATTERN:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,20}$/,
  USERNAME_REGEX_PATTERN: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
};

export default RegexPatterns;
