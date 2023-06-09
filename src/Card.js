import React, { useEffect, useState } from "react";
import GiphyAPI from "giphy-api";
import "./styles.css";
const Card = ({ item }) => {
  const [gifURL, setGifURL] = useState("");
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const giphy = GiphyAPI("eeN7TC0XvFMqknfjwlbMXy7kJ1z5vkcI");

    const fetchRandomGIF = async () => {
      try {
        const response = await giphy.random(item.name);
        setGifURL(response.data.url);
        console.log("GIF fetched successfully:", response.data.name);
      } catch (error) {
        console.error("Error fetching GIF:", error);
        setFetchError(true);
      }
    };

    fetchRandomGIF();
  }, [item.name]);

  const attributes = Object.entries(item).slice(0, 4);
  const cardStyle = {
    "--card-hue": Math.floor(Math.random() * 360), // Generate a random hue value for the card
  };

  const renderImage = () => {
    if (fetchError) {
      return <div className="fallback-image">Failed to fetch GIF</div>;
    }

    return (
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${
          item.url.split("/")[5]
        }.jpg`}
        alt={item.name}
      />
    );
  };

  return (
    <div className="card" style={cardStyle}>
      {renderImage()}
      
      <ul className="attributes-list">
        {attributes.map(([key, value]) => (
          <li key={key}>
            <strong>{key.toUpperCase()}</strong>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
