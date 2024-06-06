import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        username: "",
        introBio: "",
        email: "",
        role: "",
        mobile: "",
        joinedOn: "",
        password: ""
    })

    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const isFilled = Object.entries(formData).every(([key, value]) =>
            key === "middleName" || value !== ""
        );

        setDisable(!isFilled)
    }, [formData])

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const signupHandler = async () => {
        try {
            setError("")
            setLoading(true)

            const response = await axios.post('https://embackend-yfn7.onrender.com/api/v1/employee/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.data.data) {
                window.location.href = "/login";
            }

            setLoading(false)
        } catch (error) {
            setError(error);
            console.log(error)
            setLoading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData)
        signupHandler();
    }

    return (
        <div className="absolute top-0 max-w-screen-xl mx-auto py-20 bg-white w-full flex flex-col justify-center items-center gap-8 ">

            <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-5xl">Register</p>
                <p>Register as employee with your details</p>
            </div>

            <form className="flex flex-col justify-center items-center gap-4" onSubmit={submitHandler}>
                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="firstName" className="text-xl">first name: </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="middleName" className="text-xl flex justify-center items-center gap-2">middle name <span className="text-black/50 text-sm">[optional]</span></label>
                    <input type="text" id="middleName" name="middleName" value={formData.middleName} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="lastName" className="text-xl">last name: </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="username" className="text-xl">username: </label>
                    <input type="text" id="username" name="username" value={formData.username} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="introBio" className="text-xl">bio: </label>
                    <textarea type="text" id="introBio" name="introBio" value={formData.introBio} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="email" className="text-xl">email: </label>
                    <input type="text" id="email" name="email" value={formData.email} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="mobile" className="text-xl">mobile: </label>
                    <input type="number" id="mobile" name="mobile" value={formData.mobile} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="role" className="text-xl">Role: </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        className="border-black border px-3 py-2 rounded-md w-[400px]"
                        onChange={changeHandler}
                    >
                        <option value="">Select a role</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="joinedOn" className="text-xl">Joined on: </label>
                    <input type="date" id="joinedOn" name="joinedOn" value={formData.joinedOn} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2">
                    <label htmlFor="password" className="text-xl">password: </label>
                    <input type="password" id="password" name="password" value={formData.password} className="border-black border px-3 py-2 rounded-md w-[400px]" onChange={changeHandler} />
                </div>

                <button className={`flex justify-center items-center border px-10 py-2 rounded-md ${disable === false ? "bg-black text-white" : "bg-black/25 text-black"} `} type="submit" disabled={disable}>{loading ? "Signing up" : "Signup"}</button>

                <Link to={"/signup"} className="font-bold cursor-pointer">already have an account ? login</Link>
            </form>
        </div>
    )
}

export default SignupPage
