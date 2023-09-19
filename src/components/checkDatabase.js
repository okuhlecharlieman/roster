import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import Navbar from "./navbar";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const nameDateListRef = ref(database, "namedDateList"); // Change to your specific database path

function Home() {
  const [dataExists, setDataExists] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Use the 'once' method to read data once from the database
    get(nameDateListRef)
      .then((snapshot) => {
        // Check if the snapshot contains any data
        if (snapshot.exists()) {
          setDataExists(true);

          // Get the data and convert it to an array
          const dataArray = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            dataArray.push(item);
          });

          // Set the data state with the retrieved data
          setData(dataArray);
        } else {
          setDataExists(false);
        }
      })
      .catch((error) => {
        console.error("Error reading data: ", error);
      });
  }, []);

  return (
    <div>
      <Navbar />

      {dataExists ? (
        <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
          {data.map((item, index) => (
            <li className="bg-slate-200" key={index}>
              {item.name} - {item.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found in the database</p>
      )}

      {/* Render other components or perform actions based on the data */}
    </div>
  );
}

export default Home;
