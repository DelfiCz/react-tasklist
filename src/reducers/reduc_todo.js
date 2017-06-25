

var task00 = {
	title: "Koupit mleko",
	completed: false,
};

var task01 = {
	title: "Koupit syry",
	completed: false,
};

var initialState = {
	list: [task00, task01],
	active: 0
};

export default function reduc_todo(state = initialState, action) {

	switch (action.type) {
		case 'ADD':
			var newTask = {
				title: action.text,
				completed: false,
			};
			return {
				list: [...state.list, newTask],
				active: state.active
			};

		case 'REMOVE':
			var newList = [...state.list];
			newList.splice(action.id, 1);
			return {
				list: newList,
				active: state.active
			};

		case 'SET_ACTIVE':
			var newState = [...state.list];
			return {
				list: newState,
				active: action.id
			};

		default:
			return state;
	}


}
