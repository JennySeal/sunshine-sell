import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../slice_reducers/cartSlice';
import {selectCustomer} from '../slice_reducers/customerSlice';
import './../styles/productItem.css';


const ProductItem = () => {
    const productState = useLocation();
    const productItem = productState.state.product;
    const dispatch = useDispatch()
    const customerDetails = useSelector(selectCustomer)
    const checkLogin = customerDetails.isLoggedin;    

    const [saleLinks, setSaleLinks] = useState(false);
    const [cartButton, setCartButton] = useState(true);   

    const addToCart = (e) => {
        e.preventDefault()
        setSaleLinks({saleLinks}) 
        setCartButton(!{cartButton})
        dispatch(addProductToCart(productItem))
        };    

    return (
        <div>
            <div id="productContainer">  
            <div id="productText">                    
            <h3>{productItem.name}</h3><br/>
            <h4>{productItem.description}</h4><br/>
            
            <p>{productItem.cost_per_item} <br/>Items in stock: {productItem.items_in_stock}</p><br/>     
            
            <form onSubmit={addToCart}>
            {cartButton && <button type="submit">Add to Cart</button>}
            </form>
            
            {saleLinks && 
            <div>
            <Link to='/'><button>Keep Shopping</button></Link>
            {checkLogin ? <Link to='/checkout'><button>Checkout</button></Link> :
             <Link to={{pathname:'/login', state: {fromCart: true}}}><button>Checkout</button></Link>}
            <Link to='/cart'><button>View Cart</button></Link>
            </div>}
            </div>            
            <img src={productItem.image} alt={productItem.name} className="productImg"/>
            </div>
             
        </div>
    )
}

export default ProductItem;