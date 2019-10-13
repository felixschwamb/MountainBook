import React from "react";
import {
	FlatList,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native";
import { connect } from "react-redux";

import OverviewComponentItem from "./OverviewComponentItem";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// export default class OverviewComponent extends React.Component {
class OverviewComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			filterSelected: [],
			toursSelected: []
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: "Tours",
			headerRight: (
				<View
					style={{
						marginRight: 10
					}}
				>
					<TouchableOpacity onPress={navigation.getParam("goToAdd")}>
						<MaterialIcons name="add" size={28} color="white" />
					</TouchableOpacity>
				</View>
			),
			headerLeft: <View />
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({
			goToAdd: this.goToAdd
		});
	}

	handleSelectTour = tour => {
		this.props.navigation.navigate("TourDetails", { tour });
	};

	goToAdd = () => {
		this.props.navigation.navigate("AddTour");
	};

	showMap = () => {
		this.props.navigation.navigate("Map");
	};

	onClickItem = () => {
		const toursSelected = this.props.tours.filter(item =>
			this.state.filterSelected.every(
				itemq => item.tourType.indexOf(itemq) !== -1
			)
		);
	};

	setFilter = filter => {
		const arrIndex = this.state.filterSelected.indexOf(filter);
		applyFilter = () => {
			this.state.filterSelected.sort();
			const toursSelected = this.props.tours.filter(item =>
				this.state.filterSelected.every(
					itemq => item.tourType.indexOf(itemq) !== -1
				)
			);
			console.log(this.props.tours);
			this.setState({ toursSelected: toursSelected }, () =>
				console.log(this.state.toursSelected)
			);

			// First option: filter needs to equal tourType exactly
			// const toursSelected = this.props.tours.filter(item => JSON.stringify(item.tourType) === JSON.stringify(this.state.filterSelected))

			// Second option: filter and tourType are made strings and filter-string needs to be included in tourType-string. This does not work for filter: 'ferrata, ski' and tourType: 'ferrata, hike, ski'. This does not show any tour even though the filter is contained
			// const toursSelected = this.props.tours.filter(item => (item.tourType).toString().includes(this.state.filterSelected.toString()))
		};

		if (arrIndex === -1) {
			this.setState(
				{ filterSelected: [...this.state.filterSelected, filter] },
				() => applyFilter()
			);
		} else {
			const newFilter = [...this.state.filterSelected];
			newFilter.splice(arrIndex, 1);
			this.setState({ filterSelected: newFilter }, () => applyFilter());
		}
	};

	render() {
		// Filter options
		const hike = "hike";
		const ferrata = "ferrata";
		const ski = "ski";

		// Filter options - Hike Filter
		let filterOptionHike;
		if (this.state.filterSelected.indexOf(hike) > -1) {
			filterOptionHike = (
				<TouchableOpacity
					// onPress={() => this.setFilter(hike)}
					onPress={() => this.setFilter(hike)}
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
					onPress={() => this.setFilter(hike)}
					style={styles.filterOptionsButton}
				>
					<Text style={styles.filterOptionsButtonText}>Hiking Tour</Text>
				</TouchableOpacity>
			);
		}

		// Filter options - Ferrata Filter
		let filterOptionFerrata;
		if (this.state.filterSelected.indexOf(ferrata) > -1) {
			filterOptionFerrata = (
				<TouchableOpacity
					onPress={() => this.setFilter(ferrata)}
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
					onPress={() => this.setFilter(ferrata)}
					style={styles.filterOptionsButton}
				>
					<Text style={styles.filterOptionsButtonText}>Via ferrata</Text>
				</TouchableOpacity>
			);
		}

		// Filter options - Ski Filter
		let filterOptionSki;
		if (this.state.filterSelected.indexOf(ski) > -1) {
			filterOptionSki = (
				<TouchableOpacity
					onPress={() => this.setFilter(ski)}
					style={styles.filterOptionsButtonSelected}
				>
					<Text style={styles.filterOptionsButtonTextSelected}>Ski Tour</Text>
				</TouchableOpacity>
			);
		} else {
			filterOptionSki = (
				<TouchableOpacity
					onPress={() => this.setFilter(ski)}
					style={styles.filterOptionsButton}
				>
					<Text style={styles.filterOptionsButtonText}>Ski Tour</Text>
				</TouchableOpacity>
			);
		}

		// Flatlist including filter options
		let filteredFlatlist;
		if (this.state.filterSelected.length === 0) {
			filteredFlatlist = (
				<FlatList
					style={styles.listContainer}
					data={this.props.tours}
					renderItem={({ item }) => (
						<OverviewComponentItem
							{...item}
							onSelectTour={this.handleSelectTour}
						/>
					)}
					keyExtractor={item => item.tourId}
				/>
			);
		} else {
			filteredFlatlist = (
				<FlatList
					style={styles.listContainer}
					data={this.state.toursSelected}
					renderItem={({ item }) => (
						<OverviewComponentItem
							{...item}
							onSelectTour={this.handleSelectTour}
						/>
					)}
					keyExtractor={item => item.tourId}
				/>
			);
		}

		return (
			<View style={styles.container}>
				<View style={styles.filterOptions}>
					{filterOptionHike}
					{filterOptionFerrata}
					{filterOptionSki}
				</View>

				{filteredFlatlist}

				<TouchableOpacity onPress={this.showMap} style={styles.addButtonValid}>
					<Text style={styles.addButtonText}>Show map</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		justifyContent: "flex-start"
	},
	filterOptions: {
		alignSelf: "center",
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
		marginVertical: 10,
		justifyContent: "center"
	},
	filterOptionsButtonText: {
		alignSelf: "center",
		color: "grey",
		// fontWeight: 'bold',
		fontSize: 14
	},
	filterOptionsButtonSelected: {
		width: 90,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#7cb342",
		backgroundColor: "#7cb342",
		marginVertical: 10,
		justifyContent: "center"
	},
	filterOptionsButtonTextSelected: {
		alignSelf: "center",
		// color: '#7cb342',
		color: "white",
		fontWeight: "bold",
		fontSize: 14
	},
	listContainer: {
		flex: 1
	},
	button: {
		alignSelf: "flex-end",
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#7cb342",
		justifyContent: "center",
		position: "absolute",
		bottom: 80,
		right: 20
	},
	buttonText: {
		alignSelf: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 32
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
	addButtonText: {
		color: "white",
		fontWeight: "bold"
	}
});

const mapStateToProps = state => ({
	tours: state.tours
});

export default connect(mapStateToProps)(OverviewComponent);
