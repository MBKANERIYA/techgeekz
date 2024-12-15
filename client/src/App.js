import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [product, setProduct] = useState([]);
  const [grams, setGrams] = useState(2.88);

  let getData = async () => {
    let res = await axios.get("http://localhost:3001/v1/product/get");
    console.log(res);
    let products = res?.data?.product;
    setProduct(products);


    const initialGrams = products.reduce((acc, product) => {
      acc[product._id] = 2.88;
      return acc;
    }, {});
    setGrams(initialGrams);
  };

  const handleGramChange = (productId, value) => {
    setGrams((grams) => ({
      ...grams,
      [productId]: value,
    }));
    // console.log(value, "cvbjnk");
  };

  useEffect(() => {
    getData();

  }, []);

  return (
    <div className="App">
      {product.map((val) => (
        <div key={val._id}>
          <h2>{val.Title}</h2>
          <h3>Purity :- {val.Option2_Value}</h3>

          <select
            onChange={(e) => handleGramChange(val._id, e.target.value)}
            value={grams[val._id]}
          >
            <option value={2.88} selected>2.88</option>
            <option value={3.88}>3.88</option>
            <option value={4.88}>4.88</option>
          </select>

          {/* Price calculations */}
          <p>Gold Price: {Number((val.Gold_Rate * grams[val._id]).toFixed(2))}</p>
          <p>Making Price: {val.Making_Price}</p>
          <p>Diamond Price: {val.Diamond_Price}</p>
          <p>
            Total: {Number((val.Gold_Rate * grams[val._id] + val.Making_Price + val.Diamond_Price).toFixed(2))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
