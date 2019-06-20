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

    getSession() {
        return localStorage.getItem("session_id")
    }

    getUserID() {
        return localStorage.getItem("user_id")
    }

    setAccessToken(token) {
        localStorage.setItem("access_token", token);
    }

    /* MANAGEMENT APIS */
    user() {
        var USER = MGMT_API_HOST + "/users/";
        var LOGIN = MGMT_API_HOST + "/users/sessions";
        var REGISTER = MGMT_API_HOST + "/users/register";
        var REFRESH = MGMT_API_HOST + "/users/refresh";
        var DELETE_SESSION = MGMT_API_HOST + "/users/sessions/{sid}";
        var authHeaders = this.getAuthHeaders();
        var refreshHeaders = {"Authorization": "Bearer " + this.getRefreshToken()}

        return {
            get: function(success, error) {
                axios.get(USER, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            login: function(username, password) {
                var encoded = window.btoa(username + ":" + password);
                var headers = {"Authorization": "Basic " + encoded};
                return axios.post(LOGIN, {}, {headers: headers});
            },

            register: function(username, password, recaptcha) {
                return axios.post(REGISTER, {username: username, password: password, recaptcha: recaptcha});
            },

            saveTokens: function(accessToken, refreshToken, sessionId) {
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                localStorage.setItem("session_id", sessionId);
                localStorage.setItem("user_id", sessionId);
            },

            refreshToken: function() {
                return axios.post(REFRESH, {}, {headers: refreshHeaders})
            },

            logout: function(success, error) {
                this.deleteCurrentSession(function(){
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("session_id");
                    localStorage.removeItem("user_id");
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

    userSessions() {
        console.log(MGMT_API_HOST);
        var GET_SESSIONS = MGMT_API_HOST + "/users/sessions";
        var DELETE_SESSION = MGMT_API_HOST + "/users/sessions/{id}";
        var GET_SESSION = MGMT_API_HOST + "/users/sessions/{id}";
        var authHeaders = this.getAuthHeaders();

        return {
            list: function(success, error) {
                axios.get(GET_SESSIONS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            get: function(id, success, error) {
                axios.get(GET_SESSION.replace("{id}", id), {headers: authHeaders})
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

    projects() {
        var GET_PROJECTS = MGMT_API_HOST + "/projects/";
        var UPDATE_PROJECT =  MGMT_API_HOST + "/projects/{id}";
        var DELETE_PROJECT =  MGMT_API_HOST + "/projects/{slug}";
        var authHeaders = this.getAuthHeaders();

        return {
            create: function(data, success, error) {
                axios.post(GET_PROJECTS, data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            update: function(data, success, error) {
                axios.put(UPDATE_PROJECT.replace("{id}", data.slug), data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            list: function(success, error) {
                axios.get(GET_PROJECTS, {headers: authHeaders})
                .then(success)
                .catch(error);
            },

            delete: function(slug, success, error) {
                axios.delete(DELETE_PROJECT.replace("{slug}", slug), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },
        }
    }

    /* PROJECT APIS */
    projectHost(projectSlug) {
        return PROJECT_API_HOST.replace("{project-slug}", projectSlug)
    }

    resources(projectSlug) {
        var GET_RESOURCES = this.projectHost(projectSlug) + "/resources/";
        var GET_RESOURCE = this.projectHost(projectSlug) + "/resources/{id}";
        var UPDATE_RESOURCE = this.projectHost(projectSlug) + "/resources/{id}";
        var GET_DATA = this.projectHost(projectSlug) + "/mgmt/api/{resource}";
        var GET_RESOURCE_USAGE = this.projectHost(projectSlug) + "/mgmt/resourceUsage/";
        var GET_RESOURCE_STATS = this.projectHost(projectSlug) + "/mgmt/resourceUsage/stats";
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

            update: function(id, data, success, error) {
                axios.put(UPDATE_RESOURCE.replace("{id}", id), data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            delete: function(id, success, error) {
                axios.delete(GET_RESOURCE.replace("{id}", id), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            stats: function(success, error) {
                axios.get(GET_RESOURCE_STATS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            usage: function(success, error) {
                axios.get(GET_RESOURCE_USAGE, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }

    collections(projectSlug) {
        var GET_COLLECTIONS = this.projectHost(projectSlug) + "/mgmt/collections/"
        var GET_COLLECTION = this.projectHost(projectSlug) + "/mgmt/collections/{name}";
        var GET_COLLECTION_USAGE = this.projectHost(projectSlug) + "/mgmt/collectionUsage/";
        var GET_COLLECTION_STATS = this.projectHost(projectSlug) + "/mgmt/collectionUsage/stats";
        var DELETE_COLLECTION = this.projectHost(projectSlug) + "/mgmt/collections/{id}";
        var UPDATE_COLLECTION = this.projectHost(projectSlug) + "/mgmt/collections/{id}";
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

            update: function(id, data, success, error) {
                axios.put(UPDATE_COLLECTION.replace("{id}", id), data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            stats: function(success, error) {
                axios.get(GET_COLLECTION_STATS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            usage: function(success, error) {
                axios.get(GET_COLLECTION_USAGE, {headers: authHeaders})
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
        var GET_USERS = this.projectHost(projectSlug) + "/mgmt/users/";
        var DELETE_USER = this.projectHost(projectSlug) + "/mgmt/users/{id}";
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
            },

            delete: function(id, success, error) {
                axios.delete(DELETE_USER.replace("{id}", id), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            update: function(user, success, error){
                axios.put(DELETE_USER.replace("{id}", user.id), user,{headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }

    keys(projectSlug) {
        var GET_APIKEYS = this.projectHost(projectSlug) + "/keys/";
        var GENERATE_KEY = this.projectHost(projectSlug) + "/keys/generate";
        var DELETE_KEY = this.projectHost(projectSlug) + "/keys/{id}";
        var UPDATE_KEY = this.projectHost(projectSlug) + "/keys/{id}";
        var authHeaders = this.getAuthHeaders();

        return {
            list: function(success, error) {
                axios.get(GET_APIKEYS, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            generate: function(success, error) {
                axios.get(GENERATE_KEY, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            create: function(data, success, error) {
                axios.post(GET_APIKEYS, data, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            delete: function(id, success, error) {
                axios.delete(DELETE_KEY.replace("{id}", id), {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            update: function(key, success, error) {
                axios.put(UPDATE_KEY.replace("{id}", key.id), key, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }

    logs(projectSlug) {
        var GET_LOGS = this.projectHost(projectSlug) + "/logs/?_sort=-created";
        var authHeaders = this.getAuthHeaders();

        return {
            list: function(filters, success, error) {
                var f = "";
                if(filters.length > 0) {
                    f = "&" + filters.join("&");
                }
                axios.get(GET_LOGS + f, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            },

            listLink: function(link, success, error) {
                axios.get(link, {headers: authHeaders})
                    .then(success)
                    .catch(error);
            }
        }
    }
}

export default new MachinableClient();