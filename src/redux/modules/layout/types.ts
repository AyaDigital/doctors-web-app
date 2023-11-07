export interface LayoutActions<T> {
	type: string;
	payload: T;
}
export interface LayoutState {
	loading: boolean;
	modalIsOpen: boolean;
}
