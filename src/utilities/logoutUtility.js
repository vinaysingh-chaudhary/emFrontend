import axios from "axios"

const logoutUtility = async() => {
    try {
        const response = await axios.post("https://embackend-yfn7.onrender.com/api/v1/employee/logout", null, {
            withCredentials: true 
        }); 

        if(response.data.success){
            window.localStorage.removeItem('isAuth'); 
            window.localStorage.removeItem('isAdmin'); 
            window.location.href="/login"
        }
    } catch (error) {
        console.log(error); 
    }
}   

export default logoutUtility
