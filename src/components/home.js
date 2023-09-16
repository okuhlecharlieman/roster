import React from "react";

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
      <h1>Random Names and Dates Display</h1>
      <ul>
        {repeatedNamesWithDates.map((item, index) => (
          <li key={index}>
            {item.name} - {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
