import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Callout, Marker } from "react-native-maps";

const MarkerComponent = props => (
	<Marker
		key={props.tourId}
		coordinate={{
			latitude: parseFloat(props.latitude),
			longitude: parseFloat(props.longitude)
		}}
		pinColor="#7cb342"
		ref={ref => (this[props.tourId] = ref)}
	>
		<Callout
			tooltip
			onPress={() => props.handleSelectCallout(props, this[props.tourId])}
		>
			<View style={styles.calloutContainer}>
				<Text style={styles.calloutTitle}>{props.name}</Text>
				<Text style={styles.calloutDescription}>See details</Text>
			</View>
		</Callout>
	</Marker>
);

export default MarkerComponent;

const styles = StyleSheet.create({
	calloutContainer: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 2,
		margin: 2,
		padding: 2,
		backgroundColor: "white"
	},
	calloutTitle: {
		fontWeight: "bold",
		alignSelf: "center"
	},
	calloutDescription: {
		fontSize: 12
	}
});
