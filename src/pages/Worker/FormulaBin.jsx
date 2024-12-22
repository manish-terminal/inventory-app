import React, { useState } from "react";
import "./FormulaBin.css";

const RUBBER_INGREDIENTS = [
  { name: "Tyre compound", rate: 105 },
  { name: "Dhaga rubber", rate: 105 },
  { name: "Cushion compound", rate: 110 },
];

const CHEMICALS = [
  { name: "Sulphur", rate: 38 },
  { name: "Zinc oxide", rate: 225 },
  { name: "Steric acid", rate: 120 },
];

const FormulaBin = () => {
  const [formulas, setFormulas] = useState([]);
  const [currentFormulaName, setCurrentFormulaName] = useState("");
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the formula being edited

  const addRow = () => {
    setCurrentIngredients([
      ...currentIngredients,
      { type: "rubber", name: "", weight: 0 },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...currentIngredients];
    updatedIngredients[index][field] = value;
    setCurrentIngredients(updatedIngredients);
  };

  const removeRow = (index) => {
    const updatedIngredients = [...currentIngredients];
    updatedIngredients.splice(index, 1);
    setCurrentIngredients(updatedIngredients);
  };

  const saveFormula = () => {
    if (!currentFormulaName.trim()) {
      alert("Please enter a formula name.");
      return;
    }

    if (currentIngredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    if (editingIndex !== null) {
      // Update the existing formula
      const updatedFormulas = [...formulas];
      updatedFormulas[editingIndex] = {
        name: currentFormulaName,
        ingredients: currentIngredients,
      };
      setFormulas(updatedFormulas);
      setEditingIndex(null);
    } else {
      // Add a new formula
      setFormulas([
        ...formulas,
        { name: currentFormulaName, ingredients: currentIngredients },
      ]);
    }

    // Reset the form
    setCurrentFormulaName("");
    setCurrentIngredients([]);
  };

  const deleteFormula = (index) => {
    const updatedFormulas = [...formulas];
    updatedFormulas.splice(index, 1);
    setFormulas(updatedFormulas);
  };

  const editFormula = (index) => {
    const formula = formulas[index];
    setCurrentFormulaName(formula.name);
    setCurrentIngredients(formula.ingredients);
    setEditingIndex(index);
  };

  return (
    <div className="formula-bin-container">
      <h2>Formula Bin</h2>

      <div className="formula-creation">
        <h3>{editingIndex !== null ? "Edit Formula" : "Create Formula"}</h3>

        <label>
          Formula Name:
          <input
            type="text"
            value={currentFormulaName}
            onChange={(e) => setCurrentFormulaName(e.target.value)}
            placeholder="Enter formula name"
            className="formula-name-input"
          />
        </label>

        <div className="ingredients-table">
          <div className="table-header">
            <div>Type</div>
            <div>Ingredient</div>
            <div>Weight (kg)</div>
            <div>Actions</div>
          </div>
          {currentIngredients.map((ingredient, index) => (
            <div className="table-row" key={index}>
              <select
                value={ingredient.type}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
              >
                <option value="rubber">Rubber</option>
                <option value="chemical">Chemical</option>
              </select>

              <select
                value={ingredient.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              >
                <option value="">Select Ingredient</option>
                {(ingredient.type === "rubber"
                  ? RUBBER_INGREDIENTS
                  : CHEMICALS
                ).map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Weight (kg)"
                value={ingredient.weight}
                onChange={(e) =>
                  handleInputChange(index, "weight", parseFloat(e.target.value))
                }
              />

              <button onClick={() => removeRow(index)}>Remove</button>
            </div>
          ))}
        </div>

        <button onClick={addRow} className="add-row-btn">
          Add Row
        </button>
        <button onClick={saveFormula} className="save-formula-btn">
          {editingIndex !== null ? "Update Formula" : "Save Formula"}
        </button>
      </div>

      <div className="formula-list">
        <h3>Saved Formulas</h3>
        {formulas.length === 0 ? (
          <p>No formulas saved yet.</p>
        ) : (
          <ul>
            {formulas.map((formula, index) => (
              <li key={index}>
                <strong>{formula.name}</strong>
                <ul>
                  {formula.ingredients.map((ingredient, i) => (
                    <li key={i}>
                      {ingredient.type === "rubber" ? "Rubber" : "Chemical"}:{" "}
                      {ingredient.name} - {ingredient.weight} kg
                    </li>
                  ))}
                </ul>
                <button onClick={() => editFormula(index)}>Edit</button>
                <button onClick={() => deleteFormula(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormulaBin;
