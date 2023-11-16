export const getToken = () => {
  return localStorage.getItem("token");
};
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem('isPageLoaded');
};
export const setToken = (val) => {
  localStorage.setItem("token", val);
};
