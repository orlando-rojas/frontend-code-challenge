import React from "react";

export default function PokemonCard({ item, filterValue }) {
  return (
    <li key={item.Number}>
      <img src={item.img} alt="" />
      <div className="info">
        <h1
          dangerouslySetInnerHTML={{
            __html: item.Name.replace(
              new RegExp(filterValue, "gi"),
              (match) => `<span class="match">${match}</span>`
            ),
          }}
        ></h1>
        {item.Types.map((type, i) => (
          <span className="type electric" key={i}>
            {type}
          </span>
        ))}
      </div>
    </li>
  );
}
