class Statics {
	APP_NAME = "Machinable";
	MGMT_API_HOST = "http://manage.machinable.test:5001";
	PROJECT_API_HOST = "http://{project-slug}.machinable.test:5001";
	// MGMT_API_HOST = "https://manage.machinable.io";
	// PROJECT_API_HOST = "https://{project-slug}.machinable.io";

	RECAPTCHA_SITE_KEY = "6LfyLpQUAAAAAKYUyeSO4PrUyjoMkjJb65w6Emvs";

	COLLECTIONS = "collections";
	API = "api";

	DOCS = {
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

}

export default new Statics();