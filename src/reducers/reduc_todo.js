

var initialState = ['Koupit mléko', 'Nakoupit sýry'];

export default function reduc_todo(state=initialState, action)	{

	switch (action.type)	{
		case 'ADD':
		return [...initialState, action.text];


		case 'REMOVE':
			var newState = [...state];
			newState.splice(action.id, 1);
			return newState;

    	default:
      		return state;

	}


}
