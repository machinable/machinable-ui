import axios from 'axios';
import Statics from '../Statics';

const MGMT_API_HOST = Statics.MGMT_API_HOST;
const PROJECT_API_HOST = Statics.PROJECT_API_HOST;

class MachinableClient {
    /* helpers */
    getAuthHeaders(){
        return {"Authorization": "Bearer " + this.getAccessToken()}
    }

    getRefreshToken() {
        return localStorage.getItem("refresh_token")
    }

    getAccessToken() {
        return localStorage.getItem("access_token")
    }

    setAccessToken(token) {
        localStorage.setItem("access_token", token);
    }


    /* MANAGEMENT APIS */
    user() {
        var LOGIN = MGMT_API_HOST + "/users/sessions";
        var REGISTER = MGMT_API_HOST + "/users/register";
        var REFRESH = MGMT_API_HOST + "/users/refresh";
        var DELETE_SESSION = MGMT_API_HOST + "/users/sessions/{sid}";
        var authHeaders = this.getAuthHeaders();
        var refreshHeaders = {"Authorization": "Bearer " + this.getRefreshToken()}

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
                return axios.post(REFRESH, {}, {headers: refreshHeaders})
            },

            logout: function(success, error) {
                this.deleteCurrentSession(function(){
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("session_id");
                    success();
                }, error);
            },

            deleteCurrentSession: function(success, error) {
                var sid = localStorage.getItem("session_id");
                if (sid) {
                    var headers = authHeaders;
                    var URL = DELETE_SESSION.replace("{sid}", sid)
                    axios.delete(URL, {headers: headers}).then(success).catch(error);
                }
                success();
            }
        }
    }

    projects() {
        var GET_PROJECTS = MGMT_API_HOST + "/projects/";
        var authHeaders = this.getAuthHeaders();

        return {
            create: function(data, success, error) {
                axios.post(GET_PROJECTS, data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            list: function(success, error) {
                axios.get(GET_PROJECTS, {headers: authHeaders})
                .then(success)
                .catch(error);
            }
        }
    }

    /* PROJECT APIS */
    projectHost(projectSlug) {
        return PROJECT_API_HOST.replace("{project-slug}", projectSlug)
    }

    resources(projectSlug) {
        var GET_RESOURCES = this.projectHost(projectSlug) + "/resources/";
        var GET_RESOURCE = this.projectHost(projectSlug) + "/resources/{id}";
        var GET_DATA = this.projectHost(projectSlug) + "/mgmt/api/{resource}";
        var authHeaders = this.getAuthHeaders();

        return {
            data: function() {
                return {
                    list: function(resourcePath, success, error) {
                        axios.get(GET_DATA.replace("{resource}", resourcePath), {headers: authHeaders})
                            .then(success)
                            .catch(error);
                    }
                }
            }, 

            list: function(success, error) {
                axios.get(GET_RESOURCES, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_RESOURCES, data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            delete: function(id, success, error) {
                axios.delete(GET_RESOURCE.replace("{id}", id), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }

    collections(projectSlug) {
        var GET_COLLECTIONS = this.projectHost(projectSlug) + "/mgmt/collections/"
        var GET_COLLECTION = this.projectHost(projectSlug) + "/mgmt/collections/{name}";
        var GET_COLLECTION_STATS = this.projectHost(projectSlug) + "/stats/collections/{id}";
        var DELETE_COLLECTION = this.projectHost(projectSlug) + "/mgmt/collections/{id}";
        var authHeaders = this.getAuthHeaders();

        return {
            data: function() {
                return {
                    list: function(name, success, error) {
                        axios.get(GET_COLLECTION.replace("{name}", name), {headers: authHeaders})
                            .then(success)
                            .catch(error);
                    }
                }
            }, 

            list: function(success, error) {
                axios.get(GET_COLLECTIONS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_COLLECTIONS, data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            delete: function(id, success, error) {
                axios.delete(DELETE_COLLECTION.replace("{id}", id), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            stats: function(id, success, error) {
                axios.get(GET_COLLECTION_STATS.replace("{id}", id), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }

    sessions(projectSlug) {
        var GET_SESSIONS = this.projectHost(projectSlug) + "/mgmt/sessions/";
        var DELETE_SESSION = this.projectHost(projectSlug) + "/mgmt/sessions/{id}";
        var authHeaders = this.getAuthHeaders();

        return {
            list: function(success, error) {
                axios.get(GET_SESSIONS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            delete: function(id, success, error) {
                axios.delete(DELETE_SESSION.replace("{id}", id), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }

    users(projectSlug) {
        var GET_USERS = this.projectHost(projectSlug) + "/users/";
        var authHeaders = this.getAuthHeaders();

        return {
            list: function(success, error) {
                axios.get(GET_USERS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_USERS, data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }

    tokens(projectSlug) {
        var GET_TOKENS = this.projectHost(projectSlug) + "/tokens/";
        var authHeaders = this.getAuthHeaders();

        return {
            list: function(success, error) {
                axios.get(GET_TOKENS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_TOKENS, data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }
}

export default new MachinableClient();