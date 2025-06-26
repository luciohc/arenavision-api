import React from 'react';

const players = [
  {
    id: 1,
    name: 'Adam Akimey',
    team: 'Helsingborg vs. Umeå',
    rating: 9.7,
    img: 'https://i.pravatar.cc/32?img=1',
  },
  {
    id: 2,
    name: 'Wessam Abou Ali',
    team: 'Porto vs. Al Ahly',
    rating: 9.3,
    img: 'https://i.pravatar.cc/32?img=2',
  },
  {
    id: 3,
    name: 'Achraf Hakimi',
    team: 'Seattle vs. PSG',
    rating: 8.7,
    img: 'https://i.pravatar.cc/32?img=3',
  },
  {
    id: 4,
    name: 'Facundo Ferrero',
    team: 'Nueva Chicago vs. Colón',
    rating: 8.7,
    img: 'https://i.pravatar.cc/32?img=4',
  },
  {
    id: 5,
    name: 'Yaqub Finey',
    team: 'Sundsvall vs. Trelleborg',
    rating: 8.7,
    img: 'https://i.pravatar.cc/32?img=5',
  },
];

function TopPlayers() {
  return (
    <div className="bg-gray-800 p-4 rounded shadow text-white mb-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Top Players</h2>

      {/* Heatmap Fake */}
      <div className="mb-3 flex justify-center">
        <img
          src="/heatmap.png"
          alt="Heatmap"
          className="rounded w-full max-w-xs"
        />
      </div>

      <ul>
        {players.map((player) => (
          <li
            key={player.id}
            className="flex items-center justify-between py-2 px-2 hover:bg-gray-700 rounded"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{player.id}.</span>
              <img
                src={player.img}
                alt={player.name}
                className="w-6 h-6 rounded-full"
              />
              <div>
                <span className="text-sm font-medium">{player.name}</span>
                <p className="text-xs text-gray-400">{player.team}</p>
              </div>
            </div>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
              {player.rating}
            </span>
          </li>
        ))}
      </ul>

      <div className="text-center mt-3">
        <button className="text-sm text-blue-400 hover:underline">Show more</button>
      </div>
    </div>
  );
}

export default TopPlayers;
