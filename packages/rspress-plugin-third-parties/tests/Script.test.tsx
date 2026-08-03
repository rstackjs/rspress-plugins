import { page } from "@rstest/browser";
import { render } from "@rstest/browser-react";
import { beforeEach, describe, expect, rs, test } from "@rstest/core";
import ReactDOM from "react-dom";
import { Script } from "../src/components/Script";

describe("Script Component - Strategies, Preloading & OnReady DOM Creation", () => {
	beforeEach(() => {
		// Clean up DOM and global variables between tests
		document.querySelectorAll("script").forEach((s) => s.remove());
		document
			.querySelectorAll('link[rel="stylesheet"]')
			.forEach((l) => l.remove());
		document.querySelectorAll(".san-end-scroll").forEach((d) => d.remove());
		delete (window as any).sanScrollTop;
	});

	test("loads script with strategy='afterInteractive'", async () => {
		await render(
			<Script
				id="script-after-interactive"
				src="https://example.com/after.js"
				strategy="afterInteractive"
			/>,
		);

		await page
			.locator("#script-after-interactive")
			.waitFor({ state: "attached" });

		const scriptEl = document.getElementById(
			"script-after-interactive",
		) as HTMLScriptElement;

		expect(scriptEl).not.toBeNull();
		expect(scriptEl.getAttribute("data-rspress-script")).toBe(
			"afterInteractive",
		);
	});

	test("loads script with strategy='beforeInteractive'", async () => {
		await render(
			<Script
				id="script-before-interactive"
				src="https://example.com/before.js"
				strategy="beforeInteractive"
			/>,
		);

		await page
			.locator("#script-before-interactive")
			.waitFor({ state: "attached" });

		const scriptEl = document.getElementById(
			"script-before-interactive",
		) as HTMLScriptElement;

		expect(scriptEl).not.toBeNull();
		expect(scriptEl.getAttribute("data-rspress-script")).toBe(
			"beforeInteractive",
		);
	});

	test("loads script with strategy='lazyOnload' after window load", async () => {
		await render(
			<Script
				id="script-lazy-onload"
				src="https://example.com/lazy.js"
				strategy="lazyOnload"
			/>,
		);

		// Trigger window 'load' event to activate requestIdleCallback
		window.dispatchEvent(new Event("load"));

		await page.locator("#script-lazy-onload").waitFor({ state: "attached" });

		const scriptEl = document.getElementById(
			"script-lazy-onload",
		) as HTMLScriptElement;

		expect(scriptEl).not.toBeNull();
		expect(scriptEl.getAttribute("data-rspress-script")).toBe("lazyOnload");
	});

	test("invokes ReactDOM.preinit/experimental_preinit for stylesheet preloading", async () => {
		const preinitMethod =
			typeof (ReactDOM as any).preinit === "function"
				? "preinit"
				: "experimental_preinit";

		let preinitSpy;
		if (typeof (ReactDOM as any)[preinitMethod] === "function") {
			preinitSpy = rs.spyOn(ReactDOM as any, preinitMethod);
		} else {
			(ReactDOM as any).preinit = rs.fn();
			preinitSpy = (ReactDOM as any).preinit;
		}

		const stylesheetUrl = "https://example.com/style.css";

		await render(
			<Script
				id="script-preload-test"
				src="https://example.com/app.js"
				stylesheets={[stylesheetUrl]}
			/>,
		);

		expect(preinitSpy).toHaveBeenCalledWith(stylesheetUrl, {
			as: "style",
			precedence: "medium",
		});
	});

	test("executes onReady callback to create scrollToTopBtn DOM element", async () => {
		// Mock window.sanScrollTop function to create the button element
		(window as any).sanScrollTop = (emoji: string, color: string) => {
			const container = document.createElement("div");
			container.className = "san-end-scroll";

			const btn = document.createElement("button");
			btn.className = "s-scroll";
			btn.id = "scrollToTopBtn";
			btn.innerText = emoji;
			btn.style.backgroundColor = color;
			btn.style.position = "fixed";
			btn.style.bottom = "7px";

			container.appendChild(btn);
			document.body.appendChild(container);
		};

		await render(
			<Script
				id="san-web-maker-demo"
				src="https://sanjaiyan-cool.web.app/script/v1/1/SanWebMaker.js"
				strategy="lazyOnload"
				onReady={() => {
					(window as any)?.sanScrollTop?.("👆", "#00001c");
				}}
			/>,
		);

		// Activate lazyOnload
		window.dispatchEvent(new Event("load"));

		await page.locator("#san-web-maker-demo").waitFor({ state: "attached" });

		const scriptEl = document.getElementById(
			"san-web-maker-demo",
		) as HTMLScriptElement;

		// Dispatch script 'load' event to trigger onReady
		scriptEl.dispatchEvent(new Event("load"));

		// Locate and verify created button element in DOM
		const buttonLocator = page.locator("#scrollToTopBtn");
		await expect.element(buttonLocator).toBeVisible();
		await expect.element(buttonLocator).toHaveText("👆");

		const buttonEl = document.getElementById(
			"scrollToTopBtn",
		) as HTMLButtonElement;
		expect(buttonEl.style.backgroundColor).toBe("rgb(0, 0, 28)");
	});
});
