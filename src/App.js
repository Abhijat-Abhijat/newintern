import "./styles.css";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const App = () => {
  const [swapiData, setSwapiData] = useState([]);

  useEffect(() => {
    const fetchSWAPIData = async () => {
      const endpoint = "people"; // Change this to the desired SWAPI endpoint
      const response = await fetch(`https://swapi.dev/api/${endpoint}`);
      const data = await response.json();
      const repeatedData = repeatData(data.results, 20); // Repeat the data if it's less than 20 items
      setSwapiData(repeatedData);
    };
    fetchSWAPIData();
  }, []);
  const root = document.querySelector("html");

  // Real cursor element
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  root.appendChild(cursor);

  // Following extra cursor element
  const follower = document.createElement("div");
  follower.classList.add("cursor", "cursor__follower");
  root.appendChild(follower);

  root.addEventListener("mousemove", (e) => {
    setPosition(follower, e);
    setPosition(cursor, e);
  });

  function setPosition(element, e) {
    element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }
  // Function to repeat the data until there are totalItems items
  const repeatData = (data, totalItems) => {
    const repeatedData = [];
    while (repeatedData.length < totalItems) {
      repeatedData.push(...data);
    }
    return repeatedData.slice(0, totalItems);
  };

  return (
    <>
      <h1 className="header">Star Wars Characters</h1>
      <div className="card-container">
        {swapiData.map((item, index) => (
          <Card key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
      <footer>
        <p>&copy; 2023 ABHIJAT. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default App;
