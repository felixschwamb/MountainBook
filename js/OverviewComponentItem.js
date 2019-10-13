import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const hike = "hike";
const ferrata = "ferrata";
const ski = "ski";

const OverviewComponentItem = props => (
	<View>
		<TouchableOpacity
			style={styles.tourContainer}
			onPress={() => props.onSelectTour(props)}
		>
			<View style={styles.tourImageContainer}>
				<Image
					source={props.photoSource[0]}
					style={{ width: 100, height: 100 }}
				/>
			</View>

			<View style={styles.tourTextContainer}>
				<View // Tour name
					style={styles.tourNameContainer}
				>
					<Text numberOfLines={1} style={styles.tourName}>
						{props.name}
					</Text>
				</View>

				<View // Tour type
					style={styles.filterOptions}
				>
					{props.tourType.indexOf(hike) > -1 && (
						<View style={styles.filterOptionsButton}>
							<Text style={styles.filterOptionsButtonText}>Hiking Tour</Text>
						</View>
					)}

					{props.tourType.indexOf(ferrata) > -1 && (
						<View style={styles.filterOptionsButton}>
							<Text style={styles.filterOptionsButtonText}>Via Ferrata</Text>
						</View>
					)}

					{props.tourType.indexOf(ski) > -1 && (
						<View style={styles.filterOptionsButton}>
							<Text style={styles.filterOptionsButtonText}>Ski Tour</Text>
						</View>
					)}
				</View>

				<View // Tour description
				>
					<Text numberOfLines={1} style={styles.tourDescription}>
						{props.description}
					</Text>
				</View>

				<View // Tour date
					style={styles.tourDateContainer}
				>
					<Text style={styles.tourDate}>{props.date}</Text>
				</View>
			</View>
		</TouchableOpacity>
	</View>
);

export default OverviewComponentItem;

const styles = StyleSheet.create({
	tourContainer: {
		flexDirection: "row",
		alignSelf: "center",
		width: "97%",
		// marginHorizontal: 5,
		marginTop: 5,
		padding: 5,
		backgroundColor: "white"
	},
	tourImageContainer: {
		marginRight: 5
	},
	tourTextContainer: {
		flex: 1,
		flexDirection: "column"
	},
	tourNameContainer: {
		marginBottom: 5,
		marginRight: 2.5
	},
	tourName: {
		alignSelf: "flex-start",
		fontSize: 18
	},
	tourDescription: {
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 5
	},
	tourDateContainer: {
		marginRight: 2.5,
		position: "absolute",
		bottom: 0,
		right: 0
	},
	tourDate: {
		alignSelf: "flex-end",
		fontSize: 14,
		color: "#bdbdbd"
	},
	image: {
		width: 100,
		height: 100
	},
	filterOptions: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "80%",
		marginBottom: 5
	},
	filterOptionsButton: {
		width: 70,
		height: 20,
		borderRadius: 15,
		backgroundColor: "#bdbdbd",
		marginRight: 5,
		justifyContent: "center"
	},
	filterOptionsButtonText: {
		alignSelf: "center",
		color: "white",
		// fontWeight: 'bold',
		fontSize: 11
	}
});
