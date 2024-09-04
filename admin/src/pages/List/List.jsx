// import React, { useEffect, useState } from 'react'
// import "./List.css"
// import {axios} from "axios"
// import {toast} from "react-toastify"

// const List = () => {

//   const  url = "http://localhost:4000";

//   const [list,setList]=useState([]);

//   const fetchList = async ()=>{
//     const response = await axios.get(`${url}/api/food/list`);
//     console.log(response.data);
//     if(response.data.success){
//       setList(response.data.data)

//     }
//     else{
//       toast.error("Error")
//     }

//   }

//   //To run the fetchList whenever the page is loaded
//   useEffect(()=>{
//     fetchList();
//   },[])

//   return (
//     <div>
//     </div>
//   )
// }

// export default List

import React, { useEffect, useState } from 'react';
import "./List.css";
import axios from "axios"; // Default import for axios
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  //Logic to remove the menus from the database
  const removeFood = async(foodId)=>{
    // console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)

    }
    else{
      toast.error("Error")
    }
  }

  // To run the fetchList whenever the page is loaded
  useEffect(() => {
    fetchList();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className='list add flex-col'>
      <p>Foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>

        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p> &#x20B9;{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='remove'>X</p>

            </div>
          )

        })}
      </div>
    </div>
  );
};

export default List;
