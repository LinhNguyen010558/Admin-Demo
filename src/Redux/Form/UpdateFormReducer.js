import { ACTION } from "../../Assets/ActionType";

const initialState = {
  loadingPage: false,
  isHaveData: false,
  dataForm: {
    userId: undefined,
  },
};

const FormUpdateDataReducer = (state = initialState, action) => {
  switch (action.type) {
    ///save data update form
    case ACTION.SAVE_UPDATE_FORM_DATA:
      return { ...state, loadingPage: true };
    case ACTION.SAVE_UPDATE_FORM_DATA_SUCCESS:
      return {
        ...state,
        isHaveData: true,
        loadingPage: false,
        dataForm: action.payload,
      };
    case ACTION.SAVE_UPDATE_FORM_DATA_FAIL:
      return { ...state, loadingPage: false };

    ///clear data update form
    case ACTION.CLEAR_UPDATE_DATA_FORM:
      return { ...state, loadingPage: true };
    case ACTION.CLEAR_UPDATE_DATA_FORM_SUCCESS:
      return { ...state, ...initialState };

    default:
      return state;
  }
};

export const selectFormUpdateData = (state) => state.formUpdate;

export default FormUpdateDataReducer;
