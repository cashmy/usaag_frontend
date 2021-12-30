import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import templateDataReducer from "../features/template/templateDataSlice";
import { apiTemplateHeaderSlice } from "../features/template/templateHeaderSlice";
import { apiTemplateDetailSlice } from "../features/template/templateDetailSlice";

export const store = configureStore({
  reducer: {
    templateData: templateDataReducer,
    [apiTemplateHeaderSlice.reducerPath]: apiTemplateHeaderSlice.reducer,
    [apiTemplateDetailSlice.reducerPath]: apiTemplateDetailSlice.reducer,
    // [apiCohortsSlice.reducerPath]: apiCohortsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiTemplateHeaderSlice.middleware)
      .concat(apiTemplateDetailSlice.middleware);
    // .concat(apiCohortsSlice.middleware);
  },
});

setupListeners(store.dispatch);
