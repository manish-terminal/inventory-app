import React, { useState } from "react";
import "./Inventory.css";

const initialRubberIngredients = [
  { name: "Tyre compound", rate: 105, quantity: 0 },
  { name: "Dhaga rubber", rate: 105, quantity: 0 },
  { name: "Cushion compound", rate: 110, quantity: 0 },
  // ... Add other initial rubber/ingredients data here
];

const initialChemicals = [
  { name: "Sulphur", rate: 38, quantity: 0 },
  { name: "Zinc oxide", rate: 225, quantity: 0 },
  { name: "Steric acid", rate: 120, quantity: 0 },
  // ... Add other initial chemicals data here
];

const Inventory = () => {
  const [rubberIngredients, setRubberIngredients] = useState(
    initialRubberIngredients
  );
  const [chemicals, setChemicals] = useState(initialChemicals);
  const [isEditing, setIsEditing] = useState(false);

  const [newItem, setNewItem] = useState({ name: "", rate: 0, quantity: 0 });
  const [selectedCategory, setSelectedCategory] = useState("rubber");

  const handleQuantityChange = (index, category, value) => {
    if (category === "rubber") {
      const updatedRubbers = [...rubberIngredients];
      updatedRubbers[index].quantity = parseFloat(value) || 0;
      setRubberIngredients(updatedRubbers);
    } else {
      const updatedChemicals = [...chemicals];
      updatedChemicals[index].quantity = parseFloat(value) || 0;
      setChemicals(updatedChemicals);
    }
  };

  const handleRateChange = (index, category, value) => {
    if (category === "rubber") {
      const updatedRubbers = [...rubberIngredients];
      updatedRubbers[index].rate = parseFloat(value) || 0;
      setRubberIngredients(updatedRubbers);
    } else {
      const updatedChemicals = [...chemicals];
      updatedChemicals[index].rate = parseFloat(value) || 0;
      setChemicals(updatedChemicals);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAddNewItem = () => {
    const newInventoryItem = { ...newItem };
    if (selectedCategory === "rubber") {
      setRubberIngredients([...rubberIngredients, newInventoryItem]);
    } else {
      setChemicals([...chemicals, newInventoryItem]);
    }
    setNewItem({ name: "", rate: 0, quantity: 0 });
  };

  return (
    <div className="inventory-page">
      <h2>Inventory of Raw Materials</h2>

      <button onClick={handleEditToggle}>
        {isEditing ? "Save Changes" : "Edit Inventory"}
      </button>

      <div className="inventory-section">
        <h3>Rubber/Ingredients</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rate per Kg (₹)</th>
              <th>Available Quantity (Kg)</th>
            </tr>
          </thead>
          <tbody>
            {rubberIngredients.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleRateChange(index, "rubber", e.target.value)
                      }
                    />
                  ) : (
                    item.rate
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, "rubber", e.target.value)
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="inventory-section">
        <h3>Chemicals</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rate (₹)</th>
              <th>Available Quantity (Kg)</th>
            </tr>
          </thead>
          <tbody>
            {chemicals.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleRateChange(index, "chemical", e.target.value)
                      }
                    />
                  ) : (
                    item.rate
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, "chemical", e.target.value)
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-item-section">
        <h3>Add New Item</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="rubber">Rubber/Ingredients</option>
          <option value="chemical">Chemicals</option>
        </select>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rate per Kg"
          value={newItem.rate}
          onChange={(e) =>
            setNewItem({ ...newItem, rate: parseFloat(e.target.value) || 0 })
          }
        />
        <input
          type="number"
          placeholder="Available Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              quantity: parseFloat(e.target.value) || 0,
            })
          }
        />
        <button onClick={handleAddNewItem}>Add Item</button>
      </div>
    </div>
  );
};

export default Inventory;
