Stock Trading App

A React front end for a paper stock-trading web app, built as a project for the Coding Temple software engineering bootcamp (2023). Users can sign up, log in, view their account balance, buy and sell stocks, manage watchlists, check stock quotes, and read market news.

The front end talks to a companion Flask REST API running at http://localhost:5000. That back end is not included in this repository, so most pages need it running to show data.

Features
Sign up and log in — Material UI forms; credentials are sent to the API and stored for later requests using HTTP Basic authentication.
Buy stock — enter a symbol and quantity, see your current cash balance, and view your order history.
Trade (sell positions) — list your open positions and sell shares, with checks for invalid quantities and selling more shares than you own.
Watchlists — search, add, and remove symbols from your watchlists.
Market data — look up quotes for a stock symbol.
News — show market news headlines from the API.
Navigation — Bootstrap navbar with links to each page.
Getting Started
Prerequisites
Node.js (version 16 or later recommended) and npm
The companion Flask API running at http://localhost:5000 (not included here)
Installation
bash
git clone https://github.com/arou21/Trading-App.git
cd Trading-App
npm install

Create a .env file in the project root with the API address:

REACT_APP_API_URI=http://localhost:5000/

Then start the development server:

bash
npm start

The app opens at http://localhost:3000.

Pages
Path	Page	What it does
/signup	Signup	Create an account
/signIn	Login	Log in and save credentials
/buystock	Buystock	Place buy orders and view order history
/trade	Trade	View positions and sell shares
/Stockwatch	Stockwatch	Manage watchlists
/marketdata	MarketData	Look up stock quotes
/news	News	Read market news
/account	Account	Account page (currently disabled; see Known Issues)
API Endpoints Used

The front end expects these endpoints on the Flask API:

Method	Endpoint	Used by
POST	/api/signup	Signup
POST	/api/login	Login
GET	/account	Buystock, Trade
GET	/positions	Trade
GET	/sell-position	Trade
GET	/api/orders	Buystock
POST	/api/buystock	Buystock
GET, POST	/api/watchlist	Stockwatch
DELETE	/api/watchlist/:id	Stockwatch
GET	/stock-quotes/:symbol	MarketData
GET	/api/news	News

The account and position data shapes in index.d.ts (cash, buying power, position quantity, unrealized profit and loss) follow a paper-trading brokerage account format.

Project Structure
Trading-App/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Routes and login state
│   ├── api.js          # Account, positions, and sell API calls
│   ├── fetch.js        # Shared fetch wrapper with Basic auth
│   ├── component/      # Nav, Article, LogOutButton
│   └── views/          # One file per page
├── index.d.ts          # Account and position data types
└── package.json
Built With
React 18 (Create React App)
React Router 6
Material UI
Bootstrap 5 and React Bootstrap
Axios
Back end (separate): Flask with a hosted PostgreSQL database
Known Issues and Possible Improvements
Account page is disabled. src/views/Account.js is fully commented out, so /account will not render. Restore the page or remove its route and nav link.
Market data URL is not filled in. MarketData.js builds the URL with regular quotes, so ${symbol} is sent literally. Use backticks for a template string.
Selling ignores the quantity. api.sellPosition doesn't send the quantity or symbol to the API. Send them as a POST body.
Watchlist delete uses a relative URL (/api/watchlist/...), so it goes to the React dev server instead of the API.
API address is hard-coded in several views instead of using REACT_APP_API_URI.
Credentials are stored in localStorage as Basic auth. A token-based login (for example, JWT) would be safer.
No automated tests yet. test/test.js is a copy of Trade.js, not a test suite.
Cleanup: remove the unused files src/Untitled-1.yml and src/Untitled-2.jl.