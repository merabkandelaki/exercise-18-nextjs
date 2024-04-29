"use client";

import axios from 'axios';
import { useEffect, useState } from "react";
import Image from 'next/image';
import Modal from "../Modal/Modal";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useAuthCont } from '../../context/AuthContext';
import './FishCard.css';

const API_URL = "http://localhost:9000";

const FishCard = ({
  img,
  name,
  region,
  scientificName,
  id,
  dispatchFishes,
  loading: globalLoading,
  isHomePage = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuth } = useAuthCont();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: queryId } = useParams();
  const fishIdQueryParam = searchParams?.get("id");
  const [isShowing, setIsShowing] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(id));
  }, [id, isHomePage, fishIdQueryParam, queryId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favId) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const closeModal = () => {
    setIsShowing(false);
    setSearchParams({});
  };

  const handleStarClick = async () => {
    if (stars > 9) return;
    setStars(stars + 1);
  };

  const renderStars = () => {
    let starIcons = "";
    for (let i = 0; i < stars; i++) {
      starIcons += "⭐";
    }
    return starIcons;
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/fishes/${id}`);
      dispatchFishes({ type: "REMOVE_FISH", payload: id });
      setLoading(false);
    } catch (error) {
      console.error('Error deleting fish:', error);
      setLoading(false);
    }
  };
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/fishes/edit/${id}`);
  };

  return (
    <>
      <div className="fish" onClick={() => setIsShowing(true)}>
        <div
          className="button-favorit"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        >
          {isFavorite ? '⭐' : '☆'}
        </div>
        <Image className="img" src={img} alt={name} width={200} height={200} />
        <div className="description">
          <p className="description-title">
            Name: <span className="description-title-value">{name}</span>
          </p>
          <p className="description-title">
            Region: <span className="description-title-value">{region}</span>
          </p>
          <p className="description-title">
            Scientificname:{" "}
            <span className="description-title-value">{scientificName}</span>
          </p>
          <div className="buttons">
            {isAuth && !isFavorite && (
              <>
                <button
                  className="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleEdit();
                  }}
                >
                  Edit
                </button>
                {loading || globalLoading ? (
                  <div className="loading-delete">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <button
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isShowing && (
        <Modal onClose={closeModal}>
          <Image src={img} alt={name} width={200} height={200} />
          <p className="modal-name">Name: {name}</p>
          <span className="stars">
            Stars: {renderStars()}
            <span className="emoji-star">{stars}</span>
            <button className="like" onClick={handleStarClick}>
              👍
            </button>
          </span>
        </Modal>
      )}
    </>
  );
};

export default FishCard;
