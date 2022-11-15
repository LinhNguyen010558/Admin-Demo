export const saveFormAction = (type, data = {}) => {
  return {
    type,
    payload: data,
  };
};

export const clearFormAction = (type = {}) => {
  return {
    type,
  };
};
