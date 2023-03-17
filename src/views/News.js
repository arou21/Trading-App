import React, { useState, useEffect } from "react";
import Article from '../component/Article';
// import Newsfeed from "../images/Newsfeed.jpg";

function News() {
  const [newsData, setNewsData] = useState({ news: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/news", {
      mode: 'no-cors'
    })
      .then((response) => response.json())
      .then((data) => setNewsData(data));
  }, []);

  return (
    <div>
      <h1>News</h1>
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



// class NewsComponent extends Component {
//   state = {
//     newsData: []
//   }

//   componentDidMount() {
//     this.getNewsData();
//   }

//   async getNewsData() {
//     try {
//       const apiToken = 'D3tkz0oplu4NP8gJ1xcvKuHRXsTWK0jz7SCrNyGS';
//       const symbols = 'msft,fb';
//       const limit = '50';

//       const params = {
//         api_token: apiToken,
//         symbols: symbols,
//         limit: limit
//       };

//       const encodedParams = Object.keys(params)
//         .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
//         .join('&');

//       const requestOptions = {
//         method: 'GET'
//       };

//       const response = await fetch(`https://api.marketaux.com/v1/news/all?${encodedParams}`, requestOptions);
//       const newsData = await response.json();
//       this.setState({ newsData });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   render() {
//     const { newsData } = this.state;

//     // if (!Array.isArray(newsData) || newsData.length === 0) {
//     //   return <div>Loading...</div>;
//     // }
//     // else

//     return (
//       <div>
//         <div className="img-wrapper">
//          <img src={Newsfeed} alt="Newsfeed" className='nav-img' />
//         </div>
//         {newsData.length > 0 && newsData.map((article, index) => (
//           <Article key={index} articleInfo={article} />
//         ))}
//       </div>
//     );
//   }
// }

// export default NewsComponent;






