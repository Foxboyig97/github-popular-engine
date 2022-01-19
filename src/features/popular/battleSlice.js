

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { queryRepositoryAuthorDetails } from "../../api/modules/api";

const initialState = {
    AuthorInfo: {},
    Total: 0
};

export const asyncGetAuthor = createAsyncThunk(
    'author/getAuthor',
    async (params) => {
        let res = await queryRepositoryAuthorDetails(params)
        if (res.status == 422) {
            throw (res)
        } else {
            return res.data
        }
    }
)

export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {},
    extraReducers: {
        [asyncGetAuthor.fulfilled]: (state, { payload }) => {
            state.AuthorInfo = payload
        },
        [asyncGetAuthor.rejected]: (state) => {
            state.AuthorInfo = {}
        }
    }
})


export const { } = authorSlice.actions
export default authorSlice.reducer