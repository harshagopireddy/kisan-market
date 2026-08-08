import { useNavigate } from "react-router-dom";


function Dashboard(){

    const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem("user"));


    return(

        <div>

            <h1>
                Welcome {user?.name} 🌱
            </h1>


            <h2>
                Kisan Market Dashboard
            </h2>



            {
                user?.role === "BUYER" ?

                <button onClick={() => navigate("/buyer-dashboard")}>
                    Go To Buyer Dashboard
                </button>


                :

                <button onClick={() => navigate("/seller-dashboard")}>
                    Go To Seller Dashboard
                </button>

            }


        </div>

    );

}


export default Dashboard;