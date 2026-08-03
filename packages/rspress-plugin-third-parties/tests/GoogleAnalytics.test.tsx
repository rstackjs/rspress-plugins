import { page } from "@rstest/browser";
import { render } from "@rstest/browser-react";
import { beforeEach, describe, expect, rs, test } from "@rstest/core";
import {
	GoogleAnalytics,
	sendGAEvent,
} from "../src/components/GoogleAnalytics";

describe("GoogleAnalytics Component & sendGAEvent", () => {
	beforeEach(() => {
		// Clean up injected script elements and global dataLayer objects between test runs
		document.querySelectorAll("script").forEach((s) => s.remove());
		delete (window as any).dataLayer;
		delete (window as any).customDataLayer;
	});

	test("warns when sendGAEvent is called before GA initialization", () => {
		const warnSpy = rs.spyOn(console, "warn").mockImplementation(() => {});

		// Call event function before mounting <GoogleAnalytics />
		sendGAEvent("event", "page_view");

		expect(warnSpy).toHaveBeenCalledWith(
			"Rspress Third Parties: GA has not been initialized",
		);

		warnSpy.mockRestore();
	});

	test("renders GA scripts with default parameters and gaId", async () => {
		await render(<GoogleAnalytics gaId="G-DEFAULT1" />);

		// Wait for external gtag.js script to attach to DOM
		await page.locator('script[src*="gtag/js"]').waitFor({ state: "attached" });

		const gaScript = document.querySelector(
			'script[src*="gtag/js"]',
		) as HTMLScriptElement;
		const initScript = document.querySelector(
			"script:not([src])",
		) as HTMLScriptElement;

		expect(gaScript).not.toBeNull();
		expect(initScript).not.toBeNull();

		// Verify external script URL
		expect(gaScript.getAttribute("src")).toBe(
			"https://www.googletagmanager.com/gtag/js?id=G-DEFAULT1",
		);

		// Verify inline initialization script content
		expect(initScript.textContent).toContain("window['dataLayer']");
		expect(initScript.textContent).toContain("gtag('config', 'G-DEFAULT1'");
	});

	test("applies debug_mode flag when debugMode prop is true", async () => {
		await render(<GoogleAnalytics gaId="G-DEBUG2" debugMode={true} />);

		await page.locator('script[src*="gtag/js"]').waitFor({ state: "attached" });

		const initScript = document.querySelector(
			"script:not([src])",
		) as HTMLScriptElement;

		expect(initScript).not.toBeNull();
		expect(initScript.textContent).toContain("{ 'debug_mode': true }");
	});

	test("supports custom dataLayerName prop", async () => {
		await render(
			<GoogleAnalytics gaId="G-CUSTOM3" dataLayerName="customDataLayer" />,
		);

		await page.locator('script[src*="gtag/js"]').waitFor({ state: "attached" });

		const initScript = document.querySelector(
			"script:not([src])",
		) as HTMLScriptElement;

		expect(initScript).not.toBeNull();
		expect(initScript.textContent).toContain("window['customDataLayer']");
	});

	test("passes nonce attribute to both script elements", async () => {
		const nonceValue = "csp-nonce-12345";

		await render(<GoogleAnalytics gaId="G-NONCE4" nonce={nonceValue} />);

		await page.locator('script[src*="gtag/js"]').waitFor({ state: "attached" });

		const gaScript = document.querySelector(
			'script[src*="gtag/js"]',
		) as HTMLScriptElement;
		const initScript = document.querySelector(
			"script:not([src])",
		) as HTMLScriptElement;

		expect(gaScript?.getAttribute("nonce")).toBe(nonceValue);
		expect(initScript?.getAttribute("nonce")).toBe(nonceValue);
	});

	test("successfully pushes event payload via sendGAEvent after initialization", async () => {
		await render(<GoogleAnalytics gaId="G-EVENT5" />);

		await page.locator('script[src*="gtag/js"]').waitFor({ state: "attached" });

		// Trigger GA event call
		sendGAEvent("event", "button_click", { button_id: "submit-btn" });

		const dataLayer = (window as any).dataLayer;
		expect(Array.isArray(dataLayer)).toBe(true);
		expect(dataLayer.length).toBeGreaterThan(0);
	});
});
