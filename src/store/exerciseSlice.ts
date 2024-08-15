// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '../models';



const initialState: Exercise = {
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
    urlImage: ""
};


const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: initialState,
    reducers: {
        setExercise: (state, action: PayloadAction<Exercise>) => {
            const { id, name, description, categoryId, urlImage } = action.payload
            state.id = id
            state.categoryId = categoryId;
            state.name = name;
            state.description = description;
            state.urlImage = urlImage
        }
    },
});

export const { setExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
