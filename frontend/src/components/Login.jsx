import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import {toast} from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async ( data) => {
        const loadingToast = toast.loading("Logging in...")
        // e.preventDefault();
        // Add your API call here to send the form data to the server
          // Prepare the data to be sent
        //   const data = { username, password };
    
          // Send data to the backend
          try {
              const response = await fetch("https://login2-backend.onrender.com/login", {
                  method: 'POST', // Use POST for sending data
                  headers: {
                      'Content-Type': 'application/json', // Specify content type
                  },
                  credentials: 'include',
                  body: JSON.stringify(data), // Convert data to JSON
              });
              console.log(response);
    
              const result = await response.json(); // Get the response from the server
            //   console.log(result); // Handle the response as needed
            if(response.status === 400){
                 // If there's a specific error message, set it for the corresponding field
                 if (result.error === 'User not found') {
                    setError('username', { type: 'manual', message: result.error });
                } else if (result.error === 'Invalid password') {
                    setError('password', { type: 'manual', message: result.error });
                }
            }
            else{
                Cookies.set('token', result.token, {
                    path: '/',            // Make the cookie available on all routes
                    secure: true,         // Ensure the cookie is only sent over HTTPS
                    sameSite: 'None',     // Required for cross-origin requests
                    expires: 1,
                }); // Redirect to home page after successful signup
                toast.success("Login successful!")
                navigate('/');  // Redirect to '/' after success
            }
          } catch (error) {
              console.error('Error:', error); // Handle any errors
              toast.error("Login failed!")
          }
          finally{
            toast.dismiss(loadingToast);
          }
      };

	return (
		<div className="p-10 bg-[#e5e8f0]">
			<div className="w-full  flex rounded-3xl  p-5 hover:backdrop-blur-3xl   bg-white/30 border-2 border-white">
				<div className="w-7/12 h-full  rounded-3xl overflow-hidden bg-white ">
					<img
						className="translate-x-20 w-[73%] object-contain"
						src="https://img.freepik.com/free-vector/designer-life-concept-illustration_114360-1537.jpg?semt=ais_hybrid"
						alt=""
					/>
				</div>
				<div className="flex w-5/12  justify-center items-center relative">
          <span className='text-xs text-gray-400 font-bold absolute right-0 top-0'>Not a member? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/Signup')}>Register now</span></span>
					<div className='text-center '>
						<h1 className="font-semibold text-black text-3xl my-2">Login!</h1>
            <p className='text-gray-400  mb-5'>wellcome back you&apos;ve been missed!</p>

						<form className="w-32 " onSubmit={handleSubmit(onSubmit)}>
							<label htmlFor="username" className=""></label>
							<input
								className="w-60   px-5 py-3 rounded-lg mt-6 mb-1 shadow-3xl shadow-blue-200 focus focus:outline-offset-[3px] outline-blue-300 "
								type="text"
								id="username"
								name="username"
								placeholder="username"
                                {...register("username", { required: {value: true, message: "This field is required"}, minLength: {value: 3, message: "Minimum length is 3"}, maxLength: {value: 8, message: "Maximum length is 8"}, })}
                                autoComplete="current-password"
								required
							/>
                            {errors.username && <em><div className='text-red-500 w-40 mb-2 text-[70%] font-bold'>{errors.username.message}</div></em>}



							{/* <label htmlFor="email">Email:</label>
<input type="email" id="email" name="email" required /> */}

							<label htmlFor="password"></label>
							<input
								className="border w-60 px-5 py-3 mb-1 rounded-lg border-none focus:outline-offset-[3px] outline-blue-300"
								type="password"
								id="password"
								name="password"
								placeholder="password"
                                {...register('password', { required: {value: true, message: "This field is required"}, minLength: {value: 8, message: "Minimum length is 8"}})}
                                autoComplete="current-password"
								required
							/>
                            {errors.password && <em><div className="text-red-500 w-40 mb-2 text-[70%] font-bold">{errors.password.message}</div></em>} {/* Display error message */}
                            <div className='text-blue-500 w-60 text-xs font-bold text-end mb-5'>forgot password?</div>

              
							<button
								className={`text-white bg-[#8bcc00] w-60 p-2 rounded-lg shadow-3xl shadow-orange-500 ${isSubmitting ?  "blur-sm" : ""}`}	type="submit"
                                disabled={isSubmitting}
              
							>
								Log In
							</button>
						</form>
                        
                        <div className="text-[0.7rem] text-gray-500 flex items-center my-10"> <div className="bg-white h-[1px] m-3 rounded-lg w-2/12"> </div><p> Or continue with</p><div className="bg-white h-[1px] m-3 rounded-lg w-2/12"> </div></div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Login;
