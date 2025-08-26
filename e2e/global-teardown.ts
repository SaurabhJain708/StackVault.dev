async function globalTeardown() {
  console.log("Global teardown after all tests...");

  try {
    await fetch("http://localhost:3000/api/test_login", { method: "DELETE" });
  } catch (err) {
    console.error("Error during global teardown", err);
  }
}

export default globalTeardown;
