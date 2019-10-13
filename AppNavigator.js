import { createStackNavigator, createAppContainer } from "react-navigation";

import OverviewComponent from "./js/OverviewComponent";
import AddTourComponent from "./js/addTour/AddTourComponent";
import MapComponent from "./js/MapComponent";
import TourDetailScreen from "./js/tourDetails/TourDetailScreen";
import EditTourComponent from "./js/editTour/EditTourComponent";

const TourStack = createStackNavigator(
	{
		Overview: OverviewComponent,
		AddTour: AddTourComponent,
		TourDetails: TourDetailScreen,
		EditTour: EditTourComponent,
		Map: MapComponent
	},
	{
		initialRouteName: "Overview",
		defaultNavigationOptions: {
			headerStyle: { backgroundColor: "#7cb342" },
			headerTitleStyle: {
				textAlign: "center",
				flex: 1
			}
		}
	}
);

export default AppContainer = createAppContainer(TourStack);
