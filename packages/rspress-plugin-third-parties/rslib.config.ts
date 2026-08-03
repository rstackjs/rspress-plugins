import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
	source: {
		entry: {
			index: "./src/index.ts",
			plugin: "./src/plugin.ts",
			GlobalGoogleAnalytics:
				"./src/components/GoogleAnalytics/GlobalGoogleAnalytics.tsx",
		},
	},
	lib: [
		{
			format: "esm",
			syntax: "es2022",
			dts: true,
		},
		{
			format: "cjs",
			syntax: "es2022",
			dts: true,
		},
	],
	plugins: [
		pluginReact({
			reactCompiler: {
				target: "18",
			},
		}),
	],
});
