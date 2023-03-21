import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Article from "../component/Article";
import { apiFetch } from "../fetch";

function News() {
  const [newsData, setNewsData] = useState({ news: [] });

  const loadNews = () => {
    fetch("http://localhost:5000/api/news")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error loading news.");
        }
      })
      .then((data) => setNewsData(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>News</h2>
      <Button variant="contained" sx={{ flexGrow: "none" }} onClick={loadNews}>
        Refresh
      </Button>
      {newsData.news.map((news) => (
        <div key={news.id}>
          <h2>{news.headline}</h2>
          <p>{news.summary}</p>
          <p>{news.author}</p>
          <a href={news.url}>Read more</a>
          <ul>
            {news.symbols.map((symbol) => (
              <li key={symbol}>{symbol}</li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default News;

