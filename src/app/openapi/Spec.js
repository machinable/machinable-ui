import React, { Component } from 'react';
import { RedocStandalone } from 'redoc';

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
                     "url": "http://localhost:3000/static/media/rocket.28c5acd2.svg",
                     "backgroundColor": "#fafafa"
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
                     "name": "People",
                     "description": "Test resource for people"
                  }
               ],
               "x-tagGroups": [
                  {
                     "name": "API Resources",
                     "tags": [
                        "People"
                     ]
                  }
               ],
               "security": [
                  {
                     "SecretApiKey": []
                  },
                  {
                     "JWT": []
                  }
               ],
               "paths": {
                  "/people": {
                     "get": {
                        "tags": ["People"],
                        "summary": "Retrieve list of People path summary",
                        "operationId": "ListPeople",
                        "parameters": [],
                        "security": [
                           {
                              "SecretApiKey": []
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
                                       "type": "array",
                                       "items": {
                                          "$ref": "#/components/schemas/People"
                                       }
                                    }
                                 }
                              }
                           },
                           "400": {},
                           "401": {},
                           "403": {},
                           "404": {},
                           "500": {}
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
                     }
                  },
                  "securitySchemes": {
                     "JWT": {
                        "description": "JWT\n",
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                     },
                     "SecretApiKey": {
                        "description": "API Keys\n",
                        "name": "Authorization",
                        "type": "apiKey",
                        "in": "header"
                     }
                  }
               }
            }}
         />
      );
   }
}

export default Spec;
