import { useSelector } from "react-redux"; 
import { authSelectors } from "./redux/authSelectors"; 


const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

    return (
        <>
            {isLoggedIn && children}
        </>
    );
};

export default PrivateRoute; 