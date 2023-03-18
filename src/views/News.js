import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import Article from "../component/Article";
import { apiFetch } from "../fetch";


function News() {
  const [newsData, setNewsData] = useState({ news: [] });

  const loadStocks = () => {
    return apiFetch("api/news")
      .then((res) => res.json())
      .then((res) => setNewsData(res))
      .catch(console.error);
  };

  useEffect(() => {
    // fetch("http://localhost:5000/api/news", {
    //   mode: "no-cors",
    // })
    //   .then((response) => response.json())
    //   .then((data) => setNewsData(data));
    loadStocks();
  }, []);

  return (
    <div>
      <Box xs={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Box>
          <h2>News</h2>
        </Box>
        <Button variant="contained" xs={{ flexGrow: "none" }} onClick={loadStocks}>
          refresh
        </Button>
      </Box>
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

