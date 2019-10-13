import React from "react";
import {
	Alert,
	Dimensions,
	FlatList,
	Image,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet
} from "react-native";
import { connect } from "react-redux";

import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { removeTour } from "../../redux/actions";

// export default class TourDetailScreen extends React.Component {
class TourDetailScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Tour Details",
			headerRight: (
				<View
					style={{
						flexDirection: "row",
						marginRight: 10
					}}
				>
					<TouchableOpacity
						style={{ marginRight: 10 }}
						onPress={navigation.getParam("handleEdit")}
					>
						<Feather name="edit-2" size={25} color="white" />
					</TouchableOpacity>

					<TouchableOpacity onPress={navigation.getParam("removeAlert")}>
						<MaterialIcons name="delete" size={28} color="white" />
					</TouchableOpacity>
				</View>
			)
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({
			handleEdit: this.handleEdit,
			removeAlert: this.removeAlert
		});
	}

	handleRemove = () => {
		const tour = this.props.navigation.getParam("tour");
		this.props.removeTour(tour.tourId);
		this.props.navigation.navigate("Overview");
	};

	removeAlert = () => {
		const tour = this.props.navigation.getParam("tour");

		Alert.alert(
			// `Delete ${this.props.navigation.getParam('name')}`,
			`Delete ${tour.name}`,

			"Do you want to delete this tour?",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Ok", onPress: () => this.handleRemove() }
			]
		);
	};

	handleEdit = () => {
		const tour = this.props.navigation.getParam("tour");

		this.props.navigation.navigate("EditTour", {
			tourId: tour.tourId,
			name: tour.name,
			latitude: tour.latitude,
			longitude: tour.longitude,
			description: tour.description,
			photoSource: tour.photoSource,
			date: tour.date,
			tourType: tour.tourType
		});
	};

	showOnMap = () => {
		const tour = this.props.navigation.getParam("tour");

		console.log("Show on map");
		const tourRegion = {
			latitude: parseFloat(tour.latitude),
			longitude: parseFloat(tour.longitude),

			latitudeDelta: 0.0922 * 5,
			longitudeDelta: 0.0421 * 5
		};
		console.log(tourRegion);
		const tourId = tour.tourId;
		this.props.navigation.navigate("Map", { tourRegion, tourId });
	};

	render() {
		const tour = this.props.navigation.getParam("tour");

		const hike = "hike";
		const ferrata = "ferrata";
		const ski = "ski";

		const nameText = (
			<View style={styles.tourNameAndTextContainer}>
				<View // Tour name
					style={styles.tourNameContainer}
				>
					<Text numberOfLines={1} style={styles.tourName}>
						{tour.name}
					</Text>
				</View>

				<View // Tour date
					style={styles.tourDateContainer}
				>
					<Text style={styles.tourDate}>{tour.date}</Text>
				</View>
			</View>
		);

		const tourPhotoMap = (
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				pagingEnabled={true}
				style={styles.photoScrollView}
				data={tour.photoSource}
				renderItem={({ item }) => (
					<View>
						<Image source={item} style={styles.image} />
						{nameText}
					</View>
				)}
				keyExtractor={item => item.uri}
			/>
		);

		return (
			<View style={styles.container}>
				<ScrollView>
					{tourPhotoMap}

					<View // Tour Type - Filter options
						style={styles.filterOptions}
					>
						{tour.tourType.indexOf(hike) > -1 && (
							<View style={styles.filterOptionsButton}>
								<Text style={styles.filterOptionsButtonText}>Hiking Tour</Text>
							</View>
						)}

						{tour.tourType.indexOf(ferrata) > -1 && (
							<View style={styles.filterOptionsButton}>
								<Text style={styles.filterOptionsButtonText}>Via Ferrata</Text>
							</View>
						)}

						{tour.tourType.indexOf(ski) > -1 && (
							<View style={styles.filterOptionsButton}>
								<Text style={styles.filterOptionsButtonText}>Ski Tour</Text>
							</View>
						)}
					</View>

					<View // Tour description
						style={styles.tourDescriptionContainer}
					>
						<Text
							// numberOfLines={2}
							style={styles.tourDescription}
						>
							{tour.description}
						</Text>
					</View>
				</ScrollView>

				<TouchableOpacity onPress={this.showOnMap} style={styles.addButton}>
					<Text style={styles.addButtonText}>Show on map</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		justifyContent: "flex-start"
	},
	photoScrollView: {
		marginBottom: 5
		// borderWidth: 1,
	},
	image: {
		width: width,
		height: width
	},
	tourNameAndTextContainer: {
		position: "absolute",
		bottom: 10,
		left: 10
	},
	tourNameContainer: {
		marginTop: 10
	},
	tourName: {
		alignSelf: "flex-start",
		fontSize: 22,
		color: "white",
		fontWeight: "bold"
	},
	tourDateContainer: {
		//marginHorizontal: 10,
		// marginVertical: 5,
		// borderColor: 'black',
		// borderWidth: 1,
	},
	tourDate: {
		alignSelf: "flex-start",
		fontSize: 14,
		color: "#bdbdbd"
	},
	tourDescriptionContainer: {
		marginHorizontal: 10,
		marginVertical: 5
	},
	tourDescription: {
		fontSize: 14,
		lineHeight: 20
		// textAlign: 'center',
	},
	addButton: {
		height: 40,
		width: "97%",
		backgroundColor: "#7cb342",
		alignSelf: "center",
		margin: 10,
		padding: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold"
	},
	filterOptions: {
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%"
	},
	filterOptionsButton: {
		width: 90,
		height: 30,
		borderRadius: 15,
		backgroundColor: "#bdbdbd",
		margin: 5,
		marginHorizontal: 10,
		justifyContent: "center"
	},
	filterOptionsButtonText: {
		alignSelf: "center",
		color: "white",
		fontSize: 14
	},
	testContainer: {
		flexDirection: "row"
	},
	testImage: {
		height: 100,
		width: 100
	}
});

export default connect(
	null,
	{ removeTour: removeTour }
)(TourDetailScreen);
