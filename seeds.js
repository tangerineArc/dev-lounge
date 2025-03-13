#! /usr/bin/env node

"use strict";

import "dotenv/config";
import bcrypt from "bcryptjs";
import pg from "pg";

const { native } = pg;
const { Client } = native;

async function generateQuery() {
  const passwords = JSON.parse(process.env.PASSWORDS);
  const hashedPasswords = await Promise.all(
    passwords.map((text) => bcrypt.hash(text, 10))
  );

  return `
  DELETE FROM post;
  DELETE FROM member;

  INSERT INTO member ( id, username, password_hash, first_name, last_name, membership_status )
  VALUES
    (
      1,
      'tangerine',
      '${hashedPasswords[0]}',
      'Tangerine',
      'Arc',
      'elite'
    ),
    (
      2,
      'lemon',
      '${hashedPasswords[1]}',
      'Lemon',
      'Sector',
      'knight'
    ),
    (
      3,
      'wreckerzen',
      '${hashedPasswords[2]}',
      'Swagatam',
      'Pati',
      'knight'
    ),
    (
      4,
      'oklahoma',
      '${hashedPasswords[3]}',
      'Backus',
      'Naur',
      'knight'
    ),
    (
      5,
      'ulterior',
      '${hashedPasswords[4]}',
      'Werner',
      'Heisenberg',
      'knight'
    ),
    (
      6,
      'nihilist',
      '${hashedPasswords[5]}',
      'Friedrich',
      'Nietzsche',
      'commoner'
    );

  INSERT INTO post ( title, description, userId )
  VALUES
    (
      'Tabs are clearly superior to spaces',
      'After years of heated debate, I have decided to settle this matter once and for all. Tabs save space, reduce file size, and make developers happy. Spaces, on the other hand, contribute to climate change (citation needed).',
      1
    ),
    (
      'Accidentally took down production',
      'There I was, just a humble developer pushing what I thought was a harmless update. Little did I know, I had just triggered a catastrophic sequence of events that would cause the entire database to vanish faster than my weekend plans.',
      2
    ),
    (
      'My cat debugs my code',
      'After years of struggling with debugging, I finally discovered the ultimate solution: my cat. By simply placing her on my keyboard, she managed to highlight the exact line where I had forgotten a semicolon. Coincidence? I think not.',
      3
    ),
    (
      'The dark side of writing a to-do list',
      'It starts with good intentions: "Just write a simple list to stay organized," they said. But before you know it, you''ve color-coded your tasks, added priority levels, and spent four hours choosing the perfect font for your bullet points.',
      4
    ),
    (
      'Procrastination',
      'Have an important deadline coming up? Perfect! That means it''s time to deep clean your apartment, start a new hobby, and suddenly remember that you''ve always wanted to learn how to bake sourdough bread.',
      5
    ),
    (
      'Debugging: The Five Stages of Grief',
      'Denial: "It works on my machine." Anger: "Who wrote this garbage?" Bargaining: "What if I just comment out this part?" Depression: "I have no idea what I''m doing." Acceptance: "Fine, I''ll actually read the documentation."',
      1
    ),
    (
      'Tried to explain recursion and got stuck in an infinite loop',
      'It started as a simple explanation: "Recursion is when a function calls itself." But then someone asked, "Can you give an example?" and before I knew it, I was explaining recursion inside my explanation of recursion, and—well, you get the idea.',
      2
    ),
    (
      'The joys of being a senior developer (and forgetting everything)',
      'They say experience makes you wiser, but in reality, it just means you''ve forgotten more things than a junior developer has ever learned. From googling "for loop syntax" for the hundredth time to pretending to understand the latest JavaScript framework, join me as I navigate the wonderful world of senior-level confusion.',
      3
    ),
    (
      'I accidentally became the "Tech Support" person for my family',
      'One day, I fixed my grandma''s Wi-Fi. The next day, I was troubleshooting my uncle''s printer. Now, I''m on call 24/7 for every tech issue in the family, and I haven''t known peace since. Does anybody know how to escape this fate (or at least minimize the damage)?',
      4
    ),
    (
      'The great just-one-more-feature disaster',
      'It all started with a simple project. "I''ll just add this one feature," I said. "It won''t take long," I assured myself. Fast forward six months, and my "simple" project now has a database, an AI chatbot, a dark mode toggle, and a blockchain integration for no reason. Send help.',
      5
    ),
    (
      'My rubber duck is a better programmer than me',
      'Whenever I get stuck on a bug, I explain my problem to a rubber duck. Magically, I always find the answer mid-sentence. Does this mean the duck is secretly the brains of the operation?',
      1
    ),
    (
      'When stack overflow goes down',
      'I opened my browser, typed in my latest error message, and hit enter. But instead of answers, I was met with the unthinkable: "Stack Overflow is temporarily down." My hands trembled. My vision blurred. How do you code when you can''t copy-paste solutions from strangers on the internet?',
      2
    );

  ALTER SEQUENCE member_id_seq RESTART WITH 7;
  `;
}

async function main() {
  console.log("seeding started ...");

  const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const SQL = await generateQuery();

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("... seeding finished");
}

main();
