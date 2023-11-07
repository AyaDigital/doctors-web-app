import Keycloak, {KeycloakTokenParsed as TokenParsed} from 'keycloak-js';
import { DispatchProp } from 'react-redux';
import { AnyAction, Action } from '@reduxjs/toolkit';
import { Moment } from 'moment';
import { type } from 'os';

declare global {
	interface MediaDevices {
		getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
	}

	interface HTMLMediaElement {
		setSinkId?(sinkId: string): Promise<undefined>;
	}

	// Helps create a union type with TwilioError
	interface Error {
		code: undefined;
	}
}

export type DispatchPropT = DispatchProp;

export type BaseInfoT = {
	firstName?: string,
	lastName?: string,
	middleName?: string,
	sex?: string,
	ssn?: string,
	birthDate?: string,
	weight?: string,
	height?: string,
	tin?: string
}

export type PatientT = {
	id?: number | null,
	name?: string | null,
	birthdate?: string | null
	photo?: string,
	phone?: string,
	sex?: string | null,
	firstName?: string,
	lastName?: string,
	insurancePolicies?: string,
	middlename?: string,
	appeal?: string
}

export type AvatarT = {
	fullUrl: string,
	shortUrl: string,
	contentType: string,
	originName: string
}

export type LocationT = {
	long: number,
	lat: number,
	alt?: null
}

export type AppealT = {
	id: number,
	name: string
}

export type DoctorT = {
	id: number,
	firstName: string,
	lastName: string
	middlename?: string | null,
	photo: string,
	city: string,
	address?: string,
	postalCode?: string,
	bio?: string,
	specialities: SpecialityT[],
	clinics: {id: number, name: string}[],
	location: LocationT,
	appeal?: number
}

export type GenderT = 'male' | 'female' | 'other' | 'unknown';

export type SpecialityT = {
	id: number,
	code: string,
	name: string,
	description?: string
}

export type MySpecialityT = {
	id: number,
	code: string,
	name: string,
	description: string
}

export type MedicalDegreeT = {
	id: number,
	code: string,
	name: string,
	description: string
}

export type ParticipantT = {
	id: number,
	firstname: string,
	lastname: string,
	photo: string | undefined
}

export type AppointmentT = {
	id: number,
	startDate: string,
	endDate: string,
	createdAt: string,
	minutesDurations: number,
	comment: string,
	status: string,
	type: string,
	slotId?: number,
	participant: ParticipantT
}

export type SelectedAttachmentT = {
	id: number,
	urlPath: string
}

export type CurrentInsuranceT = {
	fullUrl?: string,
	id?: number,
	number?: string
	organizationId?: number,
	organizationName?: string
};

export type NewAppointmentT = {
	appType: string,
	comment: string,
	createdAt: string,
	endDate: string,
	id: number,
	minutesDurations: number,
	priority: number,
	startDate: string,
	statusApp: string
}

export type SlotItemT = {
	id: number,
	startDate: string,
	endDate: string,
	overbooked: boolean,
	statusSlot: string,
	commentSlot: string,
	type: string,
	appointmentId: number,
}

export type SlotPeriodT = {
	startDate?: string,
	endDate?: string,
	id?: number
};

export type LanguageT = {
	id: number,
	code: string,
	name: string
}

export type SlotsRequestPayloadT = {
	id: number,
	startDate: string,
	endDate: string
}
export type SlotsCountRequestPayloadT = {
	id?: number,
	selectedMonth: Moment
}

export type SlotsCountItemT = {
	schedule_id: number,
	date: string,
	count_slots: number
}

export type ScheduleCreationT = {
	date: string,
	dayStart: string,
	dayEnd: string,
	zoneOffset?: string,
	slotDuration: number,
	active?: boolean,
	slotType: string,
	comment?: string
}

export type FullProfileT = {
	id?: number,
	email?: string,
	firstName?: string,
	lastName?: string,
	middleName?: string,
	jwtUserUuid?: string,
	sex?: GenderT,
	ssn?: string,
	driverLicense?: null | string,
	birthDate?: string,
	weight?: string,
	height?: string,
	tin?: string,
	appeal?: number,
	avatarUrl?: string,
	phone?: string
}

export type InsuranceCompanyT = {
    id: number,
    name: string
};

export type DictionaryT<T> = {
	scrollToken?: string,
    scrollTime?: string,
    sizeResult?: number,
    isLastPage?: boolean,
    totalResults?: number,
    data: T[]
}

export type LatLngT = {
	lat: number,
	lng: number
}

export type UploadFileT = {
	lastModified: string | number
	lastModifiedDate: Date,
	name: string,
	size: number,
	type: string,
	webkitRelativePath: string
}

export type EmergencyContactT = {
	fullName: string,
	phone: string,
	summary: string,
	typeId: number
}
export type EmergencyContactItemT = {
	id?: number,
	fullName: string,
	phone: string,
	summary: string,
	type: EmergencyTypeT
}

export type EmergencyTypeDataT = {
	scrollToken?: string | null,
	scrollTime?: string,
	sizeResult?: number,
	isLastPage?: boolean,
	totalResults?: number,
	data: EmergencyTypeT[]
}
export type EmergencyTypeT = {
	id: number,
	name: string
}

export type ActionWithAnyProp = Action<any>;

// export type KeyCloackAuthProps = (arg: typeof keycloak) => void | undefined;
export type KeyCloackAuthProps<T> = (arg: T) => Action<any> | DispatchProp<AnyAction> | undefined;
export type KeycloakTokenParsed = TokenParsed;
export type KeycloakInstanse = Keycloak;

