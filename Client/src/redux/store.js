import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loadersSlice";
import { userSlice } from "./usersSlice";
const store=configureStore({
    reducer:{
        loaders:loaderSlice.reducer,
        users:userSlice.reducer
    }
})
export default store;