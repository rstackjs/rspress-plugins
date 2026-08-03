import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rstest/core";

export default defineConfig({
	browser: {
		enabled: true,
		provider: "playwright",
	},
	plugins: [
		pluginReact({
			reactCompiler: true,
		}),
	],
});
