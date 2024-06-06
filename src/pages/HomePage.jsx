import axios from "axios";
import { useEffect, useState } from "react"

const HomePage = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getEmployee();
    }, [])

    const getEmployee = async () => {
        try {
            setLoading(true)
            const response = await axios.get("https://embackend-yfn7.onrender.com/api/v1/employee/getemployee", {
                withCredentials: true 
              });
            if (response.data) {
                setFormData(response.data.data)
            }

            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <div className="w-full pt-20 flex justify-center items-center">
           {
            loading 
            ? (<div className="w-full flex justify-center items-center text-xl text-black">Loading...</div>)
            : (
                <div className="w-full flex flex-col justify-center items-start gap-4">
                <div className="flex flex-col justify-start items-start pl-5">
                    <h1 className=" text-2xl md:text-4xl text-black text-start font-bold">
                        {`${formData.firstName} ${formData.middleName !== "" ? formData.middleName : ""} ${formData.lastName}`}
                    </h1>

                    <p className="text-sm md:text-lg text-black/50">
                        {formData.role}
                    </p>

                    <p className="mt-2">
                        <span className="text-lg font-bold">Introduction: </span>
                        {formData.introBio}
                    </p>

                    <p className="mt-2">
                        <span className="text-lg font-bold">Joined: </span>
                        {formData.joinedOn?.split("T").at(0)}
                    </p>
                </div>



                <div className="w-full" >
                    <form className=" flex flex-col items-center justify-center md:flex-wrap md:flex-row md:justify-start md:items-center">
                        <div className="w-full md:w-1/2 px-4 flex flex-col justify-start items-start gap-1">
                            <label htmlFor="name" className="text-2xl">first name: </label>
                            <input type="text" id="name" value={formData.firstName} className="border-black border w-full rounded-md px-3 py-2" readOnly />
                        </div>

                        <div className="w-full md:w-1/2 px-4 flex flex-col justify-start items-start gap-1">
                            <label htmlFor="name" className="text-2xl">middle name: </label>
                            <input type="text" id="name" value={formData.middleName} className="border-black border w-full rounded-md px-3 py-2" readOnly />
                        </div>

                        <div className="w-full md:w-1/2 px-4 flex flex-col justify-start items-start gap-1">
                            <label htmlFor="name" className="text-2xl">last name: </label>
                            <input type="text" id="name" value={formData.lastName} className="border-black border w-full rounded-md px-3 py-2" readOnly />
                        </div>

                        <div className="w-full md:w-1/2 px-4 flex flex-col justify-start items-start gap-1">
                            <label htmlFor="name" className="text-2xl">username: </label>
                            <input type="text" id="name" value={formData.username} className="border-black border w-full rounded-md px-3 py-2" readOnly />
                        </div>

                        <div className="w-full md:w-1/2 px-4 flex flex-col justify-start items-start gap-1">
                            <label htmlFor="name" className="text-2xl">role: </label>
                            <input type="text" id="name" value={formData.role} className="border-black border w-full rounded-md px-3 py-2" readOnly />
                        </div>

                        <div className="w-full md:w-1/2 px-4 flex flex-col justify-start items-start gap-1">
                            <label htmlFor="name" className="text-2xl">mobile: </label>
                            <input type="text" id="name" value={formData.mobile} className="border-black border w-full rounded-md px-3 py-2" readOnly />
                        </div>

                        <div className="w-full md:w-1/2 px-4 flex flex-col justify-start items-start gap-1">
                            <label htmlFor="name" className="text-2xl">email: </label>
                            <input type="text" id="name" value={formData.email} className="border-black border w-full rounded-md px-3 py-2" readOnly />
                        </div>
                    </form>
                </div>
            </div>
            )
           } 
        </div>
    )
}

export default HomePage
