export const ADD_TASK_REQUESTED = (text) => {
    return {
        type: 'ADD_TASK_REQUESTED',
        text: text
    }
};

export const ADD_TASK_SUCCEEDED = () => {
    return {
        type: 'ADD_TASK_SUCCEEDED'
    }
};

export const ADD_TASK_FAILED = () => {
    return {
        type: 'ADD_TASK_FAILED'
    }
};

export const DELETE_TASK_REQUESTED = (id) => {
    console.log(id)
    return {
        type: 'DELETE_TASK_REQUESTED',
        id: id
    }
};

export const DELETE_TASK_SUCCEEDED = () => {
    return {
        type: 'DELETE_TASK_SUCCEEDED',
    }
};

export const DELETE_TASK_FAILED = () => {
    return {
        type: 'DELETE_TASK_FAILED',
    }
};

export const FETCH_TASK_REQUESTED = () => {
    return {
        type: 'FETCH_TASK_REQUESTED',
    }
};

export const FETCH_TASK_SUCCEEDED = (data) => {
    return {
        type: 'FETCH_TASK_SUCCEEDED',
        data: data
    }
};

export const FETCH_TASK_FAILED = (data) => {
    return {
        type: 'FETCH_TASK_FAILED',
        data: data
    }
};

export const POST_TASK_REQUESTED =() => {
    return {
        type: 'POST_TASK_REQUESTED'
    }
};

export const POST_TASK_SUCCEEDED = () => {
    return {
        type: 'POST_TASK_SUCCEEDED',
    }
};

export const POST_TASK_FAILED = () => {
    return {
        type: 'POST_TASK_FAILED',
    }
};

export const SET_TASK_ACTIVE = (id) => {
    return {
        type: 'SET_TASK_ACTIVE',
        id: id
    }
};

export const CHANGE_TASK_TITLE = (id, values) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        id: id,
        title: values.title
    }
};

export const CHANGE_TASK_CONTENT = (id, values) => {
    return {
        type: 'CHANGE_TASK_CONTENT',
        id: id,
        content: values.content
    }
};

export const CHANGE_TASK_SUBTASKS = (id, values) => {
    				console.log(values)
    return {
        type: 'CHANGE_TASK_SUBTASKS',
        id: id,
        subtasks: [...values.subtasks]
    }
};

export const CHANGE_TASK_DEADLINE = (id, values) => {
    return {
        type: 'CHANGE_TASK_DEADLINE',
        id: id,
        deadline: Date.parse(values.deadline) / 1000 - 3600,
        hasDeadline: values.hasDeadline
    }
};

