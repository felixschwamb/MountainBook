import React from "react";
import { View } from "react-native";

import { connect } from "react-redux";

import MapView from "react-native-maps";

import MarkerComponent from "./MarkerComponent";

const initialRegion = {
	latitude: 47.268626,
	longitude: 11.403481,
	latitudeDelta: 0.0922 * 50,
	longitudeDelta: 0.0421 * 50
};

// export default class MapComponent extends React.Component {
class MapComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			region: initialRegion
		};
	}

	static navigationOptions = {
		title: "Map",
		headerRight: <View />
	};

	componentDidMount() {
		console.log("Maps did mount");
		const tourRegion = this.props.navigation.getParam("tourRegion");
		console.log(`Delivery from detail screen: ${tourRegion}`);

		const tourId = this.props.navigation.getParam("tourId");
		// const tourIdRef = this[tourId]

		if (!tourRegion) {
			this.setState({ region: initialRegion });
		} else {
			this.setState({ region: tourRegion });
			// this[tourId].showCallout()
		}
	}

	handleSelectCallout = (tour, marker) => {
		// this.props.navigation.push('TourDetails', tour)
		this.props.navigation.navigate("TourDetails", { tour });

		marker.hideCallout();
	};

	onClickItem = () => {
		console.log("Button on map pressed");
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<MapView style={{ flex: 1 }} region={this.state.region}>
					{this.props.tours.map(tour => (
						<MarkerComponent
							{...tour}
							key={tour.tourId}
							handleSelectCallout={this.handleSelectCallout}
						/>
					))}
				</MapView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	tours: state.tours
});

export default connect(mapStateToProps)(MapComponent);
