import React from "react";
import { SlOptions } from "react-icons/sl";
import Loading from "./Loading";
import useGlobalContext from "@/provider/Provider";
import { useRouter } from "next/router";


function UserCard(props) {
  const [modal, setModal] = React.useState(false);
  const { loading, userInfo, deleteData, fetchData } = useGlobalContext();
  const router = useRouter();

  const handleDelete = async (key) => {
    if (window.confirm("Are you sure want to delete this user?"))
    try {
      await deleteData(`./api/users/${key}`);
      await fetchData('./api/users', 'users');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    loading ? 
      <Loading /> : 
      <div>
        <div className="relative">
          <button onClick={() => setModal(!modal)} className="hover:bg-slate-300 z-2 p-3 text-lg rounded-md w-fit absolute right-0">
            <SlOptions />
          </button>
          { modal &&
            <div onMouseLeave={() => setModal(false)} className="absolute right-0 top-10 w-36 border border-slate-300 shadow-md z-10 bg-white py-1 rounded-md">
              <p className="p-2 hover:bg-slate-300 cursor-pointer" onClick={() => router.push(`/users/${props.id}/edit`)} >Edit</p>
              { userInfo?.role === "admin" &&<p onClick={() => handleDelete(props.id)} className="p-2 hover:bg-slate-300 cursor-pointer">Delete</p> }
            </div>
          }
        </div>
        <div onMouseLeave={() => setModal(false)} onClick={() => router.push(`/users/${props.id}`)} className="flex flex-col justify-center bg-white rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer">
          {props.children}
        </div>
      </div>
      
  )
}

export default UserCard