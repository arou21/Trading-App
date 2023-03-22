import React, { useState, useEffect } from 'react';

function Watchlist() {
  const [watchlists, setWatchlists] = useState([]);
  const [name, setName] = useState('');
  const [symbols, setSymbols] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWatchlists = async () => {
    const response = await fetch(`http://localhost:5000/api/watchlist?q=${searchTerm}`);
    const data = await response.json();
    setWatchlists(data);
  };

  const createWatchlist = async () => {
    await fetch('http://localhost:5000/api/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        symbols
      })
    });
    fetchWatchlists();
  };

  const deleteWatchlist = async (watchlistId) => {
    await fetch(`/api/watchlist/${watchlistId}`, {
      method: 'DELETE'
    });
    fetchWatchlists();
  };

  useEffect(() => {
    fetchWatchlists();
  }, [searchTerm]);

  return (
    <div>
      <h1>Watchlists</h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchWatchlists(); }}>
        <label>
          Search:
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {watchlists.map(watchlist => (
          <li key={watchlist.id}>
            <h3>{watchlist.name}</h3>
            <p>{watchlist.symbols.join(', ')}</p>
            <button onClick={() => deleteWatchlist(watchlist.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create Watchlist</h2>
      <form onSubmit={(e) => { e.preventDefault(); createWatchlist(); }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Symbols (comma-separated):
          <input type="text" value={symbols} onChange={(e) => setSymbols(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Watchlist;
