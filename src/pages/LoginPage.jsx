import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [disable, setDisable] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const isFilled = Object.values(formData).every(value => value !== "");
        setDisable(!isFilled)
    }, [formData])

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const loginHandler = async () => {
        try {
            setError("")
            setLoading(true)

            const response = await axios.post('https://embackend-yfn7.onrender.com/api/v1/employee/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data.data) {
                const isAdmin = response.data.data.employee.isAdmin;

                const isAuth = true;
                window.localStorage.setItem("isAuth", isAuth.toString());
                window.localStorage.setItem("isAdmin", isAdmin.toString());
                window.location.href = "/";
            }

            setLoading(false)

        } catch (error) {
            setError(error.response.statusText === "Unauthorized" ? "Check Password and credentials" : "Internal Server Error");
            setLoading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData)
        loginHandler();
    }

    return (
        <div className="absolute top-0 max-w-screen-xl mx-auto h-screen bg-white w-full flex flex-col justify-center items-center gap-8 ">

            <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-5xl">Login</p>
                <p>login to access your profile</p>
            </div>

            <form className="flex flex-col justify-center items-center gap-4" onSubmit={submitHandler}>
                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="email" className="text-xl">Email: </label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={changeHandler} className="border-black border px-3 py-2 rounded-md w-[400px]" />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="password" className="text-xl">Password: </label>
                    <div className="w-[400px] flex justify-center items-center gap-2">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={changeHandler} className="border-black border px-3 py-2 rounded-md w-full" />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="border-black border px-3 py-2 rounded-md bg-black text-white"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                {
                    error && (
                        <p className="text-center text-red-400">{error}</p>
                    )
                }

                <button className={`flex justify-center items-center border px-10 py-2 rounded-md ${disable === false ? "bg-black text-white" : "bg-black/25 text-black"} `} type="submit" disabled={disable}>{loading ? "Logging In" : "Login"}</button>

                <Link to={"/signup"} className="font-bold cursor-pointer">don't have an account ? signup</Link>
            </form>
        </div>
    )
}

export default LoginPage
