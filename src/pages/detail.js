import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../products";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart";
import { useAlert } from "react-alert";
import DetailsThumb from "../components/Detailsthumb";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    const findDetail = products?.filter((product) => product.id == id);
    console.log(products, "findDetail");
    if (findDetail.length > 0) {
      setDetail(findDetail);
    } else {
      window.location.href = "/";
    }
  }, [id]);

  console.log(detail, "detail");
  // const handleMinusQuantity = () => {
  //     setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  // }
  // const handlePlusQuantity = () => {
  //     setQuantity(quantity + 1);
  // }
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: detail[0].id,
        quantity: quantity,
        alert,
      })
    );
  };

  const [index, setIndex] = useState(0);
  const myRef = useRef(null);
  const handleTab = (index) => {
    setIndex(index);
    if (myRef.current && myRef.current.children) {
      Array.from(myRef.current.children).forEach((child, i) => {
        child.className = child.className.replace("active", "");
      });
      myRef.current.children[index].className = "active";
    }
  };

  useEffect(() => {
    // Ensure myRef.current is not null before accessing children
    if (myRef.current && myRef.current.children) {
      myRef.current.children[index].className = "active";
    }
  }, [index]);
  return (
    <div>
      <h2 className="text-3xl text-center">PRODUCT DETAIL</h2>

      <div className="app">
        {detail.map((item) => (
          <div className="details" key={item.id}>
            <div className="big-img">
              <img src={item.image[index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2 className="text-xl">{item.name}</h2>
                <span>${item.price}</span>
              </div>
              {/* <Colors colors={item.colors} /> */}
              <p>{item.longDescription}</p>
              <p>{item.content}</p>

              <DetailsThumb images={item.image} tab={handleTab} myRef={myRef} />
              <button className="cart" onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
