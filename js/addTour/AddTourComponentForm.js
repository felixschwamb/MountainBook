import React from "react";
import { Alert, DatePickerAndroid } from "react-native";

import { connect } from "react-redux";

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

const photoId = 0;

// export default class AddTourComponentForm extends React.Component {
class AddTourComponentForm extends React.Component {
	constructor() {
		super();
		this.state = {
			tourId: null,
			name: "",
			latitude: "",
			longitude: "",
			description: "",
			photoSource: [],
			date: null,
			tourType: [],
			isFormValid: false,
			error: null
		};
	}

	componentDidMount() {
		let maxId = 10;

		// find 'maxId' by iterating through 'tours' and always increasing 'maxId' when there is a tourId which is higher
		this.props.tours.map(tour => {
			if (tour.tourId > maxId) {
				maxId = tour.tourId;
			}
		});

		maxId++;
		console.log(`maxId: ${maxId}`);

		maxId = maxId.toString(); // 'maxId' needs to be a String
		this.setState({ tourId: maxId });
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.name !== prevState.name ||
			this.state.latitude !== prevState.latitude ||
			this.state.longitude !== prevState.longitude ||
			this.state.photoSource !== prevState.photoSource ||
			this.state.date !== prevState.date
		) {
			this.validateForm();
		}
	}

	getHandler = key => val => {
		this.setState({ [key]: val });
	};

	handleSubmit = () => {
		this.props.onSubmit(this.state);
		console.log(`TourType: ${this.state.tourType}`);
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

	openUpPicker = async () => {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date(),
				mode: "default"
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				const us_date = new Date(year, month, day).toLocaleDateString();
				const parts = us_date.split("/");
				const date = `${parts[1]}.${parts[0]}.${parts[2]}`;
				this.setState({ date });
				console.log(this.state.date);
			}
		} catch ({ code, message }) {
			console.warn("Cannot open date picker", message);
		}
	};

	findPosition = () => {
		// Permission to access the GPS is requested (ACCESS_FINE_LOCATION), if permission is not granted yet there will be a popup in which permission can be given
		// Function is described outside of the the class 'AddTourComponentForm', but is called when user clicks on 'Find current location'
		requestLocationPermission();

		// Function to get the current location of the user
		// If GPS is not enabled there will be an alert ('No location provider available'), when GPS is enabled after showing the alert, the first try will return another alert (timeout), but the second try will succeed

		navigator.geolocation.getCurrentPosition(
			// Geolocation.getCurrentPosition(
			position => {
				this.setState({
					latitude: position.coords.latitude.toString(),
					longitude: position.coords.longitude.toString(),
					error: null
				});
				//   console.log(`Location: ${position.coords.latitude}`)
				//   console.log(`Location: ${position.coords.longitude}`)
			},
			error => Alert.alert(error.message)
			// { enableHighAccuracy: false, maximumAge: 1000 }  // When geo_options are included 'getCurrentPosition' does not work, just nothing happens when clicking the button
			// { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }  // When geo_options are included 'getCurrentPosition' does not work, just nothing happens when clicking the button
		);
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

	// what to do:
	// state array: tourType
	// - check if this tour type is already in array:   const x = tourType.indexOf('hike') > -1
	// - it not, then add tour type to array:           tourType.push('hike') or tourType: [...this.state.tourType, filter]
	// - if yes, then remove tour type from array:      tourType.splice(indexOf item, 1)

	// to display button as selected/unselected:
	// - check if filter is part of tourType

	setTourType = filter => {
		const arrIndex = this.state.tourType.indexOf(filter);
		applyTourType = () => {
			this.state.tourType.sort();
			// console.log(`tourType: ${this.state.tourType}`)
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

	onClickItem = filter => {
		this.setState({ tourType: [...this.state.tourType, filter] });
	};

	render() {
		return (
			<InputComponent
				newTour={this.state}
				name={"Add tour"}
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

const mapStateToProps = state => ({
	tours: state.tours
});

export default connect(mapStateToProps)(AddTourComponentForm);
