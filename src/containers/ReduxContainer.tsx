import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import Loader from '../components/layout/Loader';
import configureStore from '../redux/configureStore';

const { store } = configureStore();
const AppContainer = lazy(() => import('./AppContainer'));

/**
 * This is the main redux component, here we can add any providers and
 * necessary wrappers.
 */
 const ReduxContainer = () => (
  <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <AppContainer />
      </Suspense>
  </Provider>
);

export default ReduxContainer;