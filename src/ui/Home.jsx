"use client";

import { useAuthCont } from "../context/AuthContext";
import FishCard from "../components/FishCard/FishCard";
import axios from "axios";

import './Home.css';
import './Mobile.css';
import { useEffect, useState } from "react";

const Home = () => {
  const { isAuth, user } = useAuthCont();
  const [ fishes, setFishes ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);
  async function getFavoriteFishes() {
    if(fishes.length) return
    const API_URL = "http://localhost:9000";

    const parsedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const fetchedFishes = await axios.get(`${API_URL}/fishes`);
    console.log(fetchedFishes, 'kkkk')
    setFishes(fetchedFishes?.data)
    setFavorites(parsedFavorites)
  }

  useEffect(() => {
    getFavoriteFishes();
  }, []);
  return (
    <div className="home">
      <h1 className="home-title">
        Welcome to Fishes App 🐟{" "}
        <span className="firstname">{isAuth ? user.firstName : ""}</span>
      </h1>
      {favorites && favorites.length > 0 ? (
        <div className="favorite-fishes">
          <h2 className="home-title-favorites">Your Favorite Fishes:</h2>
          <div className="favorite-fishes-container">
            {favorites.map((fishId) => {
              const fish = fishes?.find((f) => f.id === fishId);
              return fish ? (
                <FishCard
                  key={fish.id}
                  id={fish.id}
                  img={fish?.illustrationPhoto?.src || fish?.img}
                  name={fish.name}
                  region={fish.region}
                  scientificName={fish.scientificName}
                />
              ) : null;
            })}
          </div>
        </div>
      ) : (
        <p>You don't have any favorite fishes yet.</p>
      )}
    </div>
  );
};

export default Home;
