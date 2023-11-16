
import { setId } from "./idSlice";

export const changeId = (newId) => (dispatch) => {
  dispatch(setId(newId));
};
