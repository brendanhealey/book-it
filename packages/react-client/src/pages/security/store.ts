import { Action, action } from "easy-peasy";

export interface ISecurityStoreModelType {
  accessToken: string | undefined | null;
  setAccessToken: Action<ISecurityStoreModelType, string | undefined | null>;
  isLoggedIn: boolean;
  setIsLoggedIn: Action<ISecurityStoreModelType, boolean>;
}

export const store: ISecurityStoreModelType = {
  accessToken: undefined,
  setAccessToken: action((state, payload) => {
    state.accessToken = payload;
  }),
  isLoggedIn: false,
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
};

export default store;
