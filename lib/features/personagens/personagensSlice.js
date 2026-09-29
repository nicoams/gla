const { createSlice } = require("@reduxjs/toolkit");

const personagensSlice = createSlice({
  name: "personagens",
  initialState: {},
  reducers: {
    showPersonagens: {},
  },
});

const { actions, reducer } = personagensSlice;

export const { showPersonagens } = actions;

export default reducer;
