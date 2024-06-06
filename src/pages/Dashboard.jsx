import axios from "axios"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getEmployees();
    }, [])



    const getEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://embackend-yfn7.onrender.com/api/v1/employee/getemployees", {
                withCredentials: true
              });
              

            if (response.data) {
                setEmployees(response.data.data);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    const handleTerminate = async(id) =>{

        try {
            const response = await axios.delete("https://embackend-yfn7.onrender.com/api/v1/employee/deleteemployee", {
                params: { employeeId: id }
            }); 

            if(response.data.success){
                window.location.reload(); 
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className=" mx-auto max-w-screen-xl w-full py-20 flex flex-col justify-center items-center gap-8">
            <h1 className="text-2xl md:text-5xl font-semibold ">Manage Your Employees</h1>

            {
                loading
                    ? (<div className="w-full flex justify-center items-center text-xl text-black">Loading...</div>)
                    : (
                        <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-black-200">
                          <thead>
                            <tr>
                              <th className="py-4 px-7 border-b border-gray-200">Name</th>
                              <th className="py-4 px-7 border-b border-gray-200">Role</th>
                              <th className="py-4 px-7 border-b border-gray-200">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                                employees?.map((employee, index) => {
                                    return (
                                        <tr key={index}>
                                        <td className="py-2 px-7 border-b border-gray-200 font-bold text-center">{`${employee.firstName} ${employee.middleName ? employee.middleName : ""} ${employee.lastName}`}</td>
                                        <td className="py-2 px-7 border-b border-gray-200">{employee.role}</td>
                                        <td className="py-2 px-7 border-b border-gray-200">
                                          <button className="border border-red-500/50 px-4 py-2 rounded-md  text-red-500 font-bold"
                                            onClick={() => handleTerminate(employee._id)}
                                          >
                                                  Terminate
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                })
                            }
                               
                          </tbody>
                        </table>
                      </div>
                      )
            }
        </div>
    )
}

export default Dashboard; 
