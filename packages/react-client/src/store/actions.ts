// There is a WEIRD bug here where easy peasy wasn't actually updating because these functions were not in the same file as the reducer.

export const setModel =
  (initialState: any) =>
  (state: any = {}, payload: any = initialState) => {
    state = payload;
  };

export const update = (state: any, payload: any) => {
  const [key, val] = Object.entries(payload)[0];
  state[key] = val;
};

export const addToArray = (state: any, payload: any) => {
  const { key, ...data } = payload;
  state[key].push(data);
};

export const removeFromArray = (state: any, payload: any) => {
  const { key, index } = payload;
  state[key] = state[key].filter((item: any, idx: number) => idx !== index);
};

export const updateInArray = (state: any, payload: any) => {
  const { key, index, ...newValues } = payload;
  state[key][index] = Object.assign(state[key][index], newValues);
};
