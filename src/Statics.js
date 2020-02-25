class Statics {
	APP_NAME = "Machinable";
	APP_VERSION = process.env.REACT_APP_VERSION ? process.env.REACT_APP_VERSION : "v1.0.0-alpha"; 
	MGMT_API_HOST = process.env.REACT_APP_MGMT_API_HOST;
	PROJECT_API_HOST = process.env.REACT_APP_PROJECT_API_HOST;
	
	RECAPTCHA_SITE_KEY = process.env.REACT_RECAPTCHA_SITE_KEY;

	COLLECTIONS = "collections";
	API = "api";

	DOCS = {
		OPENAPI: "https://github.com/OAI/OpenAPI-Specification",
		REDOC: "https://github.com/Redocly/redoc",
		JSON_SCHEMA_SAMPLES: "https://machinable.github.io/documentation/reference/json_schema/",
		SAMPLE_PROJECTS: "https://machinable.github.io/documentation/reference/sample_projects/",
		QUERYING: "https://machinable.github.io/documentation/querying_data/crud/",
		PROJECTS: "https://machinable.github.io/documentation/projects/introduction/",
		RESOURCES: "https://machinable.github.io/documentation/projects/resources/",
		COLLECTIONS: "https://machinable.github.io/documentation/projects/collections/",
		ACCESS: "https://machinable.github.io/documentation/projects/access/",
		OVERVIEW: "https://machinable.github.io/documentation/"
	};

	GenerateAPIHost = (slug) => {
		return this.PROJECT_API_HOST.replace("{project-slug}", slug);
	}

	GenerateUserRegistration = (slug) => {
		return this.PROJECT_API_HOST.replace("{project-slug}", slug) + "/users/register";
	}

}

export default new Statics();