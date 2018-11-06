class Statics {
	// MGMT_API_HOST = "http://manage.machinable.test:5001";
	// PROJECT_API_HOST = "http://{project-slug}.machinable.test:5001";
	MGMT_API_HOST = "https://manage.machinable.io";
	PROJECT_API_HOST = "https://{project-slug}.machinable.io";

	GenerateAPIHost = (slug) => {
		return this.PROJECT_API_HOST.replace("{project-slug}", slug);
	}

	APP_NAME = "Machinable";
}

export default new Statics();