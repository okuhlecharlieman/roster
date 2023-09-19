import React, { useEffect } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase, ref, set, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import Navbar from "./navbar";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4uGFMKtpzZvCaRi_HYMq4EXAq9EskHv8",
  authDomain: "roster-c9cd7.firebaseapp.com",
  databaseURL: "https://roster-c9cd7-default-rtdb.firebaseio.com",
  projectId: "roster-c9cd7",
  storageBucket: "roster-c9cd7.appspot.com",
  messagingSenderId: "447760829686",
  appId: "1:447760829686:web:42b3438ff9f1c0dce130d7",
  measurementId: "G-4112R2S4TM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const names = ["Thando", "Athabile", "Mama", "Charlie"];
const iteration = 7;

function Home() {
  // Create an array to store the repeated names and dates
  const repeatedNamesWithDates = [];

  // Repeatedly select and add different names with dates seven times
  for (let i = 0; i < iteration; i++) {
    const randomIndex = Math.floor(Math.random() * names.length);
    const selectedName = names[randomIndex];

    // Create a new Date object to get the current date and time
    const currentDate = new Date();

    // Extract the date components (year, month, day)
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Months are zero-indexed, so we add 1.
    const day = currentDate.getDate() + i;

    // Format the date as a string (e.g., "YYYY-MM-DD")
    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    repeatedNamesWithDates.push({ name: selectedName, date: formattedDate });
  }
  useEffect(() => {
    repeatedNamesWithDates.forEach((item) => {
      // Get a reference to the "nameDateList" node in the database
      const nameDateListRef = ref(database, "namedDateList");

      // Generate a new push key for the item
      const newItemRef = push(nameDateListRef);

      // Set the data for the item
      set(newItemRef, {
        name: item.name,
        date: item.date,
      });
    });
  }, []);
  return (
    <div>
      <Navbar />

      <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
        {repeatedNamesWithDates.map((item, index) => (
          <li className="bg-slate-200" key={index}>
            {item.name} - {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
