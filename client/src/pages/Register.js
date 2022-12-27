import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Register = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    adress: "",
    il_id: "",
    ilce_id: "",
    semt_id: "",
    mah_id: "",
    adres_no: "",
    adres_kat: "",
  })

  const { email, password, name, lastname, adress, il_id, ilce_id, semt_id, mah_id, adres_no, adres_kat } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs, [e.target.name]
        : e.target.value
    });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()

    try {
      const body = { email, password, name }
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json()

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully!")
      } else {
        setAuth(false);
        toast.error(parseRes);
      }

    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <section className="p-6 mt-20 bg-zinc-50 shadow-2xl max-w-5xl m-auto">
        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-white shadow-md">
          <form onSubmit={onSubmitForm} novalidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="name" className="text-sm">İsim</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={e => onChange(e)}
                  value={name}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="lastname" className="text-sm">Soyisim</label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  onChange={e => onChange(e)}
                  value={lastname}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="email" className="text-sm">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={e => onChange(e)}
                  value={email}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="password" className="text-sm">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={e => onChange(e)}
                  value={password}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full">
                <label for="address" className="text-sm">Address</label>
                <input
                  id="adress"
                  type="text"
                  name="adress"
                  onChange={e => onChange(e)}
                  value={adress}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label for="il_id" className="text-sm">İl ID</label>
                <input
                  id="il_id"
                  type="number"
                  name="il_id"
                  onChange={e => onChange(e)}
                  value={il_id}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label for="ilce_id" className="text-sm">İlçe ID</label>
                <input
                  id="ilce_id"
                  type="number"
                  name="ilce_id"
                  onChange={e => onChange(e)}
                  value={ilce_id}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label for="semt_id" className="text-sm">Semt ID</label>
                <input
                  id="semt_id"
                  type="number"
                  name="semt_id"
                  onChange={e => onChange(e)}
                  value={semt_id}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label for="mah_id" className="text-sm">Mahalle ID</label>
                <input
                  id="mah_id"
                  type="number"
                  name="mah_id"
                  onChange={e => onChange(e)}
                  value={mah_id}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label for="addres_no" className="text-sm">Adres No</label>
                <input
                  id="adres_no"
                  type="number"
                  name="adres_no"
                  onChange={e => onChange(e)}
                  value={adres_no}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label for="addres_kat" className="text-sm">Adres Kat</label>
                <input
                  id="adres_kat"
                  type="number"
                  name="adres_kat"
                  onChange={e => onChange(e)}
                  value={adres_kat}
                  className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
              </div>
            </div>
            <button type="submit" className="w-full py-2 font-semibold rounded-md border border-orange-500 hover:bg-orange-500 hover:text-white">Hesap Oluştur!</button>
            <Link to="/login" className="underline w-full hover:text-orange-500 font-medium">Zaten bir hesabın var mı?</Link>
          </form>
        </div>
      </section>
      {/* <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input onChange={e => onChange(e)} value={email} className=" form-control my-3" type="email" name="email" placeholder="email"></input>
        <input onChange={e => onChange(e)} value={password} className=" form-control my-3" type="password" name="password" placeholder="password"></input>
        <input onChange={e => onChange(e)} value={name} className=" form-control my-3" type="text" name="name" placeholder="name"></input>
        <button className="btn btn-success btn-block" >Submit</button>
      </form>
      <Link to="/login">Login</Link> */}
    </Fragment>
  )
}

export default Register;