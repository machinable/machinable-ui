import * as types from './actionTypes.js'

const initialState = {
    project_slug: undefined
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case types.SET_CURRENT_PROJECT:
			return Object.assign({}, state, {
				project_slug: action.slug
			});
		default:
			return state;
	}
}

