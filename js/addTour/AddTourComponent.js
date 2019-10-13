import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import AddTourComponentForm from "./AddTourComponentForm";

import { addTour } from "../../redux/actions";

// export default class AddTourComponent extends React.Component {
class AddTourComponent extends React.Component {
	static navigationOptions = {
		headerTitle: "Add Tour",
		headerRight: <View />
	};

	handleSubmit = formState => {
		// this.props.screenProps.addTour(formState);
		this.props.addTour(formState);
		this.props.navigation.navigate("Overview");
	};

	render() {
		return (
			<AddTourComponentForm
				onSubmit={this.handleSubmit}
				// tours={this.props.screenProps.tours}
			/>
		);
	}
}

export default connect(
	null,
	{ addTour: addTour }
)(AddTourComponent);
