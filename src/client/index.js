import axios from 'axios';
import Statics from '../Statics';

const MGMT_API_HOST = Statics.MGMT_API_HOST;
const PROJECT_API_HOST = Statics.PROJECT_API_HOST;

class MachinableClient {

    /* MANAGEMENT APIS */
    user() {
        var LOGIN = MGMT_API_HOST + "/users/sessions";
        var REGISTER = MGMT_API_HOST + "/users/register";
        var REFRESH = MGMT_API_HOST + "/users/refresh";

        return {
            login: function(username, password) {
                var encoded = window.btoa(username + ":" + password);
                var headers = {"Authorization": "Basic " + encoded};
                return axios.post(LOGIN, {}, {headers: headers});
            },

            register: function(username, password) {
                return axios.post(REGISTER, {username: username, password: password});
            },

            saveTokens: function(accessToken, refreshToken, sessionId) {
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                localStorage.setItem("session_id", sessionId);
            },

            refreshToken: function() {
                var headers = {"Authorization": "Bearer " + this.getRefreshToken()};
                return axios.post(REFRESH, {}, {headers: headers})
            },

            logout: function() {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("session_id");
            }
        }
    }

    /* PROJECT APIS */
    projectHost(projectSlug) {
        return PROJECT_API_HOST.replace("{project-slug}", projectSlug)
    }

    resources(projectSlug) {
        var GET_RESOURCES = this.projectHost(projectSlug) + "/resources/";

        return {
            data: function() {
                var GET_DATA = this.projectHost(projectSlug) + "/api/{resource}";
                return {
                    list: function(resourcePath, success, error) {
                        axios.get(GET_DATA.replace("{resource}", resourcePath), {})
                            .then(success)
                            .catch(error);
                    }
                }
            }, 

            list: function(success, error) {
                axios.get(GET_RESOURCES, {})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_RESOURCES, data, {})
                    .then(success)
                    .catch(error);
            }
        }
    }

    collections(projectSlug) {
        var GET_COLLECTIONS = this.projectHost(projectSlug) + "/collections/"

        return {
            data: function() {
                var GET_COLLECTION = this.projectHost(projectSlug) + "/collections/{name}"
        
                return {
                    list: function(name, success, error) {
                        axios.get(GET_COLLECTION.replace("{name}", name), {})
                            .then(success)
                            .catch(error);
                    }
                }
            }, 

            list: function(success, error) {
                axios.get(GET_COLLECTIONS, {})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_COLLECTIONS, data, {})
                    .then(success)
                    .catch(error);
            }
        }
    }

    sessions(projectSlug) {
        var GET_SESSIONS = this.projectHost(projectSlug) + "/sessions/"

        return {
            list: function(success, error) {
                axios.get(GET_SESSIONS, {})
                    .then(success)
                    .catch(error);
            }
        }
    }

    users(projectSlug) {
        var GET_USERS = this.projectHost(projectSlug) + "/users/"

        return {
            list: function(success, error) {
                axios.get(GET_USERS, {})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_USERS, data, {})
                    .then(success)
                    .catch(error);
            }
        }
    }

    tokens(projectSlug) {
        var GET_TOKENS = this.projectHost(projectSlug) + "/tokens/"

        return {
            list: function(success, error) {
                axios.get(GET_TOKENS, {})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_TOKENS, data, {})
                    .then(success)
                    .catch(error);
            }
        }
    }
}

export default new MachinableClient();