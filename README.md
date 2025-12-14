<h1> Splitzy </h1> <div align="center"> <img src="./public/logos/SPLITZY.png" alt="Splitzy Logo" width="200"/> <br/> Because good friends deserve fair splits </div> <h2> 📖 Overview </h2> Splitzy is a modern, full-stack expense splitting application designed specifically for the Indian market. Built with the latest web technologies, Splitzy makes it effortless to split bills, track expenses, and settle debts with friends, roommates, or travel groups. From chai runs to Goa trips, track every Rupee with seamless expense management and smart settlement calculations. <br/> 🌟 Key Features <br/> 💰 Smart Expense Management <ul> <li>Multiple Split Types: Split expenses equally, by percentage, or exact amounts </li> <li>Category Tracking: Organize expenses with 20+ predefined categories (Food, Travel, Utilities, etc.) </li> <li>Rich Metadata: Add descriptions, dates, and notes to each expense </li> <li>Real-time Updates: See changes instantly across all group members </li> </ul> 👥 Group & Contact Management <ul> <li>Create Groups: Set up groups for trips, flatmates, or any shared expense scenario</li> <li>One-on-One Tracking: Manage individual expense relationships separately</li> <li>Invite System: Share group invites via unique codes or links</li> <li>Member Roles: Admin controls with member management capabilities</li> </ul> 📊 Analytics & Insights <ul> <li>Dashboard: Visual overview of all your financial relationships</li> <li>Expense Trends: Monthly spending charts and patterns </li> <li>Balance Summary: Instant view of who owes what</li> <li>Category Breakdown: See where your money goes</li> </ul> 🔔 Smart Automation <ul> <li>Payment Reminders: Automated email reminders for outstanding debts (using Inngest)</li> <li>Spending Insights: AI-powered monthly spending analysis (powered by Google Gemini)</li> <li>Smart Settlements: Optimized calculation of who owes whom</li> </ul> 🎨 Modern UI/UX <ul> <li>Dark/Light Mode: Toggle between themes</li> <li>Responsive Design: Works seamlessly on mobile, tablet, and desktop</li> <li>Glass Morphism: Modern, aesthetic design language</li> <li>Smooth Animations: Delightful micro-interactions</li> </ul>

<h2> 🏗️ Tech Stack </h2> <h3> 🎨 Frontend </h3> <ul> <li><b>Framework:</b> Next.js 15 (App Router)</li> <li><b>Language:</b> JavaScript / JSX</li> <li><b>Styling:</b> Tailwind CSS with custom theme</li> <li><b>UI Components:</b> Radix UI primitives</li> <li><b>Icons:</b> Lucide React</li> <li><b>Charts:</b> Recharts</li> <li><b>Forms:</b> React Hook Form + Zod validation</li> </ul> <h3> 🛠️ Backend </h3> <ul> <li><b>Database & Backend:</b> Convex</li> <li><b>Authentication:</b> Clerk</li> <li><b>Background Jobs:</b> Inngest</li> <li><b>Email Service:</b> Resend</li> <li><b>AI Integration:</b> Google Gemini 2.0</li> </ul> <h3> 🧰 Developer Tools </h3> <ul> <li><b>Package Manager:</b> npm</li> <li><b>Version Control:</b> Git</li> <li><b>Deployment:</b> Vercel (recommended)</li> </ul> <br/> <h2> 🚀 Getting Started </h2> <h3> ✅ Prerequisites </h3> Before you begin, make sure the following are installed on your system: <ul> <li>Node.js (v18 or higher)</li> <li>npm (v9 or higher)</li> <li>Git</li> </ul> <h3> 🔑 Required API Keys & Services </h3> You'll need accounts and API keys for the following services: <ul> <li><b>Convex</b> – Database & backend (<a href="https://www.convex.dev">Sign Up</a>)</li> <li><b>Clerk</b> – Authentication (<a href="https://clerk.com">Sign Up</a>)</li> <li><b>Resend</b> – Email Service (<a href="https://resend.com">Sign Up</a>)</li> <li><b>Google AI Studio</b> – Gemini API Key (<a href="https://aistudio.google.com">Get Key</a>)</li> <li><b>Inngest</b> – Background Jobs (optional, <a href="https://www.inngest.com">Sign Up</a>)</li> </ul>

<h2> 📥 Installation </h2> <h3> 1️⃣ Clone the Repository </h3>
git clone https://github.com/yourusername/splitzy.git <br/>
cd splitzy
<h3> 2️⃣ Install Dependencies </h3>
npm install
<h3> 3️⃣ Set Up Convex </h3>
# Install Convex CLI globally (if not already installed)
npm install -g convex
<br />
# Initialize Convex project
npx convex dev
<br />
This will:
<br />
<ul> <li>Create a new Convex project (or link an existing one)</li> <li>Generate <code>convex.json</code> configuration</li> <li>Start the Convex development server</li> </ul> <h3> 4️⃣ Configure Environment Variables </h3>

Create a <code>.env.local</code> file in the root directory:
<br />

# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url <br />
CONVEX_DEPLOYMENT=your_convex_deployment_name <br />

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key <br />
CLERK_SECRET_KEY=your_clerk_secret_key <br />
CLERK_JWT_ISSUER_DOMAIN=your_clerk_issuer_domain <br />

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key <br />

# Resend Email Service
RESEND_API_KEY=your_resend_api_key <br />

# Inngest (Optional - for background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key <br />
INNGEST_SIGNING_KEY=your_inngest_signing_key <br />

<h3> 5️⃣ Configure Clerk </h3> <ul> <li>Go to your <b>Clerk Dashboard</b></li> <li>Create a new application</li> <li>Navigate to <b>JWT Templates</b></li> <li>Create a new template named <code>convex</code></li> </ul>

Add the following claims: <br />

{
  "aud": "convex",
  "iss": "https://your-clerk-domain.clerk.accounts.dev"
}


Copy your <b>Publishable Key</b> and <b>Secret Key</b> into <code>.env.local</code>.

<h3> 6️⃣ Set Up Convex Authentication </h3>

Create or update <code>convex/auth.config.js</code>:

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};


<h3> 7️⃣ Seed the Database (Optional) </h3>

To populate the database with sample data:

npx convex run seed:seedDatabase


<h2> 🎯 Running the Project </h2> <h3> 🧪 Development Mode </h3>

Start the Convex development server (Terminal 1):

npx convex dev


Start the Next.js development server (Terminal 2):

npm run dev


Open your browser and visit:
👉 <b>http://localhost:3000
</b>

<h3> 🚀 Production Build </h3>

# Build the application
npm run build

# Start production server
npm start

