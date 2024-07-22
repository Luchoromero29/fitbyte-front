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

export interface Plan {
    id: number,
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
    img: string,
    categoryId: number
}

export interface BodyPart { 
    id: number,
    name: string
}

export interface category {
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

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}