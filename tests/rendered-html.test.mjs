import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Spider Date experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Spider Date/);
  assert.match(html, /¿Aceptarías ver el hombre araña con su novio\?/);
  assert.match(html, /data-answer="yes"/);
  assert.match(html, /data-answer="no"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /data-coupon-stage/);
  assert.match(html, /assets\/coupon-photo\.jpeg/);
  assert.match(html, /¡Gracias por aceptar la cita!/);
  assert.match(html, /Un millón de besos de Andrés/);
  assert.match(html, /Acepto mi cupón/);
  const script = await readFile(new URL("../script.js", import.meta.url), "utf8");
  assert.match(script, /Enviar captura para canjearlo/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
