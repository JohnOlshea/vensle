import { Fragment, useState, useEffect } from "react";

import {
  Dialog,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "actions/auth";


const SignInRegisterModal = ({
    setLoginOpen,
    loginOpen,
    setActiveTab,
    activeTab,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";


  const [redirect, setRedirect] = useState("");
  const [driverRegister, setDriverRegister] = useState(false);

  const [loading, setLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState("");


  const { message } = useSelector((state) => state.message);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    business_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleShowLoginForm = (e) => {
    e.preventDefault();
    //TODO: put reset loading, formdata and error in helper function
    setLoading(false);
    setRegisterError("");

    setFormData({
      email: "",
      password: "",
    });

    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    dispatch({
      type: "CLEAR_MESSAGE",
    });

    setActiveTab(1);
  };

  const handleShowRegisterForm = (e) => {
    e.preventDefault();
    //TODO: put reset loading, formdata and error in helper function
    setLoading(false);
    setLoginError(false);
    setRegisterError("");

    setFormData({
      email: "",
      password: "",
    });

    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });


    dispatch({
      type: "CLEAR_MESSAGE",
    });

    setActiveTab(2);
  };


  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    if (registerFormData.password != registerFormData.password_confirmation)
      setRegisterError("Passwords do not match");

    dispatch(
      register(
        registerFormData.name,
        registerFormData.business_name,
        registerFormData.email,
        registerFormData.phone_number,
        registerFormData.address,
        registerFormData.password,
        registerFormData.password_confirmation
      )
    )
      .then(() => {
        setLoading(false);
        setRegisterError(false);
        setRegisterFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        setActiveTab(1);
      })
      .catch((error) => {
        console.log("error", error);
        setRegisterError("email already taken");
        setLoading(false);
      });
  };


  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    //if (loginError == '')
    dispatch(login(formData.email, formData.password))
      .then(() => {
        if (redirect) {
          navigate("/admin/upload-product?redirect=modal");
        } else {
          navigate("/admin/default");
        }

        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoginError(true);
        setLoading(false);
      });
  };

  // if (isLoggedIn) {
  //   navigate('/admin/products');
  // }


	return (
	      <Transition.Root show={loginOpen} as={Fragment}>
		<Dialog as="div" className="relative z-10" onClose={setLoginOpen}>
		  <Transition.Child
		    as={Fragment}
		    enter="ease-out duration-300"
		    enterFrom="opacity-0"
		    enterTo="opacity-100"
		    leave="ease-in duration-200"
		    leaveFrom="opacity-100"
		    leaveTo="opacity-0"
		  >
		    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
		  </Transition.Child>

		  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
		    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
		      <Transition.Child
			as={Fragment}
			enter="ease-out duration-300"
			enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
			enterTo="opacity-100 translate-y-0 md:scale-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100 translate-y-0 md:scale-100"
			leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
		      >
			<Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-lg md:px-4 lg:max-w-xl">
			  <div className="relative flex w-full items-center overflow-hidden rounded-lg bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
			    <button
			      type="button"
			      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
			      onClick={() => setLoginOpen(false)}
			    >
			      <span className="sr-only">Close</span>
			      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
			    </button>

			    <div className="w-full">
			      <div className="mx-auto mt-8 max-w-md bg-white pb-6">

				{activeTab !== 3 && (
				  <div>
				    <div className="mb-6 flex">
				      <div
					className={`w-full cursor-pointer py-2 px-4 text-center ${
					  activeTab === 1
					    ? "border-b-2 border-red-500 transition duration-300"
					    : "bg-white text-gray-500"
					}`}
					onClick={handleShowLoginForm}
				      >
					SIGN IN
				      </div>
				      <div
					className={`w-full cursor-pointer py-2 px-4 text-center ${
					  activeTab === 2
					    ? "border-b-2 border-red-500 transition duration-300"
					    : "bg-white text-gray-500"
					}`}
					onClick={handleShowRegisterForm}
				      >
					REGISTER
				      </div>
				    </div>

				    <div className="mt-4">
					{activeTab === 1 && (
					<div
					  className={`transition duration-300 ${
					    activeTab === 1
					      ? "opacity-100"
					      : "opacity-0"
					  }`}
					>
					  <section className="bg-white dark:bg-gray-900">
					    <div className="container mx-auto flex items-center justify-center px-6">
					      <form
						onSubmit={handleLogin}
						className="w-full max-w-md"
					      >
						{message?.message?.dispatchError && (
						  <p
						    style={{
						      color: "red",
						      marginTop: "16px",
						    }}
						  >
						    {message.message.dispatchError}
						  </p>
						)}

						<div>
						  <label
						    htmlFor="email"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Email address
						  </label>
						  <div className="mt-2">
						    <input
						      id="login_email"
						      name="email"
						      type="text"
						      autoComplete="email"
						      value={formData.email}
						      onChange={handleInputChange}
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.email
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>
						  {message &&
						    message?.message?.email &&
						    message.message.email.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div className="mt-4">
						  <div className="flex items-center justify-between">
						    <label
						      htmlFor="password"
						      className="block text-sm font-medium leading-6 text-gray-900"
						    >
						      Password
						    </label>
						    <div className="text-sm">
						      <a
							href="#"
							className="text-red-500 hover:text-red-600"
						      >
							Forgot password?
						      </a>
						    </div>
						  </div>
						  <div className="mt-2">
						    <input
						      id="password"
						      name="password"
						      type="password"
						      autoComplete="current-password"
						      value={formData.password}
						      onChange={handleInputChange}
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.password
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>
						  {message &&
						    message?.message?.password &&
						    message.message.password.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div class="-mx-2 mt-6 flex items-center">
						  <button
						    type="submit"
						    disabled={loading ? true : false}
						    className={`mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none ${
						      loading
							? "cursor-not-allowed bg-red-400"
							: ""
						    }`}
						  >
						    {loading ? (
						      <span>Loading...</span>
						    ) : (
						      <span>Login</span>
						    )}
						  </button>
						</div>

						<div class="mt-4 flex items-center justify-between">
						  <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

						  <span
						    to="#"
						    class="text-center text-xs uppercase text-gray-500 hover:underline dark:text-gray-400"
						  >
						    or login with Social Media
						  </span>

						  <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
						</div>

						<div class="-mx-2 mt-6 flex items-center">
						  <button
						    disable={googleLoading}
						    href="#"
						    className="mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none"
						  >
						     Sign in with Google 
						  </button>

						  <button
						    type="button"
						    className="mx-2 transform rounded-lg bg-red-200 p-2 text-sm font-medium text-gray-900 transition-colors duration-300 hover:bg-red-100"
						  >
						    <span>
							<svg
							  className="fill-current mx-2 h-5 w-5"
							  fill="currentColor"
							  style={{ color: "#1877f2" }}
							  viewBox="0 0 24 24"
							>
							  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
							</svg>
						    </span>
						  </button>
						</div>
					      </form>
					    </div>
					  </section>
					</div>
				      )}
				      {activeTab === 2 && (
					<div
					  className={`transition duration-300 ${
					    activeTab === 2
					      ? "opacity-100"
					      : "opacity-0"
					  }`}
					>
					  {driverRegister && (
					    <div className="text-center">
					      <p>
						You are about to Register as a Driver
					      </p>
					      <p>
						Click to
						<span
						  onClick={() =>
						    setDriverRegister(false)
						  }
						  className="mx-1 cursor-pointer text-blue-500"
						>
						  Register as normal user
						</span>
					      </p>
					    </div>
					  )}
					  <section class="bg-white dark:bg-gray-900">
					    <div class="container mx-auto flex items-center justify-center px-6">
					      <form
						onSubmit={handleRegister}
						class="w-full max-w-md"
					      >
						{message?.message?.dispatchError && (
						  <p
						    style={{
						      color: "red",
						      marginTop: "16px",
						    }}
						  >
						    {message.message.dispatchError}
						  </p>
						)}

						<div>
						  <label
						    htmlFor="username"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Full Name
						  </label>
						  <div className="mt-2">
						    <input
						      id="name"
						      name="name"
						      type="text"
						      autoComplete="name"
						      value={registerFormData.name}
						      onChange={
							handleRegisterInputChange
						      }
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.name
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>

						  {message &&
						    message?.message?.name &&
						    message.message.name.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div className="mt-4">
						  <label
						    htmlFor="business_name"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Business Name
						  </label>
						  <div className="mt-2">
						    <input
						      id="business_name"
						      name="business_name"
						      type="text"
						      autoComplete="business_name"
						      value={
							registerFormData.business_name
						      }
						      onChange={
							handleRegisterInputChange
						      }
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.business_name
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>

						  {message &&
						    message?.message?.business_name &&
						    message.message.business_name.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div className="mt-4">
						  <label
						    htmlFor="email"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Email address
						  </label>
						  <div className="mt-2">
						    <input
						      id="email"
						      name="email"
						      type="text"
						      autoComplete="email"
						      value={registerFormData.email}
						      onChange={
							handleRegisterInputChange
						      }
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.email
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>

						  {message &&
						    message?.message?.email &&
						    message.message.email.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div className="mt-4">
						  <label
						    htmlFor="phone_number"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Phone Number
						  </label>
						  <div className="mt-2">
						    <input
						      id="phone_number"
						      name="phone_number"
						      type="text"
						      autoComplete="phone_number"
						      value={
							registerFormData.phone_number
						      }
						      onChange={
							handleRegisterInputChange
						      }
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.phone_number
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>

						  {message &&
						    message?.message?.phone_number &&
						    message.message.phone_number.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div className="mt-4">
						  <label
						    htmlFor="address"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Address
						  </label>
						  <div className="mt-2">
						    <input
						      id="address"
						      name="address"
						      type="text"
						      autoComplete="address"
						      value={registerFormData.address}
						      onChange={
							handleRegisterInputChange
						      }
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.address
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>

						  {message &&
						    message?.message?.address &&
						    message.message.address.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div className="mt-4">
						  <label
						    htmlFor="password"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Password
						  </label>
						  <div className="mt-2">
						    <input
						      id="password"
						      name="password"
						      type="password"
						      autoComplete="password"
						      value={registerFormData.password}
						      onChange={
							handleRegisterInputChange
						      }
						      className={`block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
							message &&
							message?.message?.password
							  ? "border border-red-400"
							  : "border-0"
						      }`}
						    />
						  </div>

						  {message &&
						    message?.message?.password &&
						    message.message.password.map(
						      (error, index) => (
							<p
							  style={{
							    color: "red",
							    fontSize: "13px",
							  }}
							>
							  {error}
							</p>
						      )
						    )}
						</div>

						<div className="mt-4">
						  <label
						    htmlFor="password_confirmation"
						    className="block text-sm font-medium leading-6 text-gray-900"
						  >
						    Password Again
						  </label>
						  <div className="mt-2">
						    <input
						      id="password_confirmation"
						      name="password_confirmation"
						      type="password"
						      value={
							registerFormData.password_confirmation
						      }
						      onChange={
							handleRegisterInputChange
						      }
						      className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						    />
						  </div>
						</div>

						<div class="-mx-2 mt-6 flex items-center">
						  <button
						    type="submit"
						    class="mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none"
						  >
						    {loading ? (
						      <span>Loading...</span>
						    ) : (
						      <span>Register</span>
						    )}
						  </button>
						</div>

						<div class="mt-4 flex items-center justify-between">
						  <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

						  <span class="text-center text-xs uppercase text-gray-500 hover:underline dark:text-gray-400">
						    or register with Social Media
						  </span>

						  <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
						</div>

						<div class="-mx-2 mt-6 flex items-center">
						  <button
						    href="#"
						    className="mx-2 flex w-full transform items-center justify-center rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none"
						  >
						       Register with Google 
						  </button>

						  <button
						    type="button"
						    className="mx-2 transform rounded-lg bg-red-200 p-2 text-sm font-medium text-gray-900 transition-colors duration-300 hover:bg-red-100"
						  >
						    <span>
						   
							<svg
							  className="fill-current mx-2 h-5 w-5"
							  fill="currentColor"
							  style={{ color: "#1877f2" }}
							  viewBox="0 0 24 24"
							>
							  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
							</svg>
						    </span>
						  </button>
						</div>
					      </form>
					    </div>
					  </section>
					</div>
				      )}
				    </div>
				  </div>
				)}
			      </div>
			    </div>
			  </div>
			</Dialog.Panel>
		      </Transition.Child>
		    </div>
		  </div>
		</Dialog>
	      </Transition.Root>
	)
}

export default SignInRegisterModal;
