import { Day, Focus }from './types.ts'

export interface User {
    id: number,
    rolId: number,
    name: string,
    lastname: string,
    birthdate: Date,
    email: string,
    password: string,
    weight: number,
    height: number,
    BMI: number,
    unit: string,
    active: boolean
}

export interface CreateUser {
    name: string,
    lastname: string,
    birthdate: string,
    email: string,
    password: string,
    weight: number,
    height: number,
    unit: string,
}

export interface Plan {
    id: number,
    name: string,
    description: string,
    userId: number
}

export interface CreatePlan {
    name: string,
    description: string,
    userId: number
}

export interface Routine {
    id: number,
    name: string,
    day: Day,   
    duration: number,
    planId: number
}

export interface CreateRoutine {
    name: string,
    day: Day,   
    planId: string
}

export interface Activity {
    id: number,
    name: string,
    focus: Focus,
    break: number,
    postBreak: number,
    note: string,
    routineId: number
}

export interface Exercise {
    id: number,
    name: string,
    description: string,
    urlImage: string,
    categoryId: number
}

export interface CreateExercise {
    name: string,
    description: string,
    image: File | null,
    categoryId: number
}

export interface BodyPart { 
    id: number,
    name: string
}

export interface Category {
    id: number,
    name: string
}

export interface Rol {
    id: number
    name: string
}

export interface Serie {
    id: number,
    weight: number,
    repetition: number
    unit: string
    activityId: number
}

export interface CreateSerie {
    weight: number,
    repetition: number
    unit: string
    activityId: number
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}

export interface ErrorDialogI {
    active: boolean,
    title: string,
    message: string | null
}