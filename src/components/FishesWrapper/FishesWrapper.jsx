"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import FishCard from "../FishCard/FishCard";
import "./FishesWrapper.css";
import fishesReducer from "./FishesReducer";
import "./Mobile.css";

const FishesWrapper = ({ fishes, children }) => {
  const router = useRouter();
  const [fishesState] = useReducer(fishesReducer, {
    fishList: fishes,
    loading: false,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFishes = fishesState.fishList?.filter((fish) =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="fishes-wrapper">
      <button
        className="create-fish"
        onClick={() => router.push("/fishes/create")}
      >
        Create Fish
      </button>
      <input
        type="text"
        placeholder="Search fishes..."
        value={searchTerm}
        onChange={handleSearch}
        className="search"
      />
      {children}
      <div className="fishes-container">
        {filteredFishes?.map((fish, id) => {
          return (
            <FishCard
              key={id}
              id={fish.id}
              img={fish?.illustrationPhoto?.src || fish?.img}
              name={fish.name}
              region={fish.region}
              scientificName={fish.scientificName}
              onCloseModal={() => router.push("/fishes")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FishesWrapper;
