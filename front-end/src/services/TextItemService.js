import axios from 'axios';

const API_URL = 'http://localhost:8080/textitems';

export const getTextItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching text items:', error);
    throw new Error('Failed to fetch items.');
  }
};

export const createTextItem = async (content) => {
  try {
    const response = await axios.post(API_URL, { content });
    alert('Item added successfully!'); 
    return response.data;
  } catch (error) {
    console.error('Error creating text item:', error);
    alert('Failed to add item. Please try again.');   
    throw new Error('Failed to add item.');
  }
};

export const updateTextItem = async (id, content) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { content });
    alert('Item updated successfully!'); 
    return response.data;
  } catch (error) {
    console.error('Error updating text item:', error);
    alert('Failed to update item. Please try again.'); 
    throw new Error('Failed to update item.');
  }
};

export const deleteTextItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    alert('Item deleted successfully!'); 
  } catch (error) {
    console.error('Error deleting text item:', error);
    alert('Failed to delete item. Please try again.'); 
    throw new Error('Failed to delete item.');
  }
};
