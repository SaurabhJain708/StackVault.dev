// e2e/global-setup.ts

async function waitForServer(url: string, timeout = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch (err) {}
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Server did not respond at ${url} within ${timeout}ms`);
}

async function globalSetup() {
  console.log("Global setup: waiting for server to be ready...");
  await waitForServer("http://localhost:3000/api/test_login");
  console.log("Server ready. Proceeding with tests.");
}

export default globalSetup;
