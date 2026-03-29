import * as Readline from "readline";

const read = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Gets DOB from user
getDOB();


function getDOB(){
read.question("Enter the Date of Birth in YYYY/MM/DD \n\n", (input) => {
 
  const isValid = validateFormat(input);
  if (!isValid) {
      console.log("Please try again.\n");
      getDOB(); // retry
    } else {
      read.close();
    }
    
});
}

//Validate the Date format
function validateFormat(dob: string): boolean {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;

  if (!regex.test(dob)) {
    console.log("Invalid format! Use YYYY/MM/DD.");
    return false;
  }

  const [year, month, day] = dob.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    console.log("Invalid date!\n");
    return false;
  } else {
    console.log("\n");
    const age = ageCalculator(dob);
    messageToUser(dob, age);
    return true;
  }
}

//getting current date
function currentDate() {
  const presentDate = new Date();
  return {
    yearNow: presentDate.getFullYear(),
    monthNow: presentDate.getMonth() + 1,
    dateNow: presentDate.getDate(),
  };
}

//To find the age
function ageCalculator(dob: string): number {
  const { yearNow, monthNow, dateNow } = currentDate();
  const [birthYear, birthMonth, birthDay] = dob.split("/").map(Number);

  let age = yearNow - birthYear;

  if (
    monthNow < birthMonth ||
    (monthNow === birthMonth && dateNow < birthDay)
  ) {
    age--;
  }

  console.log("Your age is : " + age);
  return age;
}

function messageToUser(dob: string, age: number) {
  const { yearNow, monthNow, dateNow } = currentDate();
  const [birthYear, birthMonth, birthDay] = dob.split("/").map(Number);

  let messages: string[] = [];

  //Age is 100+
  if (age >= 100) {
    messages.push(`${age}`+"? Superhuman level reached! \n");
  }
  
  //Born today
  if (
    birthYear === yearNow &&
    birthMonth === monthNow &&
    birthDay === dateNow
  ) {
    messages.push("Are you sure you are born today?\n");
  }

  //Not born yet
  if (
    birthYear > yearNow ||
    (birthYear === yearNow && birthMonth > monthNow) ||
    (birthYear === yearNow &&
      birthMonth === monthNow &&
      birthDay > dateNow)
  ) {
    messages.push("You are not born yet!\n");
  }

  //Born on a Leap year
  if (birthMonth === 2 && birthDay === 29) {
    messages.push(
      "Born on Feb 29! Age is "+`${age}`+", but technically younger\n"
    );
  }

  //Its Birthday
  if (birthMonth === monthNow && birthDay === dateNow) {
    messages.push("Happy Birthday! You turn "+`${age}`+" today!\n");
  }

  //Normal age if nothing applies
  if (messages.length === 0) {
    messages.push("Keep enjoying your life!\n");
  }

  console.log(messages.join("\n"));
}

export { ageCalculator, messageToUser, currentDate, validateFormat };