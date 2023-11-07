export interface AuthActions<T> {
	type: string;
	payload: T;
}
export interface AuthState<T> {
	loading: boolean;
	isAuth: boolean;
	isPatient: boolean;
	isDoctor: boolean;
    profile: T;
    token: string | null;
    role: string;
}
