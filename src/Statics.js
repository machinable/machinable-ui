class Statics {
	//API_HOST = "https://api.keeplight.io/api";
	MGMT_API_HOST = "http://manage.machinable.test:5001";
	PROJECT_API_HOST = "http://{project-slug}.machinable.test:5001";

	GenerateAPIHost = (slug) => {
		return this.PROJECT_API_HOST.replace("{project-slug}", slug);
	}

	APP_NAME = "Machinable";
}

export default new Statics();