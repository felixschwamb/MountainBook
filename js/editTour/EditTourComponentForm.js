import React from "react";
import { Alert } from "react-native";

import { connect } from "react-redux";
import { editTour } from "../../redux/actions";

import { PermissionsAndroid } from "react-native";
import InputComponent from "../InputComponent";
import ImagePicker from "react-native-image-crop-picker";

async function requestLocationPermission() {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log("You can access the location");
		} else {
			console.log("Permission denied to access the location");
		}
	} catch (err) {
		console.warn(err);
	}
}

// export default class EditTourComponentForm extends React.Component {
class EditTourComponentForm extends React.Component {
	constructor(props) {
		super();
		this.state = {
			tourId: props.tourId,
			name: props.name,
			latitude: props.latitude,
			longitude: props.longitude,
			description: props.description,
			photoSource: props.photoSource,
			date: props.date,
			tourType: props.tourType,
			isFormValid: false,
			error: null
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.name !== prevState.name ||
			this.state.latitude !== prevState.latitude ||
			this.state.longitude !== prevState.longitude ||
			this.state.description !== prevState.description ||
			this.state.photoSource !== prevState.photoSource ||
			this.state.date !== prevState.date ||
			this.state.tourType !== prevState.tourType
		) {
			this.validateForm();
		}
	}

	getHandler = key => val => {
		this.setState({ [key]: val });
	};

	handleSubmit = () => {
		// formerly called 'handleEditSave', name changed wo it works with 'InputComponent'
		this.props.editTour(this.state);
		this.props.returnToDetailScreen(this.state);
	};

	// Launch Camera:
	launchCamera = () => {
		ImagePicker.openCamera({
			width: 1000,
			height: 1000,
			cropping: true,
			includeBase64: true
		})
			.then(image => {
				// console.log(image)
				const uri = `data:${image.mime};base64,${image.data}`;
				const source = { uri: uri };
				// console.log(source)
				applyFilter = () => {
					// console.log(this.state.photoSource)
				};
				this.setState(
					{ photoSource: [...this.state.photoSource, source] }
					// () => applyFilter()
				);
			})
			.catch(e => console.log(e));
	};

	// Launch Image Library:
	launchImageLibrary = () => {
		ImagePicker.openPicker({
			width: 1000,
			height: 1000,
			cropping: true,
			includeBase64: true
		})
			.then(image => {
				// console.log(image)
				const uri = `data:${image.mime};base64,${image.data}`;
				// console.log(uri)
				const source = { uri: uri };
				// console.log(source)
				applyFilter = () => {
					console.log(this.state.photoSource);
				};
				this.setState(
					{ photoSource: [...this.state.photoSource, source] }
					// () => applyFilter()
				);
			})
			.catch(e => console.log(e));
	};

	removePhoto = photo => {
		const removePhoto = this.state.photoSource.filter(
			item => item.uri !== photo
		);
		this.setState({ photoSource: removePhoto });
	};

	findPosition = () => {
		// Permission to access the GPS is requested (ACCESS_FINE_LOCATION), if permission is not granted yet there will be a popup in which permission can be given
		// Function is described outside of the the class 'AddTourComponentForm', but is called when user clicks on 'Find current location'
		requestLocationPermission();

		// Function to get the current location of the user
		// If GPS is not enabled there will be an alert ('No location provider available'), when GPS is enabled after showing the alert, the first try will return another alert (timeout), but the second try will succeed
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					latitude: position.coords.latitude.toString(),
					longitude: position.coords.longitude.toString(),
					error: null
				});
			},
			error => Alert.alert(error.message)
			// { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }  // When geo_options are included 'getCurrentPosition' does not work, just nothing happens when clicking the button
		);
	};

	setTourType = filter => {
		const arrIndex = this.state.tourType.indexOf(filter);
		applyTourType = () => {
			this.state.tourType.sort();
			console.log(`tourType: ${this.state.tourType}`);
		};
		if (arrIndex === -1) {
			this.setState({ tourType: [...this.state.tourType, filter] }, () =>
				applyTourType()
			);
		} else {
			const newTourType = [...this.state.tourType];
			newTourType.splice(arrIndex, 1);
			this.setState({ tourType: newTourType }, () => applyTourType());
		}
	};

	validateForm = () => {
		if (
			this.state.name.length >= 2 &&
			this.state.latitude.length >= 2 &&
			this.state.longitude.length >= 2 &&
			this.state.photoSource.length > 0 &&
			this.state.date !== null
		) {
			this.setState({ isFormValid: true });
		} else {
			this.setState({ isFormValid: false });
		}
	};

	render() {
		return (
			<InputComponent
				newTour={this.state}
				name={"Save"}
				launchImageLibrary={this.launchImageLibrary}
				launchCamera={this.launchCamera}
				handleSubmit={this.handleSubmit}
				setTourType={this.setTourType}
				getHandler={this.getHandler}
				findPosition={this.findPosition}
				openUpPicker={this.openUpPicker}
				removePhoto={this.removePhoto}
			/>
		);
	}
}

export default connect(
	null,
	{ editTour: editTour }
)(EditTourComponentForm);
