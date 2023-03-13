import React, { createContext, useContext, useState } from 'react'
import injectContext from './CartComponentContext';
import { CartContext } from './CartComponentContext';
import { FaShoppingCart } from 'react-icons/fa';

const Menu = () => {
    const { items } = useContext(CartContext);
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"> <FaShoppingCart /> ({items.reduce((total, item) => total += item.cantidad, 0)})</a>
            </li>
        </ul>
    )
}


const Counter = ({ value, prod, setProd }) => {
    return (
        <>
            <span>{prod.title} a ${prod.price}</span>
            <div className='btn-group d-block my-3'>
                <button className="btn btn-primary" onClick={() => {
                    if (value.length === 0) return;
                    let itemFound = value.find((item) => item.id == prod.id);
                    if (itemFound) {
                        itemFound.cantidad -= 1;
                        setProd((prevProds) => [...prevProds])
                    } else {
                        setProd((prevProds) => [...prevProds, { ...prod, cantidad: 1 }])
                    }
                }}>-</button>
                <button className="btn btn-primary">{value.find((item) => item.id === prod.id)?.cantidad || 0}</button>
                <button className="btn btn-primary" onClick={() => {
                    let itemFound = value.find((item) => item.id == prod.id);
                    if (itemFound) {
                        itemFound.cantidad += 1;
                        setProd((prevProds) => [...prevProds])
                    } else {
                        setProd((prevProds) => [...prevProds, { ...prod, cantidad: 1 }])
                    }
                }}>+</button>
            </div>
        </>
    )
}

const TotalCounter = ({ items }) => {
    return (
        <div className="d-block">
            {
                items.map((item) => {
                    return (
                        <span className='d-block' key={item.id}>{item.title}</span>
                    )
                })
            }
            Total: ${items.reduce((total, item) => total + (item.price * item.cantidad), 0)}
        </div>
    )
}


const App = () => {
    //const [items, setItems] = useState([])
    const { items, setItems } = useContext(CartContext);
    const [item1] = useState({
        id: 1,
        title: 'Product 1',
        price: 100
    })
    const [item2] = useState({
        id: 2,
        title: 'Product 2',
        price: 200
    })
    const [item3] = useState({
        id: 3,
        title: 'Product 3',
        price: 300
    })

    return (
        <>
        <Menu />
        <div className="container">
            <Counter value={items} prod={item1} setProd={setItems} />
            <Counter value={items} prod={item2} setProd={setItems} />
            <Counter value={items} prod={item3} setProd={setItems} />
            <TotalCounter items={items} />
        </div>
        </>
    )
}

export default injectContext(App)