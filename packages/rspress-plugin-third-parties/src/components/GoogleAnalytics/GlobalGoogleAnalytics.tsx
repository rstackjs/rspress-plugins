import { GoogleAnalytics } from "./index";

export default function GlobalGoogleAnalytics() {
	// Rspress/Rsbuild define plugin injects process.env.RSPRESS_GA_CONFIG string
	const configString = process.env.RSPRESS_GA_CONFIG;

	if (!configString || configString === "null") {
		return null;
	}

	try {
		const config =
			typeof configString === "string"
				? JSON.parse(configString)
				: configString;

		if (!config || !config.gaId) {
			return null;
		}

		return <GoogleAnalytics {...config} />;
	} catch (err) {
		console.error(
			"[rspress-plugin-third-parties] Failed to parse GA config:",
			err,
		);
		return null;
	}
}
