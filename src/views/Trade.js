import React, { Component, useCallback, useEffect, useState } from "react";
import Article from "../component/Article";

import { Api } from "../api";
import { Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";

export default function Trade() {
  const [account, setAccount] = useState(/** @type {IAccount} */ (null));
  const [positions, setPositions] = useState(/** @type {IPosition[]}*/ ([]));
  const [sellQty, setSellQty] = useState(null);

  const getPositions = useCallback(() => Api.getPositions().then(setPositions), []);
  const getAccount = useCallback(() => Api.getAccount().then(setAccount), []);

  const sellPosition = (qty,symbol)=>{
    //make sll request to backend
    Api.sellPosition(qty,symbol)
    .then(getPositions())
  }

  useEffect(() => {
    getPositions();
    getAccount();
  }, []);

  return (
    <Stack padding={10} gap={5}>
      {/* balance */}
      <Stack direction="row">
        <TextField label="Current Balance" value={account?.cash}></TextField>
        <Button onClick={getPositions}>reload</Button>
      </Stack>

      {/* list of positions */}
      <Stack direction="column" gap={5}>
        {positions?.map((position) => {
          return (
            <Stack direction="row" gap={2}>
              {Object.entries(position).map(([key, value]) => (
                <TextField value={value} label={key} key={key} disabled></TextField>
              ))}
              <TextField label="Sell Qty" value={sellQty} onChange={(e) => setSellQty(e.target.valu)}></TextField>
              <Button onClick={() => sellPosition(sellQty, position.symbol)}>sell</Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

// class NewsComponent extends Component {
//   state = {
//     newsData: [],
//   };

//   componentDidMount() {
//     this.getNewsData();
//   }

//   async getNewsData() {
//     try {
//       const apiToken = "D3tkz0oplu4NP8gJ1xcvKuHRXsTWK0jz7SCrNyGS";
//       const symbols = "msft,fb";
//       const limit = "50";

//       const params = {
//         api_token: apiToken,
//         symbols: symbols,
//         limit: limit,
//       };

//       const encodedParams = Object.keys(params)
//         .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
//         .join("&");

//       const requestOptions = {
//         method: "GET",
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
//           <img src={Newsfeed} alt="Newsfeed" className="nav-img" />
//         </div>
//         {newsData.length > 0 && newsData.map((article, index) => <Article key={index} articleInfo={article} />)}
//       </div>
//     );
//   }
// }

// export default NewsComponent;
