import axios from 'axios';
import Statics from '../Statics';

const API_HOST = Statics.API_HOST;

class MachinableClient {
    resources() {
        console.log(API_HOST);
        var GET_RESOURCES = API_HOST + "/resources/"

        return {
            data: function() {
                var GET_DATA = API_HOST + "/api/{resource}"
        
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

    collections() {
        var GET_COLLECTIONS = API_HOST + "/collections/"
        // var GET_COLLECTION = API_HOST + "/collections/{name}"

        return {
            data: function() {
                var GET_COLLECTION = API_HOST + "/collections/{name}"
        
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

    sessions() {
        var GET_SESSIONS = API_HOST + "/sessions/"

        return {
            list: function(success, error) {
                axios.get(GET_SESSIONS, {})
                    .then(success)
                    .catch(error);
            }
        }
    }

    users() {
        var GET_USERS = API_HOST + "/users/"

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

    tokens() {
        var GET_TOKENS = API_HOST + "/tokens/"

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