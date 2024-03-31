import { useState, useContext, createContext } from "react";

const WishListContext = createContext();
const WishListProvider = ({ children }) => {
    const [wishList, setWishList] = useState([])

    return (
        <WishListContext.Provider value={[wishList, setWishList]}>
            {children}
        </WishListContext.Provider>
    );
};

// custom hook
const useWishList = () => useContext(WishListContext);

export { useWishList, WishListProvider };