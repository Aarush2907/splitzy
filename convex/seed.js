// convex/seed.js
import { mutation } from "./_generated/server";

/**
 * Seed database with Indian-themed dummy data using your existing users
 * Run with: npx convex run seed:seedDatabase
 */
export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if database already has expenses to avoid duplicate seeding
    const existingExpenses = await ctx.db.query("expenses").collect();
    if (existingExpenses.length > 0) {
      console.log("Database already has expenses. Skipping seed.");
      return {
        skipped: true,
        existingExpenses: existingExpenses.length,
      };
    }

    // Step 1: Get your existing users
    const users = await ctx.db.query("users").collect();

    if (users.length < 3) {
      console.log(
        "Not enough users in the database. Please ensure you have at least 3 users."
      );
      return {
        skipped: true,
        reason: "Not enough users",
      };
    }

    // Step 2: Create groups
    const groups = await createGroups(ctx, users);

    // Step 3: Create 1-on-1 expenses
    const oneOnOneExpenses = await createOneOnOneExpenses(ctx, users);

    // Step 4: Create group expenses
    const groupExpenses = await createGroupExpenses(ctx, users, groups);

    // Step 5: Create settlements
    const settlements = await createSettlements(
      ctx,
      users,
      groups,
      oneOnOneExpenses,
      groupExpenses
    );

    return {
      success: true,
      stats: {
        users: users.length,
        groups: groups.length,
        oneOnOneExpenses: oneOnOneExpenses.length,
        groupExpenses: groupExpenses.length,
        settlements: settlements.length,
      },
    };
  },
});

// Helper to create groups
async function createGroups(ctx, users) {
  const now = Date.now();

  const user1 = users[0]; 
  const user2 = users[1]; 
  const user3 = users[2]; 

  const groupDatas = [
    {
      name: "Goa Trip 🌴",
      description: "Annual friends trip to Goa",
      createdBy: user1._id,
      members: [
        { userId: user1._id, role: "admin", joinedAt: now },
        { userId: user2._id, role: "member", joinedAt: now },
        { userId: user3._id, role: "member", joinedAt: now },
      ],
    },
    {
      name: "Bangalore Flat 🏠",
      description: "Rent, electricity, and maid salary",
      createdBy: user2._id,
      members: [
        { userId: user2._id, role: "admin", joinedAt: now },
        { userId: user3._id, role: "member", joinedAt: now },
      ],
    },
    {
      name: "Diwali Party 🪔",
      description: "Expenses for the house party",
      createdBy: user3._id,
      members: [
        { userId: user3._id, role: "admin", joinedAt: now },
        { userId: user1._id, role: "member", joinedAt: now },
        { userId: user2._id, role: "member", joinedAt: now },
      ],
    },
  ];

  const groupIds = [];
  for (const groupData of groupDatas) {
    const groupId = await ctx.db.insert("groups", groupData);
    groupIds.push(groupId);
  }

  return await Promise.all(
    groupIds.map(async (id) => {
      const group = await ctx.db.get(id);
      return { ...group, _id: id };
    })
  );
}

// Helper to create one-on-one expenses
async function createOneOnOneExpenses(ctx, users) {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

  const user1 = users[0];
  const user2 = users[1];
  const user3 = users[2];

  const expenseDatas = [
    {
      description: "Dinner at Paradise Biryani",
      amount: 1450.0,
      category: "food",
      date: twoWeeksAgo,
      paidByUserId: user1._id,
      splitType: "equal",
      splits: [
        { userId: user1._id, amount: 725.0, paid: true },
        { userId: user2._id, amount: 725.0, paid: false },
      ],
      createdBy: user1._id,
    },
    {
      description: "Uber to Airport",
      amount: 850.0,
      category: "transport", 
      date: oneWeekAgo,
      paidByUserId: user2._id,
      splitType: "equal",
      splits: [
        { userId: user1._id, amount: 425.0, paid: false },
        { userId: user2._id, amount: 425.0, paid: true },
      ],
      createdBy: user2._id,
    },
    {
      description: "Movie tickets (Jawan)",
      amount: 900.0,
      category: "entertainment",
      date: oneWeekAgo + 2 * 24 * 60 * 60 * 1000,
      paidByUserId: user3._id,
      splitType: "equal",
      splits: [
        { userId: user2._id, amount: 450.0, paid: false },
        { userId: user3._id, amount: 450.0, paid: true },
      ],
      createdBy: user3._id,
    },
    {
      description: "Groceries from Blinkit",
      amount: 2150.0,
      category: "shopping",
      date: oneMonthAgo,
      paidByUserId: user1._id,
      splitType: "percentage",
      splits: [
        { userId: user1._id, amount: 1505.0, paid: true }, // 70%
        { userId: user3._id, amount: 645.0, paid: false }, // 30%
      ],
      createdBy: user1._id,
    },
    {
      description: "JioFiber Bill",
      amount: 1178.0,
      category: "utilities",
      date: now - 3 * 24 * 60 * 60 * 1000,
      paidByUserId: user2._id,
      splitType: "equal",
      splits: [
        { userId: user2._id, amount: 589.0, paid: true },
        { userId: user3._id, amount: 589.0, paid: false },
      ],
      createdBy: user2._id,
    },
  ];

  const expenseIds = [];
  for (const expenseData of expenseDatas) {
    const expenseId = await ctx.db.insert("expenses", expenseData);
    expenseIds.push(expenseId);
  }

  return await Promise.all(
    expenseIds.map(async (id) => {
      const expense = await ctx.db.get(id);
      return { ...expense, _id: id };
    })
  );
}

// Helper to create group expenses
async function createGroupExpenses(ctx, users, groups) {
  const now = Date.now();
  const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;

  const user1 = users[0];
  const user2 = users[1];
  const user3 = users[2];

  // Goa Trip Expenses
  const goaExpenses = [
    {
      description: "Villa Rental (3 nights)",
      amount: 25000.0,
      category: "housing",
      date: twoWeeksAgo,
      paidByUserId: user1._id,
      splitType: "equal",
      splits: [
        { userId: user1._id, amount: 8333.34, paid: true },
        { userId: user2._id, amount: 8333.33, paid: false },
        { userId: user3._id, amount: 8333.33, paid: false },
      ],
      groupId: groups[0]._id, // Goa Trip
      createdBy: user1._id,
    },
    {
      description: "Drinks & Snacks",
      amount: 5400.0,
      category: "food",
      date: twoWeeksAgo + 1 * 24 * 60 * 60 * 1000,
      paidByUserId: user2._id,
      splitType: "equal",
      splits: [
        { userId: user1._id, amount: 1800.0, paid: false },
        { userId: user2._id, amount: 1800.0, paid: true },
        { userId: user3._id, amount: 1800.0, paid: false },
      ],
      groupId: groups[0]._id, // Goa Trip
      createdBy: user2._id,
    },
    {
      description: "Water Sports",
      amount: 6000.0,
      category: "entertainment",
      date: twoWeeksAgo + 2 * 24 * 60 * 60 * 1000,
      paidByUserId: user3._id,
      splitType: "equal",
      splits: [
        { userId: user1._id, amount: 2000.0, paid: false },
        { userId: user2._id, amount: 2000.0, paid: false },
        { userId: user3._id, amount: 2000.0, paid: true },
      ],
      groupId: groups[0]._id, // Goa Trip
      createdBy: user3._id,
    },
  ];

  // Bangalore Flat Expenses
  const flatExpenses = [
    {
      description: "Maid Salary",
      amount: 3000.0,
      category: "housing",
      date: now - 7 * 24 * 60 * 60 * 1000,
      paidByUserId: user2._id,
      splitType: "equal",
      splits: [
        { userId: user2._id, amount: 1500.0, paid: true },
        { userId: user3._id, amount: 1500.0, paid: false },
      ],
      groupId: groups[1]._id, // Bangalore Flat
      createdBy: user2._id,
    },
  ];

  // Diwali Party
  const diwaliExpenses = [
    {
      description: "Sweets & Decor",
      amount: 4500.0,
      category: "shopping",
      date: now - 5 * 24 * 60 * 60 * 1000,
      paidByUserId: user3._id,
      splitType: "equal",
      splits: [
        { userId: user1._id, amount: 1500.0, paid: false },
        { userId: user2._id, amount: 1500.0, paid: false },
        { userId: user3._id, amount: 1500.0, paid: true },
      ],
      groupId: groups[2]._id, // Diwali Party
      createdBy: user3._id,
    },
  ];

  const allGroupExpenses = [...goaExpenses, ...flatExpenses, ...diwaliExpenses];

  const expenseIds = [];
  for (const expenseData of allGroupExpenses) {
    const expenseId = await ctx.db.insert("expenses", expenseData);
    expenseIds.push(expenseId);
  }

  return await Promise.all(
    expenseIds.map(async (id) => {
      const expense = await ctx.db.get(id);
      return { ...expense, _id: id };
    })
  );
}

// Helper to create settlements
async function createSettlements(
  ctx,
  users,
  groups,
  oneOnOneExpenses,
  groupExpenses
) {
  const now = Date.now();
  const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;

  const user1 = users[0];
  const user2 = users[1];
  const user3 = users[2];

  const settlementDatas = [
    {
      amount: 425.0, 
      note: "Uber payment",
      date: now - 4 * 24 * 60 * 60 * 1000,
      paidByUserId: user1._id, 
      receivedByUserId: user2._id, 
      createdBy: user1._id,
    },
    {
      amount: 5000.0, 
      note: "Part of Villa rental",
      date: threeDaysAgo,
      paidByUserId: user2._id, 
      receivedByUserId: user1._id, 
      groupId: groups[0]._id, // Goa Trip
      createdBy: user2._id,
    },
  ];

  const settlementIds = [];
  for (const settlementData of settlementDatas) {
    const settlementId = await ctx.db.insert("settlements", settlementData);
    settlementIds.push(settlementId);
  }

  return await Promise.all(
    settlementIds.map(async (id) => {
      const settlement = await ctx.db.get(id);
      return { ...settlement, _id: id };
    })
  );
}