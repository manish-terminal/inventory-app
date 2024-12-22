import React, { useState } from "react";
import "./addorder.css";

const RUBBER_INGREDIENTS = [
  { name: "Tyre compound", rate: 105 },
  { name: "Dhaga rubber", rate: 105 },
  { name: "Cushion compound", rate: 110 },
  { name: "RMA", rate: 195 },
];

const CHEMICALS = [
  { name: "Sulphur", rate: 38 },
  { name: "Zinc oxide", rate: 225 },
  { name: "Steric acid", rate: 120 },
  { name: "CBS", rate: 510 },
];

function AddOrder() {
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [weightPerProduct, setWeightPerProduct] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedRubberIngredients, setSelectedRubberIngredients] = useState(
    []
  );
  const [selectedChemicals, setSelectedChemicals] = useState([]);

  const addIngredient = (type) => {
    const newIngredient = { name: "", weight: 0 };
    if (type === "rubber") {
      setSelectedRubberIngredients([
        ...selectedRubberIngredients,
        newIngredient,
      ]);
    } else {
      setSelectedChemicals([...selectedChemicals, newIngredient]);
    }
  };
  const [deliveryDate, setDeliveryDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const removeIngredient = (type, index) => {
    if (type === "rubber") {
      const updatedRubberIngredients = [...selectedRubberIngredients];
      updatedRubberIngredients.splice(index, 1);
      setSelectedRubberIngredients(updatedRubberIngredients);
    } else {
      const updatedChemicals = [...selectedChemicals];
      updatedChemicals.splice(index, 1);
      setSelectedChemicals(updatedChemicals);
    }
  };

  const totalRubberCost = selectedRubberIngredients.reduce(
    (total, ingredient) => {
      const rubber = RUBBER_INGREDIENTS.find((r) => r.name === ingredient.name);
      return rubber ? total + rubber.rate * ingredient.weight : total;
    },
    0
  );

  const totalChemicalCost = selectedChemicals.reduce((total, chemical) => {
    const chem = CHEMICALS.find((c) => c.name === chemical.name);
    return chem ? total + chem.rate * chemical.weight : total;
  }, 0);

  const totalWeightRequired = weightPerProduct * quantity;
  const totalCost = totalRubberCost + totalChemicalCost;

  return (
    <div className="add-order-container">
      <div className="add-order-content">
        <h2>Order Input Page</h2>

        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>

        <div>
          <label>Weight per Product (kg):</label>
          <input
            type="number"
            value={weightPerProduct}
            onChange={(e) => setWeightPerProduct(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <h3>Rubber Ingredients</h3>
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Weight (kg)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedRubberIngredients.map((ingredient, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={ingredient.name}
                    onChange={(e) => {
                      const updatedIngredients = [...selectedRubberIngredients];
                      updatedIngredients[index].name = e.target.value;
                      setSelectedRubberIngredients(updatedIngredients);
                    }}
                  >
                    <option value="">Select</option>
                    {RUBBER_INGREDIENTS.map((rubber, i) => (
                      <option key={i} value={rubber.name}>
                        {rubber.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Weight"
                    value={ingredient.weight}
                    onChange={(e) => {
                      const updatedIngredients = [...selectedRubberIngredients];
                      updatedIngredients[index].weight = Number(e.target.value);
                      setSelectedRubberIngredients(updatedIngredients);
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => removeIngredient("rubber", index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => addIngredient("rubber")}>
          Add Rubber Ingredient
        </button>

        <h3>Chemicals</h3>
        <table>
          <thead>
            <tr>
              <th>Chemical</th>
              <th>Weight (kg)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedChemicals.map((chemical, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={chemical.name}
                    onChange={(e) => {
                      const updatedChemicals = [...selectedChemicals];
                      updatedChemicals[index].name = e.target.value;
                      setSelectedChemicals(updatedChemicals);
                    }}
                  >
                    <option value="">Select</option>
                    {CHEMICALS.map((chem, i) => (
                      <option key={i} value={chem.name}>
                        {chem.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Weight"
                    value={chemical.weight}
                    onChange={(e) => {
                      const updatedChemicals = [...selectedChemicals];
                      updatedChemicals[index].weight = Number(e.target.value);
                      setSelectedChemicals(updatedChemicals);
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => removeIngredient("chemical", index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => addIngredient("chemical")}>Add Chemical</button>
        {/* New Delivery Date Field */}
        <div>
          <label>Delivery Date:</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>

        {/* New Remarks Field */}
        <div>
          <label>Remarks:</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows="3"
          />
        </div>

        <h3>Summary</h3>
        <p>Item Name: {itemName}</p>
        {/* <p>Total Rubber Cost: Rs {totalRubberCost}</p>
        <p>Total Chemical Cost: Rs {totalChemicalCost}</p>
        <p>Total Compound Cost: Rs {totalCost}</p> */}
        <p>Total Weight Required: {totalWeightRequired} kg</p>

        <p>Delivery Date: {deliveryDate}</p>
        <p>Remarks: {remarks}</p>

        <button onClick={() => window.print()}>Print</button>
        <button onClick={() => window.location.reload()}>Clear</button>
      </div>
    </div>
  );
}

export default AddOrder;
