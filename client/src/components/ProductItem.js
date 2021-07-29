import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../slice_reducers/cartSlice';
import {selectCustomer} from '../slice_reducers/customerSlice';
import {selectCart} from '../slice_reducers/cartSlice';

import './../styles/productItem.css';


const ProductItem = () => {
    const productState = useLocation();
    const productItem = productState.state.product;
    const dispatch = useDispatch()
    const customerDetails = useSelector(selectCustomer)
    const checkLogin = customerDetails.isLoggedin;    
    const cart = useSelector(selectCart);

    const [saleLinks, setSaleLinks] = useState(false);
    const [cartButton, setCartButton] = useState(true);   
    const [duplicate, setDuplicate] = useState(false);

    const addToCart = (e) => {
        e.preventDefault()
        setSaleLinks({saleLinks}) 
        setCartButton(!{cartButton})
        
        if (cart.length === 0) {
            dispatch(addProductToCart(productItem))
            } 
            
        if (cart.length !== 0) {
            let i = 0;
            while (i < cart.length) {
                if ((cart[i].name + 1) === productItem.name) {
                       setDuplicate(true)
                       return setDuplicate;
                } else {
                    i++
                }
             } (duplicate) ? setDuplicate(!false) : dispatch(addProductToCart(productItem))   
            } 
    }  

    return (
            <div className='pageContainer' id="productContainer">  
            <div id="productText">                    
            <h3>{productItem.name}</h3><br/>
            <h4>{productItem.description}</h4><br/>
            
            <p>£{productItem.price} <br/>Items in stock: {productItem.items_in_stock}</p><br/>     
            
            <form onSubmit={addToCart}>
            {cartButton && <button type="submit">Add to Cart</button>}
            </form>
            
            {saleLinks && !duplicate &&
            <div>
            <Link to='/'><button>Keep Shopping</button></Link>
            <Link to='/cart'><button>View Cart</button></Link>
            {checkLogin ? <Link to='/checkout'><button>Checkout</button></Link> :
             <Link to={{pathname:'/login', state: {fromCart: true}}}><button>Checkout</button></Link>}
            </div>}
            {duplicate && 
            <div>
            <p className='boldOrange'>This item is already in your cart, you lucky duck.</p>
            <Link to='/'><button>Keep Shopping</button></Link>
            </div>}
            </div>           
            <div> 
            <img src={productItem.image} alt={productItem.name} className="productImg"/>
            </div>
             
        </div>
    )
}

export default ProductItem;