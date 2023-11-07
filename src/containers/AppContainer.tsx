import React from 'react';
import { DispatchProp, connect } from 'react-redux';
import AppStateProvider from '../state';
import AppStateType from '../redux/types';
import {BrowserRouter as Router} from 'react-router-dom';
import RoutesContainer from './RoutesContainer';
import {logInActionSuccess} from '../redux/modules/auth/actions/logIn.js'
import { Dispatch } from '@reduxjs/toolkit';
import {KeycloakInstanse} from '../types';

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppContainerType = {
	roles?: string[],
	isAuth?: boolean
} & DispatchProps;
/**
 * This is the main entry app component. Here we wll define the actual app layout
 * and locale provider
 *
 */
const AppContainer: React.FC<AppContainerType> = ({
	roles,
	isAuth,
	loginSucceded
}) => {
	return (
		<>
			<Router>
				<AppStateProvider loginSuccess={loginSucceded}>
					<RoutesContainer roles={roles} isAuth={isAuth} />
				</AppStateProvider>
			</Router>
		</>
	);
};

const mapStateToProps = (state: AppStateType) => ({
	roles: state.auth.profile?.realm_access?.roles,
	isAuth: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		loginSucceded: (data: KeycloakInstanse) => dispatch(logInActionSuccess(data))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
