// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PreferenceUser } from '../models';


const initialState: PreferenceUser = {
    id: 0,
    unitWeight: "",
    language: "",
    theme: "",
    userId: 0
};


const preferenceSlice = createSlice({
    name: 'preferenceUser',
    initialState: initialState,
    reducers: {
        addPreferenceUser: (state, action: PayloadAction<PreferenceUser>) => {
            const { id, userId, theme, language, unitWeight } = action.payload
            state.id = id
            state.userId = userId;
            state.theme = theme
            state.language = language
            state.unitWeight = unitWeight
        }
    },
});

export const {addPreferenceUser } = preferenceSlice.actions;
export default preferenceSlice.reducer;
