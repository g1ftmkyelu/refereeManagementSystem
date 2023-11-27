import React, { useState, useEffect } from "react";
import DynamicForm from "../Components/specialRenderComponents/dynamicForm";
import { login } from "../../../Redux/slices/authThunk";
import { getToken } from "../utils/helperFunctions";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../../Redux/slices/authThunk";
import { setRole } from "../../../Redux/slices/roleSlice";
import Loader from "../Components/specialRenderComponents/Loader";
import { setId } from "../../../Redux/slices/idSlice";



const schema = [
  { name: "fullname", title: "email", type: "text" },
  { name: "password", title: "Password", type: "password" },

];

const LoginPage = ({ registerLink }) => {
  const rdata={}
  const [dataFromGrandchild, setDataFromGrandchild] = useState({});
  const { token, loading } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await dispatch(fetchUserData());
      dispatch(setRole(data.payload.role))
      localStorage.setItem('id', data.payload._id);
      localStorage.setItem('userinfo', JSON.stringify(data.payload));
      dispatch(setId(data.payload._id))
      console.log(data.payload._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(dataFromGrandchild).length > 0) {
      console.log(dataFromGrandchild.mydata);
    }
  }, [dataFromGrandchild]);

  useEffect(() => {
    if (getToken()) {
      nav('/dashboard');
    }
  }, [])


  const handleDataFromGrandchild = (data) => {
    try {

      handleLogin(data.mydata.fullname, data.mydata.password)


    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };


  if (token || getToken()) {
    console.log(token)
    nav('/dashboard')
  }

  const handleLogin = (fullname, password) => {
    dispatch(login({ fullname, password }))
      .then((loginObject) => {
        toast.success(loginObject.payload.message, { position: "top-right" });
        fetchData()

        nav('/dashboard');


      })
      .catch((error) => {
        // Handle login error
        console.error("Login error:", error);
        toast.error('invalid credentials', { position: "top-right" });
      });
  };






  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {loading ? <Loader /> :
        <div className='h-screen w-screen flex flex-col items-center justify-center'
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <DynamicForm
            schema={schema}
            onDataFromGrandchild={handleDataFromGrandchild}
            title={'login'}
            rdata={rdata}
          />

          <div>
            <h1 className=" text-lg font-bold">
              Don't have an account?<br />
              <Link className="text-blue-600 text-3xl" to={'/register'}>register</Link>
            </h1>
          </div>

        </div>
      }



    </div>
  )




};

export default LoginPage;
