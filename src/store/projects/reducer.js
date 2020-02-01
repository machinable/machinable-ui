import * as types from './actionTypes.js'

// TODO: Deprecate project_slug
const initialState = {
	project_slug: undefined,
	project: {}
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case types.SET_CURRENT_PROJECT:
			return Object.assign({}, state, {
				project_slug: action.slug
			});
		case types.SET_PROJECT_OBJECT:
			return Object.assign({}, state, {
				project: action.project,
				project_slug: action.project.slug
			});
		default:
			return state;
	}
}

