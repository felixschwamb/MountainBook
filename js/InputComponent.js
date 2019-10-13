import React from "react";
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	View,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class InputComponent extends React.Component {
	onClickItem = () => {
		console.log(`button pressed`);
		console.log(this.props.newTour.tourType);
	};

	removeAlert = photo => {
		Alert.alert("Remove photo", "Do you want to remove this photo?", [
			{ text: "Cancel", style: "cancel" },
			{ text: "Ok", onPress: () => this.props.removePhoto(photo) }
		]);
	};

	render() {
		const displayPhoto =
			this.props.newTour.photoSource.length > 0 ? (
				<ScrollView horizontal="true" style={styles.photoScrollView}>
					{this.props.newTour.photoSource.map(photo => (
						<TouchableOpacity
							key={photo.uri}
							onPress={this.removeAlert}
							onPress={() => this.removeAlert(photo.uri)}
						>
							<Image source={photo} style={styles.photo}></Image>
						</TouchableOpacity>
					))}
				</ScrollView>
			) : (
				<View />
			);

		const choosePhoto = (
			<TouchableOpacity // Button to choose a photo from library
				style={styles.cameraButton}
				onPress={this.props.launchImageLibrary}
			>
				<Feather
					name="folder"
					size={25}
					//color='#bdbdbd'
					color="#7cb342"
					style={styles.cameraIcon}
				/>
				<Text style={styles.cameraText}>Choose photo</Text>
			</TouchableOpacity>
		);

		const takePhoto = (
			<TouchableOpacity // Button to take a photo
				style={styles.cameraButton}
				onPress={this.props.launchCamera}
			>
				<Feather
					name="camera"
					size={25}
					color="#7cb342"
					style={styles.cameraIcon}
				/>
				<Text style={styles.cameraText}>Take photo</Text>
			</TouchableOpacity>
		);

		const photoArea =
			this.props.newTour.photoSource.length > 0 ? (
				<View style={styles.photoContainerTrue}>
					{displayPhoto}
					<View style={styles.photoIconContainer}>
						{choosePhoto}
						{takePhoto}
					</View>
				</View>
			) : (
				<View style={styles.photoContainerFalse}>
					<View style={styles.photoIconContainer}>
						{choosePhoto}
						{takePhoto}
					</View>
				</View>
			);

		const displayDate = this.props.newTour.date ? (
			<Text style={styles.dateText}>{this.props.newTour.date}</Text>
		) : (
			<Text style={styles.cameraText}>Choose date</Text>
		);

		const addTourButton = this.props.newTour.isFormValid ? (
			<TouchableOpacity
				onPress={this.props.handleSubmit}
				style={styles.addButtonValid}
				disabled={!this.props.newTour.isFormValid}
			>
				<Text style={styles.addButtonText}>{this.props.name}</Text>
			</TouchableOpacity>
		) : (
			<TouchableOpacity
				onPress={this.props.handleSubmit}
				style={styles.addButtonInvalid}
				disabled={!this.props.newTour.isFormValid}
			>
				<Text style={styles.addButtonText}>{this.props.name}</Text>
			</TouchableOpacity>
		);

		// Filter options
		const hike = "hike";
		const ferrata = "ferrata";
		const ski = "ski";

		// Filter options - Hike Filter
		let filterOptionHike;
		if (this.props.newTour.tourType.indexOf(hike) > -1) {
			filterOptionHike = (
				<TouchableOpacity
					onPress={() => this.props.setTourType(hike)}
					style={styles.filterOptionsButtonSelected}
				>
					<Text style={styles.filterOptionsButtonTextSelected}>
						Hiking Tour
					</Text>
				</TouchableOpacity>
			);
		} else {
			filterOptionHike = (
				<TouchableOpacity
					onPress={() => this.props.setTourType(hike)}
					style={styles.filterOptionsButton}
				>
					<Text style={styles.filterOptionsButtonText}>Hiking Tour</Text>
				</TouchableOpacity>
			);
		}

		// Filter options - Ferrata Filter
		let filterOptionFerrata;
		if (this.props.newTour.tourType.indexOf(ferrata) > -1) {
			filterOptionFerrata = (
				<TouchableOpacity
					onPress={() => this.props.setTourType(ferrata)}
					style={styles.filterOptionsButtonSelected}
				>
					<Text style={styles.filterOptionsButtonTextSelected}>
						Via ferrata
					</Text>
				</TouchableOpacity>
			);
		} else {
			filterOptionFerrata = (
				<TouchableOpacity
					onPress={() => this.props.setTourType(ferrata)}
					style={styles.filterOptionsButton}
				>
					<Text style={styles.filterOptionsButtonText}>Via ferrata</Text>
				</TouchableOpacity>
			);
		}

		// Filter options - Ski Filter
		let filterOptionSki;
		if (this.props.newTour.tourType.indexOf(ski) > -1) {
			filterOptionSki = (
				<TouchableOpacity
					onPress={() => this.props.setTourType(ski)}
					style={styles.filterOptionsButtonSelected}
				>
					<Text style={styles.filterOptionsButtonTextSelected}>Ski Tour</Text>
				</TouchableOpacity>
			);
		} else {
			filterOptionSki = (
				<TouchableOpacity
					onPress={() => this.props.setTourType(ski)}
					style={styles.filterOptionsButton}
				>
					<Text style={styles.filterOptionsButtonText}>Ski Tour</Text>
				</TouchableOpacity>
			);
		}

		return (
			<KeyboardAvoidingView
				style={styles.container}
				behavior={"height"}
				keyboardVerticalOffset={80}
			>
				<ScrollView style={styles.scrollViewContainer}>
					<View style={styles.viewContainer}>
						<View style={styles.filterOptions}>
							{filterOptionHike}
							{filterOptionFerrata}
							{filterOptionSki}
						</View>

						<TextInput
							style={styles.textInput}
							value={this.props.newTour.name}
							onChangeText={this.props.getHandler("name")}
							placeholder="Name of tour"
							maxLength={50}
						/>

						<View style={styles.twoItemsContainer}>
							<TextInput
								style={styles.textInputShort}
								value={this.props.newTour.latitude}
								onChangeText={this.props.getHandler("latitude")}
								placeholder="Latitude (xx.xxxx)"
								keyboardType="numeric"
								maxLength={9}
							/>

							<TextInput
								style={styles.textInputShort}
								value={this.props.newTour.longitude}
								onChangeText={this.props.getHandler("longitude")}
								placeholder="Longitude (xx.xxxx)"
								keyboardType="numeric"
								maxLength={9}
							/>
						</View>

						<TouchableOpacity // Button to get current location
							style={styles.dateButton}
							onPress={this.props.findPosition}
						>
							<MaterialIcons
								name="my-location"
								size={25}
								color="#7cb342"
								style={styles.cameraIcon}
							/>
							<Text style={styles.cameraText}>Find current position</Text>
						</TouchableOpacity>

						<TextInput
							style={styles.textInput}
							value={this.props.newTour.description}
							onChangeText={this.props.getHandler("description")}
							placeholder="Tour description (optional)"
							maxLength={1000}
						/>

						<TouchableOpacity // Button to choose date
							style={styles.dateButton}
							onPress={this.props.openUpPicker}
						>
							<Feather
								name="calendar"
								size={25}
								color="#7cb342"
								style={styles.cameraIcon}
							/>
							{displayDate}
						</TouchableOpacity>

						{photoArea}

						{addTourButton}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		justifyContent: "center"
	},
	scrollViewContainer: {
		// flex: 1,
		// // backgroundColor: '#f5f5f5',
		// justifyContent: 'flex-end',
		// // alignItems: 'center',
	},
	viewContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	filterOptions: {
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%"
	},
	filterOptionsButton: {
		width: 90,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "gray",
		marginVertical: 5,
		justifyContent: "center"
	},
	filterOptionsButtonText: {
		alignSelf: "center",
		color: "grey",
		fontSize: 14
	},
	filterOptionsButtonSelected: {
		width: 90,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#7cb342",
		backgroundColor: "#7cb342",
		marginVertical: 5,
		justifyContent: "center"
	},
	filterOptionsButtonTextSelected: {
		alignSelf: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 14
	},
	photoContainerTrue: {
		justifyContent: "flex-end",
		alignSelf: "center",
		width: "80%",
		margin: 5
	},
	photoContainerFalse: {
		justifyContent: "flex-end",
		alignSelf: "center",
		height: 40,
		width: 288,
		margin: 5
	},
	photo: {
		height: 75,
		width: 75,
		marginRight: 5
	},
	photoScrollView: {
		marginBottom: 5
	},
	photoIconContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignSelf: "center",
		height: 40,
		width: "100%"
	},
	textInput: {
		alignSelf: "center",
		height: 40,
		width: "80%",
		borderColor: "gray",
		borderWidth: 1,
		margin: 5,
		padding: 5,
		backgroundColor: "white"
	},
	textInputShort: {
		alignSelf: "center",
		height: 40,
		width: "48.5%",
		borderColor: "gray",
		borderWidth: 1,
		padding: 5,
		backgroundColor: "white"
	},
	addButtonValid: {
		height: 40,
		width: "97%",
		backgroundColor: "#7cb342",
		alignSelf: "center",
		margin: 5,
		padding: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	addButtonInvalid: {
		height: 40,
		width: "97%",
		backgroundColor: "#bdbdbd",
		alignSelf: "center",
		margin: 5,
		padding: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold"
	},
	twoItemsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignSelf: "center",
		height: 40,
		width: "80%",
		margin: 5
	},
	cameraButton: {
		width: "45%",
		margin: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	cameraIcon: {
		alignSelf: "center",
		marginRight: 2.5
	},
	cameraText: {
		alignSelf: "center",
		color: "#7cb342",
		marginLeft: 2.5
	},
	dateButton: {
		width: "80%",
		height: 40,
		margin: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignSelf: "center"
	},
	dateText: {
		alignSelf: "center",
		color: "black",
		marginLeft: 2.5
	}
});
