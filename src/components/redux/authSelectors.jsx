export const getToken = (state) => state.auth.token;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getUserName = (state) => state.auth.user?.name;
export const getIsFetchingCurrentUser = (state) => state.auth.isFetchingCurrentUser;

export const getUserEmail = (state) => state.auth.user.email;

export const authSelectors = {
  getToken,
  getIsLoggedIn,
  getUserName,
  getUserEmail,
  getIsFetchingCurrentUser,
};


