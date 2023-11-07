import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import AppStateType from '../../redux/types';

type HomeProps = {
  isAuth: boolean
};

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div>{'Doctors web app'}</div>
      <NavLink to="/patients">Patients</NavLink>
    </div>
  );
};

const mapStateToProps  = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(Home);