export const DEFAULT_ERROR = {
  success: false,
  code: '000',
  message: "Sorry something went wrong.",
};

export const ERROR_ON_SEND_DATA = {
  ...DEFAULT_ERROR,
  code: '001',
  message: "Error on try to send response.",
};

export const ERROR_ON_SAVE_DOCUMENT = {
  ...DEFAULT_ERROR,
  code: '002',
  message: "Error on try to save document.",
};

export const NO_CREDENTIALS_PROVIDED = {
  ...DEFAULT_ERROR,
  code: '003',
  message: "You need to provide an email and password.",
};

export const EMAIL_USER_NOT_FOUND = {
  ...DEFAULT_ERROR,
  code: '004',
  message: "User email not found.",
};

export const EMAIL_ALREADY_EXISTS = {
  ...DEFAULT_ERROR,
  code: '005',
  message: "The provided email already exists.",
};

export const ACCESS_DENIED = {
  ...DEFAULT_ERROR,
  code: '006',
  message: "Access denied. Token must be provided",
};

export const TOKEN_NOT_VALID = {
  ...DEFAULT_ERROR,
  code: '007',
  message: "Token not valid.",
};