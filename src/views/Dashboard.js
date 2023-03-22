// import React, { Component } from 'react';
// import Article from '../component/Article';
// import Dashboard from "../images/Dashboard.jpg";

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
//          <img src={Dashboard} alt="Dashboard" className='nav-img' />
//         </div>
//         {newsData.length > 0 && newsData.map((article, index) => (
//           <Article key={index} articleInfo={article} />
//         ))}
//       </div>
//     );
//   }
// }

// export default NewsComponent;