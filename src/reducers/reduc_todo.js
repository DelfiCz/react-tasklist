

var task00 = {
	title: "Postavit dum",
	content: "",
	subtasks: [{ title: "Nakoupit do baumaxu", done: false }, { title: "Zaplatit zedniky", done: false }],
	hasDeadline: false,
	deadline: ""
};

var task01 = {
	title: "Koupit nabytek",
	content: "",
	subtasks: [{ title: "Navstivit IKEA", done: false }],
	hasDeadline: false,
	deadline: ""
};


/* var initialState = {
	list: [task00, task01],
	active: 0,
	formSubtasks: [...task00.subtasks]
};

*/

var initialState = {
	list: [],
	active: 0,
	formSubtasks: []
};




//while (!executed);

export default function reduc_todo(state = initialState, action) {

	switch (action.type) {

		case 'ADD':
			var newTask = {
				title: action.text,
				content: "",
				subtasks: [],
				deadline: ""
			};
			return {
				list: [...state.list, newTask],
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		case 'REMOVE':
			var newList = [...state.list];
			newList.splice(action.id, 1);
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		case 'SET_ACTIVE':
			var newList = [...state.list];
			return {
				list: newList,
				active: action.id,
				formSubtasks: [...newList[action.id].subtasks]
			};

		case 'CHANGE_TITLE':

			var newList = [...state.list];
			newList[action.id].title = action.title;
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};
		case 'CHANGE_CONTENT':
			var newList = [...state.list];
			newList[action.id].content = action.content;
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		case 'CHANGE_SUBTASKS':
			console.log('sd')
			var newList = [...state.list];
			newList[action.id].subtasks = [...action.subtasks];
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};
		case 'CHANGE_DEADLINE':
			var newList = [...state.list];
			newList[action.id].deadline = action.deadline;
			newList[action.id].hasDeadline = action.hasDeadline;
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		case 'TASK_FETCH_REQUESTED':
			var emptyState = {
				list: [],
				active: 0,
				formSubtasks: []
			};
			return emptyState;

		case 'TASK_FETCH_SUCCEEDED':
			var newState = action.data;
			return newState;

		case 'TASK_POST_REQUESTED':
			return state;

		case 'TASK_POST_SUCCEEDED':
			return state;

		default:
			return state;
	}


}
