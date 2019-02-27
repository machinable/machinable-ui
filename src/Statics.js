class Statics {
	MGMT_API_HOST = "http://manage.machinable.test:5001";
	PROJECT_API_HOST = "http://{project-slug}.machinable.test:5001";
	//MGMT_API_HOST = "https://manage.machinable.io";
	//PROJECT_API_HOST = "https://{project-slug}.machinable.io";

	RECAPTCHA_SITE_KEY = "6LfyLpQUAAAAAKYUyeSO4PrUyjoMkjJb65w6Emvs";

	COLLECTIONS = "collections";
	API = "api";

	GenerateAPIHost = (slug) => {
		return this.PROJECT_API_HOST.replace("{project-slug}", slug);
	}

	APP_NAME = "Machinable";
}

export default new Statics();