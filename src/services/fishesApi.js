import axios from "axios";

const API_URL = "http://localhost:9000";

export const getFishes = async () => {
  try {
    const response = await axios.get(`${API_URL}/fishes`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch fishes");
  }
};

export const createFish = async (fishData) => {
  try {
    const response = await axios.post(`${API_URL}/fishes`, fishData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create fish");
  }
};

export const deleteFish = async (fishId) => {
  try {
    await axios.delete(`${API_URL}/fishes/${fishId}`);
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete fish");
  }
};

export const updateFish = async (fishId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/fishes/${fishId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update fish");
  }
};
