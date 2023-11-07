import Home from '../pages/Home';
import UserDetail from '../pages/Account';
import * as paths from './paths';

const USER_ROLE = 'user';

const routes = [
  {
    title: 'Home',
    path: paths.HOME_PATH,
    Component: Home,
    exact: true,
    roles: [],
  },
  {
    title: 'User detail',
    path: paths.USER_DETAIL,
    Component: UserDetail,
    exact: true,
    roles: [],
  },
];

export default routes;
