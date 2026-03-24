function wait(ms) {
  return new Promise((resolve) => {
    // use setTimeout
  });
}

// Test it:
console.log("Starting...");
wait(2000).then(() => console.log("2 seconds passed!"));