import { useContext, useEffect, useState } from "react";
import ProductCard from "../utils/card";
import { Context } from "../context/provider";
import { getProducts } from "../../actions/products";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const { state, setState, api } = useContext(Context);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    (async () => {
      let response = await getProducts(api);
      if (response?.sucess) {
        setProducts(response.result.products);
        setLoading(false);
      }
    })()
  })
  
    return (
        <>
        <div className="title">Disponibilidad en campo</div>
        <div className="list">
          {loading
          ? <span>Cargando...</span>
          : products.map((product) => {
            return(
              <ProductCard key={product.id} name={product.name} price={product.price} stock={product.stock} />
            )
          })
          
        }
        </div>
        </>
    );
  }