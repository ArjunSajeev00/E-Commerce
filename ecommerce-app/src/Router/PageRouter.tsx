import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const PageRouter = () => {

    return (

        <div>
            <Routes>
                <Route path='/'element={<Home></Home>}/>
                <Route path="/Profile" element={<Profile />} />
            </Routes>
        </div>

    );
};
export default PageRouter;