import React, { useState } from 'react';

const TestComponent = () => {
  // State for dynamic options and selections
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [pieces, setPieces] = useState([]);
  const [sizeName, setSizeName] = useState('');
  const [colorName, setColorName] = useState('');
  const [pieceCount, setPieceCount] = useState(1);
  const [basePrice, setBasePrice] = useState(0);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPieces, setSelectedPieces] = useState(1);


  const [error, setError] = useState('');

  // Function to calculate the price based on selections
  const calculatePrice = () => {
    let price = basePrice;

    const size = sizes.find(size => size.name === selectedSize);
    const color = colors.find(color => color.name === selectedColor);

    if (size) price += size.price;
    if (color) price += color.price;

    return price * selectedPieces;
  };

  // Add new size
  const handleAddSize = () => {
    if (sizeName && !sizes.some(size => size.name === sizeName)) {
      setSizes([...sizes, { name: sizeName, price: 10 }]); // Default price of 10
      setSizeName('');
    } else {
      setError('Size is either invalid or already exists.');
    }
  };

  // Add new color
  const handleAddColor = () => {
    if (colorName && !colors.some(color => color.name === colorName)) {
      setColors([...colors, { name: colorName, price: 5 }]); // Default price of 5
      setColorName('');
    } else {
      setError('Color is either invalid or already exists.');
    }
  };

  // Add new piece option
  const handleAddPieceOption = () => {
    if (pieceCount >= 1 && !pieces.includes(pieceCount)) {
      setPieces([...pieces, pieceCount]);
      setPieceCount(1);
    } else {
      setError('Invalid piece count or piece already exists.');
    }
  };

  // Handle size selection
  const handleSizeSelection = (event) => {
    setSelectedSize(event.target.value);
    setError('');
  };

  // Handle color selection
  const handleColorSelection = (event) => {
    setSelectedColor(event.target.value);
    setError('');
  };

  // Handle pieces selection
  const handlePiecesSelection = (event) => {
    setSelectedPieces(Number(event.target.value));
    setError('');
  };

  return (
    <div>
      <h2>Product Variants Selector</h2>

      {/* User-defined size input */}
      <div>
        <label>Size (e.g., small, medium, large)</label>
        <input
          type="text"
          value={sizeName}
          onChange={(e) => setSizeName(e.target.value)}
          placeholder="Enter size"
          className="input input-bordered input-sm ml-2"
        />
        <button className="btn btn-sm ml-2" type="button" onClick={handleAddSize}>Add Size</button>
      </div>

      {/* User-defined color input */}
      <div>
        <label>Color (e.g., red, blue, green)</label>
        <input
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          placeholder="Enter color"
          className="input input-bordered input-sm ml-2"
        />
        <button className="btn btn-sm ml-2" type="button" onClick={handleAddColor}>Add Color</button>
      </div>

      {/* User-defined pieces input */}
      <div>
        <label>Pieces</label>
        <input
          type="number"
          min="1"
          value={pieceCount}
          onChange={(e) => setPieceCount(Number(e.target.value))}
          placeholder="Enter pieces"
          className="input input-bordered input-sm ml-2"
        />
        <button className="btn btn-sm ml-2" type="button" onClick={handleAddPieceOption}>Add Piece</button>
      </div>

      <hr className="my-5" />

      {/* Selection for size, color, and pieces */}
      <div>
        <label>Selected Size</label>
        <h2>{selectedSize}</h2>
        <div className="flex justify-evenly">
          {sizes.map((size, index) => (
            <span className="badge badge-primary" key={index} value={size.name}>{size.name}</span>
          ))}
        </div>
      </div>

      <div>
        <label>Selected Color</label>
        <div className="flex justify-evenly">
          {colors.map((color, index) => (
            <span className="badge badge-primary" key={index}>{color.name}</span>
          ))}
        </div>
      </div>

      <div>
        <label>Selected Pieces</label>
        <div className="flex justify-evenly">
          {pieces.map((piece, index) => (
            <span className="badge badge-primary" key={index} value={piece}>{piece}</span>
          ))}
        </div>
      </div>

      <hr />

      {/* Display the calculated price */}
      <div>
        <h3>Total Price: ${calculatePrice()}</h3>
      </div>

      {/* Display error message if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Button to add to cart */}
      <button
        type="button"
        disabled={error || !selectedSize || !selectedColor || !selectedPieces}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default TestComponent;
