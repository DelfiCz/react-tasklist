var initialState = {
	list: [],
	active: 0,
	formSubtasks: []
};


export default function reduc_todo(state = initialState, action) {

	switch (action.type) {

		case 'ADD_TASK_REQUESTED':
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

		case 'DELETE_TASK_REQUESTED':
			var newList = [...state.list];
			newList.splice(action.id, 1);
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		case 'SET_TASK_ACTIVE':
			var newList = [...state.list];
			return {
				list: newList,
				active: action.id,
				formSubtasks: [...newList[action.id].subtasks]
			};

		case 'CHANGE_TASK_TITLE':

			var newList = [...state.list];
			newList[action.id].title = action.title;
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};
		case 'CHANGE_TASK_CONTENT':
						
			var newList = [...state.list];
			newList[action.id].content = action.content;
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		case 'CHANGE_TASK_SUBTASKS':
			var newList = [...state.list];
			newList[action.id].subtasks = [...action.subtasks];
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};
		case 'CHANGE_TASK_DEADLINE':

			var newList = [...state.list];
			newList[action.id].deadline = action.deadline;
			newList[action.id].hasDeadline = action.hasDeadline;
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		case 'FETCH_TASK_REQUESTED':
			var emptyState = {
				list: [],
				active: 0,
				formSubtasks: []
			};
			return emptyState;

		case 'FETCH_TASK_SUCCEEDED':
			var newState = action.data;
			return newState;

		case 'POST_TASK_REQUESTED':
			return state;

		case 'POST_TASK_SUCCEEDED':
			return state;

		default:
			return state;
	}


}
