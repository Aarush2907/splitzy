const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value;
      }
    });
  } catch (e) {
    console.error("Could not load .env.local", e);
  }
}

loadEnv();

async function findWorkingModel() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // List of models to try
  const candidates = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    "gemini-1.5-pro-001",
    "gemini-1.5-pro-002",
    "gemini-1.0-pro",
    "gemini-pro"
  ];

  console.log("Testing models...");
  
  for (const modelName of candidates) {
    try {
      process.stdout.write(`Testing ${modelName}... `);
      const model = genAI.getGenerativeModel({ model: modelName });
      await model.generateContent("Hello");
      console.log("SUCCESS!");
      console.log(`\n>>> RECOMMENDED MODEL: ${modelName} <<<\n`);
      return;
    } catch (e) {
      console.log(`FAILED (${e.message.split('[')[0].trim()})`);
    }
  }
  
  console.log("All candidates failed.");
}

findWorkingModel();
