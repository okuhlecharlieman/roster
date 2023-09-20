import React, { useEffect, useMemo } from "react";
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
  // Wrap the initialization in useMemo to prevent it from changing on every render
  const repeatedNamesWithDates = useMemo(() => {
    const result = [];

    for (let i = 0; i < iteration; i++) {
      const randomIndex = Math.floor(Math.random() * names.length);
      const selectedName = names[randomIndex];

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate() + i;

      const formattedDate = `${day.toString().padStart(2, "0")}-${month
        .toString()
        .padStart(2, "0")}-${year}`;

      result.push({ name: selectedName, date: formattedDate });
    }

    return result;
  }, []);
  // Push data to Firebase outside of the useEffect
  useEffect(() => {
    // Get a reference to the "nameDateList" node in the database
    const nameDateListRef = ref(database, "namedDateList");

    // Create an object to store all the data
    const dataToStore = {};

    repeatedNamesWithDates.forEach((item, index) => {
      // Generate a unique key for each item
      const newItemKey = push(nameDateListRef).key;

      // Add the item's data under the unique key in the object
      dataToStore[newItemKey] = {
        name: item.name,
        date: item.date,
      };
    });

    // Set all the data in one operation
    set(nameDateListRef, dataToStore);
  }, [repeatedNamesWithDates]);

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
      <h1 className="bg-slate-500 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
        Admin
      </h1>
    </div>
  );
}

export default Home;
