type Field =
  | "SIGN_IN_EMAIL"
  | "SIGN_IN_PASSWORD"
  | "SIGN_UP_EMAIL"
  | "SIGN_UP_PASSWORD"
  | "VERIFY_CODE";

type ActionType = Field | "RESET_STATE";

type Action = {
  type: ActionType;
  value?: string;
};

export const fieldsReducer = (state: FieldsState, action: Action) => {
  if (action.type === "RESET_STATE") {
    return fieldsState;
  }

  if (fieldsState[action.type] !== undefined) {
    return {
      ...state,
      [action.type]: action.value,
    };
  }

  throw new Error("Unexpected action!");
};

type FieldsState = Record<Field, string>;

export const fieldsState: FieldsState = {
  SIGN_IN_EMAIL: "",
  SIGN_IN_PASSWORD: "",
  SIGN_UP_EMAIL: "",
  SIGN_UP_PASSWORD: "",
  VERIFY_CODE: "",
};
