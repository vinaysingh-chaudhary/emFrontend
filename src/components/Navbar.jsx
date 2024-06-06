import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logoutUtility from "../utilities/logoutUtility";

const Navbar = () => {

    const [isAuth, setIsAuth] = useState(); 
    const [isAdmin, setIsAdmin] = useState(); 

    useEffect(() => {
        let isAuth = localStorage.getItem('isAuth');
        isAuth = isAuth === "true";  
        setIsAuth(isAuth);

        let isAdmin = localStorage.getItem("isAdmin"); 
        isAdmin = isAdmin === "true"
        setIsAdmin(isAdmin); 
    },[])


    return (
        <div className=" fixed top-0 mx-auto max-w-screen-xl w-full h-12 flex justify-between items-between backdrop-blur-md px-4">

            <div className="flex justify-center items-center gap-3">
                <Link to={"/"} className="text-black/50 text-lg cursor-pointer hover:underline" >
                    home.
                </Link>

                {
                    isAdmin && 
                    <Link to={"/dashboard"} className="text-black/50 text-lg cursor-pointer hover:underline" >
                        dashboard.
                    </Link>
                }
         
            </div>

            <div className="flex justify-center items-center ">
                { isAuth 
                ? (
                    <button className=" px-4 py-1  bg-black text-white rounded-md flex justify-center items-center pb-1"
                    onClick={() => logoutUtility()}>
                      logout
                  </button>
                ) : (
                    <div className="flex justify-center items-center gap-3">
                        <Link to={"/login"} className=" px-4 py-1  bg-black text-white rounded-md flex justify-center items-center pb-1 ">
                            Login
                        </Link>

                        <Link to={"/signup"} className=" px-4 py-1 bg-black text-white rounded-md flex justify-center items-center pb-1">
                            Signup
                        </Link>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar
