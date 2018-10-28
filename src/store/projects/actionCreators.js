import * as types from './actionTypes.js';

export function setCurrentProject(projectSlug) {
    const action = {
        type: types.SET_CURRENT_PROJECT,
        slug: projectSlug
    }
    return action;
}

export function setProjectObject(project) {
    const action = {
        type: types.SET_PROJECT_OBJECT,
        project: project
    }
    return action;
}