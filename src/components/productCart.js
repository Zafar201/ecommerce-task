import React from 'react' 
import { Link } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import { useAlert } from 'react-alert';



const ProductCart = (props) => {
    const alert = useAlert()
    const {id, name, price, image,description } = props.data;
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: id,
            quantity: 1,
            alert
        
        }))
      
    }
    return (
    <div className='product_card place-content-center'>
    <div className='top_card place-content-center'>
        <Link to={`product/${id}`}> <img src={image[0]} alt='' className="product_image"/></Link>
        <span className='product_price text-black'>${price}</span>
    </div>
    <div className='bottom_card'>
        <div className='product_name'>
            <h6>Puma</h6>
            <h4>{name}</h4>
        </div>
        <div className='product_description'>
            <p>{description}</p>
        </div>
        <button onClick={handleAddToCart} type="button" className='cta_add_to_cart'>Add To Cart</button>
    </div>
</div>
  )
}

export default ProductCart