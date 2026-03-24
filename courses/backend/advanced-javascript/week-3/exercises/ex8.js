function fetchTeaWithTimeout(id, timeoutMs) {
  return new Promise((resolve, reject) => {
    // Your code here
    fetch(`${"https://tea-api-787553294298.europe-west1.run.app/api"}/teas`)
    reject(new Error("fail")).then(
  () => {
    // not called
  },
  (error) => {
    console.error(error);
  },
);
  });
}

// Test with a generous timeout (should work)
fetchTeaWithTimeout(1, 5000)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));

// Test with a tiny timeout (should fail)
fetchTeaWithTimeout(1, 1)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));