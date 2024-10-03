import { Day, Focus } from './types.ts'

export interface User {
    id: number,
    rolId: number,
    name: string,
    lastname: string,
    birthdate: string,
    email: string,
    password: string,
    preferenceId: number,
    active: boolean
}

export interface CreateUser {
    name: string,
    lastname: string,
    birthdate: string,
    email: string,
    password: string,
    confirmPassword: string
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
    rest: number,
    postRest: number,
    note: string,
    routineId: number
}

export interface CreateActivity {
    name: string,
    focus: Focus,
    rest: number,
    postRest: number,
    note: string,
    exerciseId: number,
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

export interface PreferenceUser {
    id: number,
    unitWeight: string,
    language: string,
    theme: string,
    customMode: boolean,
    userId: number
}

export interface CreatePreferenceUser {
    unitWeight: string,
    language: string,
    theme: string,
    userId: number
}

export interface ActivePlan {
    id: number,
    userId: number,
    planId: number
}

export interface Response {
    ok: boolean,
    status: number,
    body: unknown
}

export interface ResponseLogin {
    ok: boolean;
    status: number;
    body: AuthResponse; // Define el tipo correcto basado en tu respuesta de inicio de sesión // Define el tipo correcto basado en tu respuesta de inicio de sesión
}

export interface AuthResponse {
    token: string;
    data: DataResponse;
}

export interface DataResponse {
    exp: number; // La fecha de expiración del token en formato Unix timestamp
    iat: number; // La fecha de creación del token en formato Unix timestamp
    user: User; // Define el tipo correcto basado en tu modelo de usuario
}