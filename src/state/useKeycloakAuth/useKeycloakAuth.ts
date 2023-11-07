import { useCallback, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import {KeyCloackAuthProps, KeycloakInstanse} from '../../types';

const keycloakConfig = {
	url: process.env.REACT_APP_KEYCLOAK_URL,
	realm: process.env.REACT_APP_KEYCLOAK_REALM || 'aya-realm',
	clientId: process.env.REACT_APP_KEYCLOAK_CLIENT || 'web-client'
};
const keycloak = new Keycloak(keycloakConfig);
type KeyKloakToken = typeof keycloak.token | undefined;

export default function useKeycloakAuth(loginSuccess: KeyCloackAuthProps<KeycloakInstanse> | undefined) {
	// TODO: review
	const [user, setUser] = useState<{ displayName?: undefined; photoURL?: undefined; passcode?: string; token?: KeyKloakToken } | null>(null);
	const [isAuthReady, setIsAuthReady] = useState(false);

	useEffect(() => {
		keycloak.updateToken(15)
		.then(function(refreshed) {
				if (refreshed) {
						console.log('Token was successfully refreshed');
				} else {
						console.log('Token is still valid');
				}
		}).catch(function() {
				console.log('Failed to refresh the token, or the session has expired');
		});
	}, []);

	useEffect(() => {
		keycloak.init({
			onLoad: 'login-required',
			scope: 'email'
		}).then(authenticated => {
			setIsAuthReady(true);
			if (authenticated) {
				if (loginSuccess) {
					loginSuccess(keycloak);
				}
				setUser({ token: keycloak.token as KeyKloakToken}); //TODO: review
			}
		}).catch(function() {
			console.log('Failed to authorized');
		});
		setIsAuthReady(true);
	}, []);

	const signIn = useCallback(() => {
		return keycloak.login();
	}, []);

	const signOut = useCallback(() => {
		setUser(null);
		if(keycloak) {
			return keycloak.logout(); //TODO: review
		} else {
			return new Promise(() => 1) as Awaited<any>;
		}
	}, []);

	return { user, signIn, signOut, isAuthReady };
}
