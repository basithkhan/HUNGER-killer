import React, { useState } from "react";

const Card = (props) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedOption, setSelectedOption] = useState("default");

  const options = props.options || {};
  const priceOptions = Object.entries(options);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity >= 0 ? newQuantity : 0); // Prevent quantity from going below 0
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const calculateTotalAmount = () => {
    if (selectedOption !== "default") {
      const rate = options[selectedOption];
      return quantity * parseFloat(rate);
    }
    return 0;
  };

  return (
    <div className="mt-3" style={{ width: "18rem" }}>
      <div className="card">
        <img
          src={props.imgSrc}
          className="card-img-top img-fluid"
          alt="..."
          style={{ maxWidth: '100%', height: '120px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column align-items-start">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="form-control bg-success rounded"
                />
              </div>
              <div className="d-flex flex-column align-items-end">
                <select
                  className="form-select bg-success rounded"
                  onChange={handleOptionChange}
                >
                  <option value="default">Select Option</option>
                  {priceOptions.map(([key, value]) => (
                    <option key={key} value={key}>
                      {key} (${value})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="fs-5 mt-2" style={{ color: 'green' }}>Total Price: {calculateTotalAmount().toFixed(2)}</div>
            <hr style={{ backgroundColor: 'green' }} />
            {/* Add your "Add to Cart" button here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
