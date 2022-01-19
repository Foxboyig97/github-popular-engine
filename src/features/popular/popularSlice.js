import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopular } from "../../api/modules/api";

const initialState = {
    popularList: [],
    Total: 0
};


export const asyncGetPopularList = createAsyncThunk(
    'popular/getPopularList',
    async (params) => {
        let res = await getPopular(params)
        if (res.status == 200) {
            return res.data
        } else {
            throw (res)
        }
    }
)

export const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers: {
        clearPopularList: (state) => {
            state.popularList = []
        }
    },
    extraReducers: {
        [asyncGetPopularList.fulfilled]: (state, { payload }) => {
            state.popularList = [...new Set([...state.popularList, ...payload.items])]
            state.Total = payload.total_count
        },
        [asyncGetPopularList.rejected]: (state) => {
            state.popularList = []
        }
    }
})


export const { clearPopularList } = popularSlice.actions
export default popularSlice.reducer