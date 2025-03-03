import React, { useState, useEffect } from "react";
import {
  getTextItems,
  createTextItem,
  updateTextItem,
  deleteTextItem,
} from "./services/TextItemService";
import "./App.css"; 

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getTextItems()
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (newItem.length > 120) {
      setError("Content exceeds 120 characters!");
    } else {
      setError("");
    }
  }, [newItem]);

  useEffect(() => {
    if (editValue.length > 120) {
      setError("Content exceeds 120 characters!");
    } else {
      setError("");
    }
  }, [editValue]);

  const handleCreate = () => {
    if (newItem && newItem.length <= 120) {
      createTextItem(newItem)
        .then((createdItem) => {
          setItems([...items, createdItem]);
          setNewItem("");
        })
        .catch((error) => console.error("Error creating item:", error));
    } else {
      alert("Content exceeds 120 characters!");
    }
  };

  const handleEdit = (id) => {
    const item = items.find((item) => item.id === id);
    setEditItem(item);
    setEditValue(item.content);
  };

  const handleSave = (id) => {
    if (editValue.length <= 120) {
      updateTextItem(id, editValue)
        .then(() => {
          const updatedItems = items.map((item) =>
            item.id === id ? { ...item, content: editValue } : item
          );
          setItems(updatedItems);
          setEditItem(null);
          setEditValue("");
        })
        .catch((error) => console.error("Error updating item:", error));
    } else {
      alert("Content exceeds 120 characters!");
    }
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setEditValue("");
  };

  const handleDelete = (id) => {
    deleteTextItem(id)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <div>
        <div className="input-button-container">
          <input
            type="add"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item"
          />
          <button onClick={handleCreate} disabled={!newItem}>
            Add Item
          </button>
        </div>
        {newItem.length > 120 && (
          <p style={{ color: "red" }}>Content exceeds 120 characters!</p>
        )}
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editItem?.id === item.id ? (
              <>
              <div>
                <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSave(item.id)}>Save</button>
                <button className="close-edit" onClick={handleCancelEdit}>
                  <i className="fas fa-times"></i> 
                </button>
                </div>
                
                {editValue.length > 120 && (
                  <p style={{ color: "red" }}>
                    Content exceeds 120 characters!
                  </p>
                )}
              </div>

              </>
            ) : (
              <>
                <span>{item.content}</span>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(item.id)} className="edit">
                    <i className="fas fa-edit"></i> 
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete"
                  >
                    <i className="fas fa-trash-alt"></i> 
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
