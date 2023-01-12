import { createStore, createTypedHooks, persist } from "easy-peasy";
import { IStoreModel } from "store/types";
import model from "./model";

// A s/o post talks about setting Immer setAutofreeze: false
// & window.requestIdleCallback: null to solve revoked proxy errors.

const store = createStore<IStoreModel>(
  persist(model, { storage: "localStorage", allow: ["securityStore"] }),
  { name: "BookItStore" } // disableImmer: true
);

// if (process.env.NODE_ENV === "development") {
//   if (module.hot) {
//     module.hot.accept("./model", () => {
//       store.reconfigure(model);
//     });
//   }
// }

const typedHooks = createTypedHooks<IStoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
