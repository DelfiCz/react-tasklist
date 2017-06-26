

var task00 = {
	title: "Koupit mleko",
	content: "",
	subtasks: [{title: "tsk0", done: false}, {title: "tsk1", done: false}],
	hasDeadline: false,
	deadline: 0
};

var task01 = {
	title: "Koupit syry",
	content: "",
	subtasks: [{title: "syr tsk0", done: false}],
	hasDeadline: false,
	deadline: 0
};


var initialState = {
	list: [task00, task01],
	active: 0,
	formSubtasks: [...task00.subtasks]
};


function formInitValues(state)	{


}

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
			//formInitValues(state);
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


			console.log(state)
			return {
				list: newList,
				active: state.active,
				formSubtasks: [...state.formSubtasks]
			};

		default:
			return state;
	}


}
