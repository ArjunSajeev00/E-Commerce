// import Home from "./pages/Home";
import PageRouter from "../Router/PageRouter";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";


const Template = () => {
    return (
        <>


            <Router>
            <Navbar></Navbar>

                <PageRouter />

            </Router>

        </>
    );
}

export default Template;