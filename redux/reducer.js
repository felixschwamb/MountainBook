import { combineReducers } from "redux";

import { UPDATE_TOUR, REMOVE_TOUR, EDIT_TOUR } from "./actions";

const tourReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_TOUR:
			return [action.payload, ...state];
		case REMOVE_TOUR:
			return state.filter(item => item.tourId !== action.payload);
		case EDIT_TOUR:
			const toursIndex = state.findIndex(item => item.tourId === action.id);

			return state.map((item, index) => {
				if (index !== toursIndex) {
					// This is not the item, can be kept as it
					return item;
				}

				// This is the item, return an updated value
				return {
					...item,
					...action.payload
				};
			});
		default:
			return state;
	}
};

const reducer = combineReducers({
	tours: tourReducer
});

export default reducer;
