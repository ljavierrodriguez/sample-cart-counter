import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);


const injectContext = PassedComponent => {
    const CartComponentContext = (props) => {
        const [items, setItems] = useState([]);

        return (
            <CartContext.Provider value={{ items: items, setItems: setItems }}>
                <PassedComponent  {...props}/>
            </CartContext.Provider>
        )
    }

    return CartComponentContext
}


export default injectContext;