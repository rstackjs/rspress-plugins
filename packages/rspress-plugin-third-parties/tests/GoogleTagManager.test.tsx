import { page } from "@rstest/browser";
import { render } from "@rstest/browser-react";
import { beforeEach, describe, expect, test } from "@rstest/core";
import { GoogleTagManager } from "../src/components/GoogleTagManager";

describe("GoogleTagManager Component", () => {
	beforeEach(() => {
		// Clean up injected script tags from document body between test runs
		document.querySelectorAll("script").forEach((s) => s.remove());
		delete (window as any).dataLayer;
		delete (window as any).customDataLayer;
	});

	test("renders GTM initialization and external scripts with default URL", async () => {
		await render(<GoogleTagManager gtmId="GTM-DEFAULT1" />);

		// Wait for external script to attach
		await page.locator('script[src*="gtm.js"]').waitFor({ state: "attached" });

		const gtmScript = document.querySelector(
			'script[src*="gtm.js"]',
		) as HTMLScriptElement;
		const initScript = document.querySelector(
			"script:not([src])",
		) as HTMLScriptElement;

		expect(initScript).not.toBeNull();
		expect(gtmScript).not.toBeNull();
		expect(gtmScript.getAttribute("src")).toBe(
			"https://www.googletagmanager.com/gtm.js?id=GTM-DEFAULT1",
		);
	});

	test("appends gtm_auth, gtm_preview, and custom dataLayerName search parameters", async () => {
		await render(
			<GoogleTagManager
				gtmId="GTM-ADVANCED2"
				auth="myAuthCode"
				preview="env-2"
				dataLayerName="customDataLayer"
			/>,
		);

		await page.locator('script[src*="gtm.js"]').waitFor({ state: "attached" });

		const gtmScript = document.querySelector(
			'script[src*="gtm.js"]',
		) as HTMLScriptElement;
		expect(gtmScript).not.toBeNull();

		const url = new URL(gtmScript.src);
		expect(url.searchParams.get("id")).toBe("GTM-ADVANCED2");
		expect(url.searchParams.get("gtm_auth")).toBe("myAuthCode");
		expect(url.searchParams.get("gtm_preview")).toBe("env-2");
		expect(url.searchParams.get("gtm_cookies_win")).toBe("x");
		expect(url.searchParams.get("l")).toBe("customDataLayer");
	});

	test("uses custom gtmScriptUrl when provided", async () => {
		await render(
			<GoogleTagManager
				gtmId="GTM-CUSTOM3"
				gtmScriptUrl="https://custom-proxy.example.com/gtm.js"
			/>,
		);

		await page
			.locator('script[src*="custom-proxy"]')
			.waitFor({ state: "attached" });

		const gtmScript = document.querySelector(
			'script[src*="custom-proxy"]',
		) as HTMLScriptElement;
		expect(gtmScript).not.toBeNull();

		expect(gtmScript.getAttribute("src")).toBe(
			"https://custom-proxy.example.com/gtm.js?id=GTM-CUSTOM3",
		);
	});

	test("passes nonce attribute to both script elements when specified", async () => {
		const nonceValue = "random-nonce-12345";

		await render(<GoogleTagManager gtmId="GTM-NONCE4" nonce={nonceValue} />);

		await page.locator('script[src*="gtm.js"]').waitFor({ state: "attached" });

		const gtmScript = document.querySelector(
			'script[src*="gtm.js"]',
		) as HTMLScriptElement;
		const initScript = document.querySelector(
			"script:not([src])",
		) as HTMLScriptElement;

		expect(initScript).not.toBeNull();
		expect(gtmScript).not.toBeNull();

		expect(initScript.getAttribute("nonce")).toBe(nonceValue);
		expect(gtmScript.getAttribute("nonce")).toBe(nonceValue);
	});

	test("renders init script content with dataLayer initial object", async () => {
		const dataLayerPayload = { user_role: "admin", logged_in: true };

		await render(
			<GoogleTagManager gtmId="GTM-DATALAYER5" dataLayer={dataLayerPayload} />,
		);

		await page.locator('script[src*="gtm.js"]').waitFor({ state: "attached" });

		const initScript = document.querySelector(
			"script:not([src])",
		) as HTMLScriptElement;
		expect(initScript).not.toBeNull();

		expect(initScript.textContent).toContain("w[l]=w[l]||[]");
		expect(initScript.textContent).toContain(JSON.stringify(dataLayerPayload));
	});
});
