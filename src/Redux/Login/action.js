export const LoginAction = (type, data = {}) => {
  return {
    type,
    payload: data,
  };
};

export const LogOutAction = (type = {}) => {
  return {
    type,
  };
};
