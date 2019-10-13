import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import AppContainer from "./AppNavigator";

// Color set:
// Main Color: '#7cb342'
//    Active Buttons, Title, Icons
// Background Color: '#f5f5f5'
// Inactive Button: '#bdbdbd'
// Tour type Label: '#bdbdbd'
// Border Color for TextInputs: 'gray'

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AppContainer />
				</PersistGate>
			</Provider>
		);
	}
}
