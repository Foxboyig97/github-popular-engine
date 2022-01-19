import { createSlice } from "@reduxjs/toolkit";
import { asyncGetAuthor } from "../popular/battleSlice";
import { asyncGetPopularList } from "../popular/popularSlice";

const initialState = {
    loading: false,
    err: {}
};

export const appSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    },

    extraReducers: {
        [asyncGetPopularList.pending]: (state) => {
            state.loading = true
        },
        [asyncGetPopularList.fulfilled]: (state) => {
            state.loading = false
        },
        [asyncGetPopularList.rejected]: (state) => {
            state.loading = false
        },
        [asyncGetAuthor.pending]: (state) => {
            state.loading = true
        },
        [asyncGetAuthor.fulfilled]: (state) => {
            state.loading = false
        },
        [asyncGetAuthor.rejected]: (state) => {
            state.loading = false
        }

    }
})


export const { hideLoading, showLoading } = appSlice.actions
export default appSlice.reducer