'use client'

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import "./CreateFishForm.css";
import Modal from '../Modal/Modal';
import { useRouter, useParams } from 'next/navigation';



const API_URL = "http://localhost:9000";

const CreateFishForm = ({ isEdit = false, fishesState }) => {
  const { id } = useParams();

  const router = useRouter();

  const valueInputRef = useRef(null);
  useEffect(() => {
    valueInputRef.current.focus();
  }, []);

  const [isDisabled, setIsDisabled] = useState(true);
  const [fishForm, setFishForm] = useState({
    id: id || Math.random() + "",
    region: "",
    scientificName: "",
    name: "",
    img: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const existingFish = fishesState.fishList.find((fish) => fish.id === id);
      if (existingFish) {
        setFishForm(existingFish);
      }
    }
  }, [isEdit, id, fishesState]);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsDisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateForm();
    setFormErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        let updatedFish;
        if (isEdit) {
          updatedFish = await axios.put(
            `${API_URL}/fishes/${fishForm.id}`,
            fishForm
          );
        } else {
          updatedFish = await axios.post(`${API_URL}/fishes`, fishForm);
        }
        console.log(
          isEdit ? "Updated Fish" : "New Created Fish",
          updatedFish.data
        );
        router.push("/fishes");
      } catch (error) {
        console.error(
          isEdit ? "Failed to update fish" : "Failed to create fish",
          error
        );
      } finally {
        setLoading(false);
      }
      setFishForm({
        id: Math.random() + "",
        region: "",
        scientificName: "",
        name: "",
        img: "",
      });
    } else {
      console.log("Form is invalid");
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (fishForm.region.trim() === "") {
      errors.region = "Region is required!";
    }

    if (fishForm.scientificName.trim() === "") {
      errors.scientificName = "ScientificName is required!";
    }

    if (fishForm.name.trim() === "") {
      errors.name = "Name is required!";
    }

    if (fishForm.img === "") {
      errors.img = "Image URL is required!";
    }

    return errors;
  };

  const handleClose = () => {
    router.push("/fishes");
  };

  return (
    <Modal onClose={() => handleClose()}>
      <form onSubmit={handleSubmit} className="create-fish-form">
        <label className="create-fish-form-label">
          Region:
          <input
            type="text"
            name="region"
            value={fishForm.region || ''}
            onChange={handleChange}
            ref={valueInputRef}
            className="create-fish-form-input"
          />
        </label>
        {formErrors.region && (
          <span className="create-fish-form-error">{formErrors.region}</span>
        )}
        <br />
        <br />
        <label className="create-fish-form-label">
          ScientificName:
          <input
            type="text"
            name="scientificName"
            value={fishForm.scientificName || ''}
            onChange={handleChange}
            className="create-fish-form-input"
          />
          {formErrors.scientificName && (
            <span className="create-fish-form-error">
              {formErrors.scientificName}
            </span>
          )}
        </label>
        <br />
        <br />
        <label className="create-fish-form-label">
          Name:
          <input
            type="text"
            name="name"
            value={fishForm.name || ''}
            onChange={handleChange}
            className="create-fish-form-input"
          />
          {formErrors.name && (
            <span className="create-fish-form-error">{formErrors.name}</span>
          )}
        </label>
        <br />
        <br />
        <label className="create-fish-form-label">
          Image URL:
          <input
            type="text"
            name="img"
            value={fishForm?.img || fishForm?.illustrationPhoto?.src || ''}
            onChange={handleChange}
            className="create-fish-form-input"
          />
          {formErrors.img && (
            <span className="create-fish-form-error">{formErrors.img}</span>
          )}
        </label>
        <br />
        <br />
        <div className="button-with-spinner">
          <button
            disabled={isDisabled}
            type="submit"
            className="create-fish-form-button"
          >
            {isEdit ? "Update Fish" : "Create Fish"}
          </button>
          {loading && <div className="loading-spinner"></div>}
        </div>
      </form>
    </Modal>
  );
};

export default CreateFishForm;
