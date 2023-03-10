import React, { Component } from 'react';
import Article from '../component/Article';
import Newsfeed from "../images/Newsfeed.jpg";

class NewsComponent extends Component {
  state = {
    newsData: []
  }

  componentDidMount() {
    this.getNewsData();
  }

  async getNewsData() {
    try {
      const apiToken = 'D3tkz0oplu4NP8gJ1xcvKuHRXsTWK0jz7SCrNyGS';
      const symbols = 'msft,fb';
      const limit = '50';

      const params = {
        api_token: apiToken,
        symbols: symbols,
        limit: limit
      };

      const encodedParams = Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');

      const requestOptions = {
        method: 'GET'
      };

      const response = await fetch(`https://api.marketaux.com/v1/news/all?${encodedParams}`, requestOptions);
      const newsData = await response.json();
      this.setState({ newsData });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { newsData } = this.state;

    // if (!Array.isArray(newsData) || newsData.length === 0) {
    //   return <div>Loading...</div>;
    // }
    // else

    return (
      <div>
        <div className="img-wrapper">
         <img src={Newsfeed} alt="Newsfeed" className='nav-img' />
        </div>
        {newsData.length > 0 && newsData.map((article, index) => (
          <Article key={index} articleInfo={article} />
        ))}
      </div>
    );
  }
}

export default NewsComponent;
// import React, { Component } from 'react';
// import Article from '../component/Article';

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
//     return (
//       <div>
//         {this.state.newsData.map((article, index) => (
//           <Article key={index} articleInfo={article} />
//         ))}
//       </div>
//     );
//   }
// }

// export default NewsComponent;



// import React, { useState, useEffect } from 'react';

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/get_data')
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       <h1>Data from Flask Endpoint:</h1>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
// import React, { Component } from 'react';
// import axios from 'axios';

// class MyComponent extends Component {
//   componentDidMount() {
//     axios.get('http://127.0.0.1:5000/api/data')
//       .then(response => console.log(response))
//       .catch(error => console.log(error));
//   }

//   render() {
//     return (
//       <div>
//         {/* Component code */}
//       </div>
//     );
//   }
// }

// export default MyComponent;


// function App() {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     fetch('/api/get_latest_news')
//       .then(response => response.json())
//       .then(data => setNews(data.news))
//       .catch(error => console.log(error));
//   }, []);

//   return (
//     <div>
//       <h1>Latest News</h1>
//       <ul>
//         {news.map((article, index) => (
//           <li key={index}>
//             <h2>{article.headline}</h2>
//             <p>{article.summary}</p>
//             <a href={article.url}>Read More</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useRef, useState } from 'react';

// function App() {
//   const [news, setNews] = useState([]);
//   const socketRef = useRef();

//   useEffect(() => {
//     // Create a WebSocket connection to the Flask backend
//     socketRef.current = new WebSocket('ws://localhost:5000/stream');

//     // Handle incoming WebSocket messages
//     socketRef.current.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log(message);
//       setNews((oldNews) => [...oldNews, message]);
//     };

//     // Clean up the WebSocket connection on unmount
//     return () => socketRef.current.close();
//   }, []);

//   return (
//     <div>
//       <h1> Market News </h1>
//       {news.map((message, index) => (
//         <div key={index}>{message}</div>
//       ))}
//     </div>
//   );
// }

// export default App;






