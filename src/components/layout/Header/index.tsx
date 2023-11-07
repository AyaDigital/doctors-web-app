import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import upperfirst from 'lodash.upperfirst';
import Logo from '../../../images/logo';
// Temprorary avatar stubb
import DropDownIcon from '../../../images/Icons/dropdawnIcon';
import LogoutIcon from '../../../images/Icons/logoutIcon';
import ProfileIcon from '../../../images/Icons/profileIcon';
import { useAppState } from '../../../state';
import {FullProfileT} from '../../../types';
import AppStateType from '../../../redux/types';
import { setModalIsOpen } from '../../../redux/modules/patients/actions/patients';
import { getProfileByTokenRequest } from 'redux/modules/profile/actions/profile';
import { Dispatch } from '@reduxjs/toolkit';
import './header.scss';
import {  } from "react-router-dom";

type HeaderProps =  {
	loading?: boolean,
	isAuth: boolean,
	isPatient: boolean,
	isModalOpen: boolean,
	profile: FullProfileT,
	pathname: string | undefined,
	openModal?: (arg: boolean) => void,
	getProfile: () => void
};

const Header: React.FC<HeaderProps> = ({ profile = {}, isPatient, getProfile}) => {

	const { firstName, lastName, avatarUrl } = profile;

	const [isMenuBarOpen, setIsMenuOpen] = useState(false)
	const { signOut } = useAppState();

	const navigate = useNavigate();

	useEffect(() => {
		getProfile();
	}, [])

	useEffect(() => {
		const menubar = document.getElementById('dropdown');
		if (isMenuBarOpen) {
			menubar?.classList.add("open");
		} else {
			menubar?.classList.remove("open");
		}
	}, [isMenuBarOpen]);

	const userName = `${upperfirst(firstName)} ${upperfirst(lastName)}`;

	return (
			<div className='header-layout'>
				<div className='header'>
					<div className='logo'><Logo /></div>
					<div className='headerRight'>
						<div className='searchBlock'></div>
						<div className='notificationsBlock'></div>
						<div className='userBlock'>
							<a
								className={`userLink ${isMenuBarOpen ? 'open' : ''}`}
								onClick={() => setIsMenuOpen(!isMenuBarOpen)}
							>
								<div className='profile-avatar'>
									<img width='35px' height='35px' src={avatarUrl} alt='' />
								</div>
								<div className='userInfo'>
									<div className='userName'>
										{userName}
									</div>
									<div className='userRole'>
										{isPatient ? 'Patient' : 'Doctor'}
									</div>

								</div>
								<i className="fa custom-caret">
									<DropDownIcon />
								</i>
							</a>
							<div className="dropdown-menu" id="dropdown">
								<ul className="list-unstyled mb-2">
									<li className="divider"></li>
									<li>
										<a
											role="menuitem"
											onClick={() => {navigate('/account')}}
										>
											<i className="bx bx-user-circle">
												<ProfileIcon />
											</i>
											My Profile
										</a>
									</li>
									<li>
										<a
											role="menuitem"
											onClick={signOut}
										>
											<i className="bx bx-power-off">
												<LogoutIcon width='17' height='17' />
											</i>
											Logout
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>
	)
};
const mapStateToProps = (state: AppStateType) => ({
	loading: state.layout.loading,
	isAuth: state.auth.isAuth,
	isPatient: state.auth.isPatient,
	isModalOpen: state.patients.isModalOpen,
	profile: state.profile.fullProfile
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
	openModal: (data: boolean) => dispatch(setModalIsOpen(data)),
	getProfile: () => dispatch(getProfileByTokenRequest()),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);
