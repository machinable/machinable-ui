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
                  "version": "2.1",
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
               "paths": {},
               "components": {
                  "schemas": {
                     "Error": {
                        "type": "object",
                        "properties": {
                           "error": {
                              "type": "string"
                           }
                        }
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
                  }
               }
            }}
         />
      );
   }
}

export default Spec;
