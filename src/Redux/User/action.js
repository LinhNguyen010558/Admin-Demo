export const UserAction = (type, data = {}) => {
  return {
    type,
    payload: data,
  };
};

export const ActionPagin = (type, data = {}) => {
  return {
    type,
    payload2: data,
  };
};

export const ActionType = (type = {}) => {
  return {
    type,
  };
};

export const getUser = (type, data = {}) => {
  return {
    type,
    payload3: data,
  };
};

export const addListUsers = (type, data = {}) => {
  return {
    type,
    payload4: data,
  };
};
