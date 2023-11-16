
import { setRole } from "./roleSlice";

export const changeRole = (newRole) => (dispatch) => {
  dispatch(setRole(newRole));
};
