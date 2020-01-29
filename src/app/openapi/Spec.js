import React, { Component } from 'react';
import { RedocStandalone } from 'redoc';
import Robot from '../../images/project/robot.svg';
import Header from '../../components/HomeHeader';

class Spec extends Component {

   componentDidMount = () => {

   }

   render() {
      return (
         <RedocStandalone
            spec={{
               "openapi": "3.0.0",
               "info": {
                  "title": "Sample Machinable Project API",
                  "contact": {
                     "name": "Machinable Support",
                     "url": "https://www.machinable.io/",
                     "email": "support@machinable.io"
                  },
                  "x-logo": {
                     "url": Robot,
                     "backgroundColor": "#fafafa",
                     "altText": "Test Project"
                  },
                  "description": ""
               },
               "servers": [
                  {
                     "url": "https://project.machinable.io",
                     "description": "Live Server"
                  }
               ],
               "tags": [
                  {
                     "name": "JWT Session",
                     "description": "User session with JWT"
                  },
                  {
                     "name": "People",
                     "description": "Test resource for people"
                  }
               ],
               "x-tagGroups": [
                  {
                     "name": "Security",
                     "tags": [
                        "JWT Session"
                     ]
                  },
                  {
                     "name": "API Resources",
                     "tags": [
                        "People"
                     ]
                  }
               ],
               "security": [
                  {
                     "ApiKey": []
                  },
                  {
                     "JWT": []
                  }
               ],
               "paths": {
                  "/sessions": {
                     "post": {
                        "tags": ["JWT Session"],
                        "summary": "Create new session",
                        "security": [
                           {
                              "BasicAuth": []
                           }
                        ],
                        "responses": {
                           "201": {
                              "description": "Session was created successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "type": "object",
                                       "properties": {
                                          "access_token": {
                                             "description": "Access token which is used to authenticate future requests. The `access_token` has an expiration of 5 minutes.",
                                             "type": "string"
                                          },
                                          "refresh_token": {
                                             "description": "Refresh token which is used to retrieve a new `access_token`.",
                                             "type": "string"
                                          },
                                          "session_id": {
                                             "description": "The `ID` of this session.",
                                             "type": "string"
                                          }
                                       },
                                    }
                                 }
                              }
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        },
                        "x-code-samples": [
                           {
                              "lang": "bash",
                              "source": "# base64 encode username|password to make HTTP Basic authn request\n$ echo \"testUser:hunter2\" | base64\ndGVzdFVzZXI6aHVudGVyMgo=\n\n# POST credentials to /sessions/ endpoint to recieve access token\n$ curl -X POST \\\n\thttps://pet-demo.machinable.io/sessions/ \\\n\t-H 'authorization: Basic dGVzdFVzZXI6aHVudGVyMg=='"
                           }
                        ]
                     }
                  },
                  "/sessions/{sessionId}": {
                     "delete": {
                        "tags": ["JWT Session"],
                        "summary": "Delete a session",
                        "security": [],
                        "responses": {
                           "204": {
                              "description": "Session was deleted successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "type": "object"
                                    }
                                 }
                              }
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        }
                     }
                  },
                  "/sessions/refresh": {
                     "post": {
                        "tags": ["JWT Session"],
                        "summary": "Refresh current session",
                        "security": [
                           {
                              "JWT": []
                           }
                        ],
                        "responses": {
                           "200": {
                              "description": "Session was refreshed successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "type": "object",
                                       "properties": {
                                          "access_token": {
                                             "description": "The new access token which is used to authenticate future requests. The `access_token` has an expiration of 5 minutes.",
                                             "type": "string"
                                          }
                                       },
                                    }
                                 }
                              }
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        },
                        "x-code-samples": [
                           {
                              "lang": "bash",
                              "source": "curl -X POST \\\n https://pet-demo.machinable.io/sessions/refresh/ \\\n -H 'authorization: Bearer {refresh_token}'"
                           }
                        ]
                     }
                  },
                  "/people/{peopleId}": {
                     "get": {
                        "tags": ["People"],
                        "summary": "Get People",
                        "operationId": "GetPeople",
                        "responses": {
                           "200": {
                              "description": "Resource retrieved successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "$ref": "#/components/schemas/People"
                                    }
                                 }
                              }
                           },
                           "400": {
                              "$ref": "#/components/responses/BadRequest"
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        }
                     },
                     "put": {
                        "tags": ["People"],
                        "summary": "Update People",
                        "operationId": "UpdatePeople",
                        "requestBody": {
                          "content": {
                            "application/json": {
                              "schema": {
                                "$ref": "#/components/schemas/People"
                              }
                            }
                          },
                          "description": "People resource",
                          "required": true
                        },
                        "responses": {
                           "200": {
                              "description": "Resource updated successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "$ref": "#/components/schemas/People"
                                    }
                                 }
                              }
                           },
                           "400": {
                              "$ref": "#/components/responses/BadRequest"
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        }
                     },
                     "delete": {
                        "tags": ["People"],
                        "summary": "Delete People",
                        "operationId": "DeletePeople",
                        "responses": {
                           "204": {
                              "description": "Resource deleted successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "type": "object"
                                    }
                                 }
                              }
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        }
                     },
                  },
                  "/people": {
                     "get": {
                        "tags": ["People"],
                        "summary": "List People",
                        "operationId": "ListPeople",
                        "parameters": [],
                        "security": [
                           {
                              "ApiKey": []
                           },
                           {
                              "JWT": []
                           }
                        ],
                        "responses": {
                           "200": {
                              "description": "A list was retrieved successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "$ref": "#/components/responses/PeopleList"
                                    }
                                 }
                              }
                           },
                           "400": {
                              "$ref": "#/components/responses/BadRequest"
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        }
                     },
                     "post": {
                        "tags": ["People"],
                        "summary": "Create People",
                        "operationId": "CreatePeople",
                        "parameters": [],
                        "security": [
                           {
                              "ApiKey": []
                           },
                           {
                              "JWT": []
                           }
                        ],
                        "requestBody": {
                          "content": {
                            "application/json": {
                              "schema": {
                                "$ref": "#/components/schemas/People"
                              }
                            }
                          },
                          "description": "People resource",
                          "required": true
                        },
                        "responses": {
                           "201": {
                              "description": "People created successfully",
                              "headers": {},
                              "content": {
                                 "application/json": {
                                    "schema": {
                                       "$ref": "#/components/schemas/People"
                                    }
                                 }
                              }
                           },
                           "400": {
                              "$ref": "#/components/responses/BadRequest"
                           },
                           "401": {
                              "$ref": "#/components/responses/UnauthorizedError"
                           },
                           "404": {
                              "$ref": "#/components/responses/NotFound"
                           }
                        }
                     }
                  }
               },
               "components": {
                  "schemas": {
                     "Error": {
                        "type": "object",
                        "properties": {
                           "error": {
                              "type": "string"
                           }
                        }
                     },
                     "People": {
                        "type": "object",
                        "properties": {
                           "age": {
                              "description": "The age of the person",
                              "maximum": 150,
                              "minimum": 0,
                              "type": "integer"
                           },
                           "birth_date": {
                              "description": "The birth date of the person",
                              "format": "date-time",
                              "type": "string"
                           },
                           "name": {
                              "description": "The name of the person.",
                              "maxLength": 36,
                              "minLength": 4,
                              "type": "string"
                           }
                        },
                        "required": [
                           "name"
                        ]
                     }
                  },
                  "responses": {
                     "NotFound": {
                        "description": "Resource was not found",
                        "content": {
                           "application/json": {
                              "schema": {
                                 "$ref": "#/components/schemas/Error"
                              }
                           }
                        }
                     },
                     "UnauthorizedError": {
                        "description": "API Key or JWT is missing or invalid",
                        "content": {
                           "application/json": {
                              "schema": {
                                 "$ref": "#/components/schemas/Error"
                              }
                           }
                        }
                     },
                     "BadRequest": {
                        "description": "Invalid parameters",
                        "content": {
                           "application/json": {
                              "schema": {
                                 "$ref": "#/components/schemas/Error"
                              }
                           }
                        }
                     },
                     "ServerError": {
                        "description": "Unknown server error occurred",
                        "content": {
                           "application/json": {
                              "schema": {
                                 "$ref": "#/components/schemas/Error"
                              }
                           }
                        }
                     },
                     "PeopleList": {
                        "type": "object",
                        "properties": {
                           "count": {
                              "description": "Total item count",
                              "type": "integer"
                           },
                           "links": {
                              "description": "Absolute pagination links",
                              "type": "object",
                              "properties": {
                                 "self": {
                                    "type": "string",
                                 },
                                 "next": {
                                    "type": "string",
                                 },
                                 "prev": {
                                    "type": "string",
                                 }
                              }
                           },
                           "items": {
                              "type": "array",
                              "items": {
                                 "$ref": "#/components/schemas/People"
                              }
                           }
                        }
                     }
                  },
                  "securitySchemes": {
                     "JWT": {
                        "description": "You can create a JSON Web Token (JWT) via our [JWT Session resource](#tag/JWT-Session).\nUsage format: `Bearer <JWT>`\n",
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                     },
                     "ApiKey": {
                        "description": "API Keys can be created from the [project dashboard](https://www.machinable.io/documentation/projects/access/#api-keys).\nUsage format: `apikey <API Key>`\n",
                        "name": "Authorization",
                        "type": "apiKey",
                        "in": "header"
                     },
                     "BasicAuth": {
                        "description": "Basic authentication is used to acquire a new JWT session.",
                        "type": "http",
                        "scheme": "basic"
                     }
                  }
               }
            }}
         />
      );
   }
}

export default Spec;
