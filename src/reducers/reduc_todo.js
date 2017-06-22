

var task00 =	{
					title: "Koupit mleko",
					completed: false,
					active: true  


				}

var task01 =	{
					title: "Koupit syry",
					completed: false,
					active: false  


				}

var initialState = [task00, task01];

export default function reduc_todo(state=initialState, action)	{



	switch (action.type)	{
		case 'ADD':
			var newTask =	{
					title: action.text,
					completed: false,
					active: false  
				}
			return [...state, newTask];


		case 'REMOVE':
			var newState = [...state];
			newState.splice(action.id, 1);
			return newState;

		case 'SET_ACTIVE':
			var newState = [...state];
			var i=0
			for (i =0; i< newState.length; i++)	{
				newState[i].active = false;
			}

			newState[action.id].active = true;
    	default:
      		return state;

	}


}
