import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { LockClosedIcon } from '@heroicons/react/20/solid'
import { UserContext } from "../context/UserContext";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Login = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs, [e.target.name]
        : e.target.value
    });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()

    try {
      const body = { email, password }
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json()
      // console.log(parseRes) sadece token var içinde

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login Successfully!");
      } else {
        toast.error(parseRes)
      }

    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <section className="p-6 mt-20 bg-zinc-50 shadow-2xl max-w-7xl m-auto">
        <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
          <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-white shadow-md">
            <span className="block mb-2">Hadi portakal toplayalım!</span>
            <h1 className="text-5xl font-extrabold"><span className="text-orange-500">Sipariş </span>verme zamanı!</h1>
            <p className="my-8">
              <span className="font-medium">Hadi sana en yakın </span>ve en uygun fiyatlı restorantlara bir göz gezdirelim!
            </p>
            <form onSubmit={onSubmitForm} novalidate="" action="" className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid">
              <div>
                <label for="email" className="text-sm sr-only">Your email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={e => onChange(e)}
                  value={email}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div>
                <label for="password" className="text-sm sr-only">Email address</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={e => onChange(e)}
                  value={password}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <button type="submit" className="w-full py-2 font-semibold rounded-md border border-orange-500 hover:bg-orange-500 hover:text-white">Giriş Yap!</button>
              <Link to="/register" className="underline w-full ml-36 hover:text-orange-500 font-medium">Henüz bir hesabın yok mu?</Link>
            </form>
          </div>
          <img src="https://source.unsplash.com/random/480x360" alt="" className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500" />
        </div>

      </section>
    </Fragment>
    //     <Fragment>
    //       {/* <div className="">
    //         <h1 className="text-5xl mt-4 text-center" >Login</h1>
    //         <form onSubmit={onSubmitForm}>
    //           <input
    //             onChange={e => onChange(e)}
    //             value={email}
    //             className=" form-control my-3"
    //             type="email"
    //             name="email"
    //             placeholder="email">
    //           </input>
    //           <input
    //             onChange={e => onChange(e)}
    //             value={password}
    //             className=" form-control my-3"
    //             type="password" name="password"
    //             placeholder="password">
    //           </input>
    //           <button className="btn btn-success btn-block" >Submit</button>
    //         </form>
    //         <Link to="/register">Register</Link>
    //       </div> */}



    // <div className="!flex !min-h-full !items-center !justify-center py-12 px-4 sm:px-6 lg:px-8">
    //         <div className="!w-full max-w-md space-y-8">
    //           <div>
    //             <img
    //               className="mx-auto h-12 w-auto"
    //               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //               alt="Your Company"
    //             />
    //             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
    //               Sign in to your account
    //             </h2>
    //             <p className="mt-2 text-center text-sm text-gray-600">
    //               Or{' '}
    //               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
    //                 start your 14-day free trial
    //               </a>
    //             </p>
    //           </div>

    //           <form onSubmit={onSubmitForm} className="mt-8 space-y-6" action="#" method="POST">
    //             <input type="hidden" name="remember" defaultValue="true" />
    //             <div className="-space-y-px rounded-md shadow-sm">
    //               <div>
    //                 <label htmlFor="email-address" className="sr-only">
    //                   Email address
    //                 </label>
    //                 <input
    //                 onChange={e => onChange(e)}
    //                 value={email}
    //                   id="email-address"
    //                   name="email"
    //                   type="email"
    //                   autoComplete="email"
    //                   required
    //                   className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    //                   placeholder="Email address"
    //                 />
    //               </div>
    //               <div>
    //                 <label htmlFor="password" className="sr-only">
    //                   Password
    //                 </label>
    //                 <input
    //                 onChange={e => onChange(e)}
    //                 value={password}
    //                   id="password"
    //                   name="password"
    //                   type="password"
    //                   autoComplete="current-password"
    //                   required
    //                   className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    //                   placeholder="Password"
    //                 />
    //               </div>
    //             </div>

    //             <div className="flex items-center justify-between">
    //               <div className="flex items-center">
    //                 <input
    //                   id="remember-me"
    //                   name="remember-me"
    //                   type="checkbox"
    //                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //                 />
    //                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
    //                   Remember me
    //                 </label>
    //               </div>

    //               <div className="text-sm">
    //                 <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
    //                   Forgot your password?
    //                 </a>
    //               </div>
    //             </div>

    //             <div>
    //               <button
    //                 type="submit"
    //                 className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //               >
    //                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    //                   <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
    //                 </span>
    //                 Sign in
    //               </button>
    //               <Link to="/register">Register</Link>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </Fragment>
  )
}

export default Login;