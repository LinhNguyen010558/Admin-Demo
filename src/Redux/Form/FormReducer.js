import { ACTION } from "../../Assets/ActionType";

const initialState = {
  loadingPage: false,
  isHaveData: false,
  dataForm: undefined,
};

const FormDataReducer = (state = initialState, action) => {
  switch (action.type) {
    ///Save Data
    case ACTION.SAVE_DATA_FORM:
      return { ...state, loadingPage: true };
    case ACTION.SAVE_DATA_FORM_SUCCESS:
      return {
        ...state,
        dataForm: action.payload,
        isHaveData: true,
        loadingPage: false,
      };
    case ACTION.SAVE_DATA_FORM_FAIL:
      return { ...state, loadingPage: false };

    ///clear data
    case ACTION.CLEAR_DATA_FORM:
      return { ...state, loadingPage: true };
    case ACTION.CLEAR_DATA_FORM_SUCCESS:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export const selectFormData = (state) => state.forms;

export default FormDataReducer;
