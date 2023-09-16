import React from "react";
import Navbar from "./navbar";

const names = ["Thando", "Athabile", "Mama", "Charlie"];

function Home() {
  // Create an array to store the repeated names and dates
  const repeatedNamesWithDates = [];

  // Repeatedly select and add different names with dates seven times
  for (let i = 0; i < 7; i++) {
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
