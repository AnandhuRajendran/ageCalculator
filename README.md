# DOB Age Calculator

This is a TypeScript  program that :
- Asks for a user's Date of Birth (YYYY/MM/DD)
- Validates the input
- Calculates the age
- Displays custom messages based on the age and date.

---

## Features

- Accepts Date of Birth in 'YYYY/MM/DD' format.
- Validates both format and logical correctness (e.g., leap years, invalid dates like Feb 30).
- Calculates current age.
- Displays custom messages for:
  - Age ≥ 100 → "Superhuman level reached!"
  - Birthday today → "Happy Birthday!"
  - Born today → "Are you sure you are born today?"
  - Future date → "You are not born yet!"
  - Born on Feb 29 → "Technically younger"
- Provides a default message if no special conditions apply.

---

## Prerequisites

- Node.js (v18+ recommended)  
- npm (comes with Node.js)
- TypeScript (global or local)
- Install TypeScript globally: `npm install -g typescript`

---

## Set Up

Follow these steps to get the project ready:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>

2. Install Node.js dependencies
    Make sure you have Node.js installed.
    ```bash
    run:
    npm install

3. Compile TypeScript (if not using ts-node)
    ```bash
    tsc

---

## Running the Program
    npx ts-node ageCalculator.ts