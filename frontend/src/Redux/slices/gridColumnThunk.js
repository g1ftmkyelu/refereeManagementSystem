
import { setNumColumns } from './gridColumnSlice';

export const changeNumColumns = (newNumColumns) => (dispatch) => {
  dispatch(setNumColumns(newNumColumns));
};
