import React, { useState } from "react";

// Initial raw material and chemical stock
const INITIAL_RUBBER_STOCK = {
  "Tyre compound": 500,
  "Dhaga rubber": 300,
  "Cushion compound": 400,
  RMA: 200,
};

const INITIAL_CHEMICALS_STOCK = {
  Sulphur: 100,
  "Zinc oxide": 80,
  "Steric acid": 50,
  CBS: 30,
};

// Formulas for each order
const FORMULAS = {
  ELAST231202401: {
    rubber: { "Tyre compound": 2, "Dhaga rubber": 1 },
    chemicals: { Sulphur: 0.5, CBS: 0.2 },
  },
  ELAST231202402: {
    rubber: { "Cushion compound": 1.5, RMA: 1 },
    chemicals: { "Zinc oxide": 0.3, "Steric acid": 0.4 },
  },
  ELAST231202403: {
    rubber: { "Tyre compound": 1, RMA: 0.5 },
    chemicals: { Sulphur: 0.2, CBS: 0.1 },
  },
};

const Production = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "ELAST231202401",
      name: "Order 1",
      ordered: 100,
      manufactured: 0,
      rejected: 0,
      dispatchReady: false,
    },
    {
      id: 2,
      orderId: "ELAST231202402",
      name: "Order 2",
      ordered: 80,
      manufactured: 0,
      rejected: 0,
      dispatchReady: false,
    },
    {
      id: 3,
      orderId: "ELAST231202403",
      name: "Order 3",
      ordered: 60,
      manufactured: 0,
      rejected: 0,
      dispatchReady: false,
    },
  ]);

  const [rubberStock, setRubberStock] = useState(INITIAL_RUBBER_STOCK);
  const [chemicalsStock, setChemicalsStock] = useState(INITIAL_CHEMICALS_STOCK);

  // Handle changes to manufactured or rejected quantities
  const handleInputChange = (id, field, value) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, [field]: Number(value) } : order
      )
    );
  };

  // Deduct inventory and update dispatch status
  const handleMoveToDispatch = (id) => {
    const order = orders.find((o) => o.id === id);
    const formula = FORMULAS[order.orderId];
    const totalQuantity = order.manufactured + order.rejected;

    if (!formula) {
      alert(`Formula for Order ID ${order.orderId} not found.`);
      return;
    }

    // Deduct rubber stock
    const newRubberStock = { ...rubberStock };
    for (const [material, perUnit] of Object.entries(formula.rubber)) {
      const required = perUnit * totalQuantity;
      if (newRubberStock[material] < required) {
        alert(`Insufficient stock for ${material}.`);
        return;
      }
      newRubberStock[material] -= required;
    }

    // Deduct chemicals stock
    const newChemicalsStock = { ...chemicalsStock };
    for (const [material, perUnit] of Object.entries(formula.chemicals)) {
      const required = perUnit * totalQuantity;
      if (newChemicalsStock[material] < required) {
        alert(`Insufficient stock for ${material}.`);
        return;
      }
      newChemicalsStock[material] -= required;
    }

    setRubberStock(newRubberStock);
    setChemicalsStock(newChemicalsStock);

    // Update order status
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === id
          ? {
              ...o,
              dispatchReady: true,
            }
          : o
      )
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Production Page</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>Ordered Quantity</th>
            <th>Manufactured Quantity</th>
            <th>Rejected Quantity</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>{order.name}</td>
              <td>{order.ordered}</td>
              <td>
                <input
                  type="number"
                  value={order.manufactured}
                  onChange={(e) =>
                    handleInputChange(order.id, "manufactured", e.target.value)
                  }
                  disabled={order.dispatchReady}
                  style={{ width: "100px" }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={order.rejected}
                  onChange={(e) =>
                    handleInputChange(order.id, "rejected", e.target.value)
                  }
                  disabled={order.dispatchReady}
                  style={{ width: "100px" }}
                />
              </td>
              <td>
                <button
                  onClick={() => handleMoveToDispatch(order.id)}
                  disabled={
                    order.dispatchReady || order.manufactured !== order.ordered
                  }
                >
                  {order.dispatchReady ? "Dispatched" : "Move to Dispatch"}
                </button>
              </td>
              <td>
                {order.dispatchReady ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Ready for Dispatch
                  </span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Pending
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Production;
