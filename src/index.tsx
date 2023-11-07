import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ReduxContainer from './containers/ReduxContainer';

import theme from './theme';
import './types';

export const ReactApp = () => (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<ReduxContainer />
		</MuiThemeProvider>
);

ReactDOM.render(<ReactApp />, document.getElementById('root'));
