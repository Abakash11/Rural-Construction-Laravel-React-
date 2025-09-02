import { useContext, useState } from 'react';
import Header from '../common/header';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './context/Auth';
import Lodder from '../common/Lodder';
const Login = () => {
  const {login}=useContext(AuthContext)
  const [isloading, setIsLoading] = useState(false);
  const navigation=useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // API call
    try {
          setIsLoading(true);
          const res=await fetch('http://localhost:8000/api/auth',{
            method:'post',
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify(form)
          })
          const result=await res.json();
          setIsLoading(false);
          if(result.status==false){
            toast.error(result.message)
          }
          else{
            const userInfo={
              id:result.id,
              token:result.token
            }
            localStorage.setItem('userInfo',JSON.stringify(userInfo))
            login(userInfo);
            toast.success(result.message)
            navigation('/admin/dashboard')
          }
          console.log(result);
    } catch (error) {
      console.log(error);
      
    }

    
  };

  return (
    <>
      <Header />
      {isloading ?(<div className='w-[100vw] flex justify-center items-center h-[100vh]'>
        <Lodder/>
      </div>):
      (<main>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-pink-300 to-blue-400 px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-yellow-500">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back 👷‍♂️</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@site.com"
                  className="w-full mt-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 hover:scale-105 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account? <a href="#" className="text-yellow-600 font-medium hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </main>)}
      
    </>
  );
};

export default Login;