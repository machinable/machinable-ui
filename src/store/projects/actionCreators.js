import * as types from './actionTypes.js';

export function setCurrentProject(projectSlug) {
    const action = {
        type: types.SET_CURRENT_PROJECT,
        slug: projectSlug
    }
    return action;
}