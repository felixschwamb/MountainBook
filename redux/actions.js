// action types
export const UPDATE_TOUR = "UPDATE_TOUR";
export const REMOVE_TOUR = "REMOVE_TOUR";
export const EDIT_TOUR = "EDIT_TOUR";

export const addTour = newTour => ({
	type: UPDATE_TOUR,
	payload: newTour
});

export const removeTour = tourId => ({
	type: REMOVE_TOUR,
	payload: tourId
});

export const editTour = formState => ({
	type: EDIT_TOUR,
	id: formState.tourId,
	payload: formState
});
