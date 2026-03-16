const axios = require("axios");

const HOSPITAL_API = "http://localhost:3000/api/tokens";

const TOTAL_TOKENS = 20; // change this for bigger demo

async function injectTokens() {
  console.log(`🚀 Injecting ${TOTAL_TOKENS} demo tokens...\n`);

  for (let i = 1; i <= TOTAL_TOKENS; i++) {
    try {
      const response = await axios.post(HOSPITAL_API, {
        phone_number: `90000000${i}`,
        priority: 2,
        name: `Demo Patient ${i}`,
        age: 20 + (i % 10),
        problem: "General Checkup",
        source: "demo"
      });

      console.log(
        `✅ Token #${response.data.data.token_number} created`
      );

    } catch (error) {
      console.error("❌ Failed to create token:", error.message);
    }
  }

  console.log("\n🎉 Injection complete.");
}

injectTokens();
