import React from "react";
import { View, StyleSheet } from "react-native";

import EditTourComponentForm from "./EditTourComponentForm";

export default class EditTourComponent extends React.Component {
	static navigationOptions = {
		headerTitle: "Edit Tour",
		headerRight: <View />
	};

	returnToDetailScreen = tour => {
		//  tour = 'this.state' from 'EditTourComponentForm'
		this.props.navigation.navigate(
			//  routename:
			"TourDetails",
			//  object contains all parameters from edited state of 'EditTourComponentForm', so edited values are displayed when
			//  'Save' button is clicked and user returns to 'TourDetailScreen'
			{
				tour: {
					name: tour.name,
					latitude: tour.latitude,
					longitude: tour.longitude,
					description: tour.description,
					photoSource: tour.photoSource,
					date: tour.date,
					tourType: tour.tourType
				}
			}
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<EditTourComponentForm
					tourId={this.props.navigation.getParam("tourId")}
					name={this.props.navigation.getParam("name")}
					latitude={this.props.navigation.getParam("latitude")}
					longitude={this.props.navigation.getParam("longitude")}
					description={this.props.navigation.getParam("description")}
					photoSource={this.props.navigation.getParam("photoSource")}
					date={this.props.navigation.getParam("date")}
					tourType={this.props.navigation.getParam("tourType")}
					// editTour={this.props.navigation.getParam('editTour')}
					returnToDetailScreen={this.returnToDetailScreen}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		justifyContent: "flex-start"
	}
});
