import { AuthActions, AuthState } from './types';
import { LOG_IN_ACTION_FAILURE, LOG_IN_ACTION_SUCCESS } from './actions/logIn';
import Keycloak, {KeycloakTokenParsed} from 'keycloak-js';

export const INITIAL_STATE: AuthState<KeycloakTokenParsed> = {
  token: null,
  role: 'public',
  isAuth: false,
  profile: {},
  loading: false,
  isPatient: false,
  isDoctor: false,
};

const AuthReducer = (state = INITIAL_STATE, { type, payload }: AuthActions<Keycloak>) => {
  switch (type) {
    case LOG_IN_ACTION_SUCCESS: {
      const roles = payload.tokenParsed?.realm_access?.roles;
      const isPatient = roles?.includes('ROLE_PATIENT') && !roles?.includes('ROLE_PRACTITIONER');
      const isDoctor = roles?.includes('ROLE_PRACTITIONER');
      return {
        ...state,
        ...{
          profile: payload.tokenParsed, 
          isPatient,
          isDoctor,
          token: payload.token,
          isAuth: true 
        } };
    }
    case LOG_IN_ACTION_FAILURE:
      return { ...INITIAL_STATE, isAuth: false };
    default:
      return state;
  }
};

export default AuthReducer;