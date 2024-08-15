// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan } from '../models';


const initialState: Plan = {
    id: 0,
    name: "",
    description: "",
    userId: 0,
};


const planSlice = createSlice({
    name: 'plan',
    initialState: initialState,
    reducers: {
        addPlan: (state, action: PayloadAction<Plan>) => {
            const { id, userId, name, description } = action.payload
            state.id = id
            state.userId = userId;
            state.name = name;
            state.description = description;
        }
    },
});

export const {addPlan } = planSlice.actions;
export default planSlice.reducer;
