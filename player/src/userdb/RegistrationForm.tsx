import {  Input} from "../ui"
import { useState } from 'react';
import {useForm, type SubmitHandler} from "react-hook-form"
import {type RegistrationFormData, validationSchema} from "./types_register"
import {zodResolver} from '@hookform/resolvers/zod'
import {WaNavLink} from '../onkrzyczy'
import { routes } from "../routes";

export const RegistrationForm = () => {
  const classinput = "input-color border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-slate-500 focus:border-slate-500"
  const classlabel = "block mb-2 text-sm font-medium text-white"

    const [message, setMessage] = useState('');
    const {register, handleSubmit, formState:{errors }} = useForm<RegistrationFormData>({
    resolver: zodResolver(validationSchema)
})

const handleRegistrationForm: SubmitHandler<RegistrationFormData> = async (data) => {


    const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataa = await response.json();
      if (response.ok) {
        setMessage(`Success: ${dataa.message}`);
      } else {
        setMessage(`Error: ${dataa.message}`);
      }
    };


    return (
        <div>
    <section className="login-color">
      <div className="flex flex-col items-center justify-center px-12 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              Covid
          </a>
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 login-box">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                      Register
                  </h1>
        <form onSubmit={handleSubmit(handleRegistrationForm)} className="space-y-4 md:space-y-6" action="#">
            <div className="relative mb-4" data-twe-input-wrapper-init>
            <Input label="Login" {...register('login')} error={errors.login} inputClassName={classinput} labelClassName={classlabel}/></div>
            <div className="relative mb-4" data-twe-input-wrapper-init>
            <Input label="E-mail"{...register('email', {required: true})} type = "email" error={errors.email} inputClassName={classinput} labelClassName={classlabel}/></div>
            <div className="relative mb-4" data-twe-input-wrapper-init>
            <Input label="Password" {...register('password', {required: true})} type = "password" error={errors.password} inputClassName={classinput} labelClassName={classlabel}/></div>

        <p className="text-sm font-light text-gray-500 dark:text-white">
Already have an account? <WaNavLink to={routes.LOGINFORM.path}>Sing up</WaNavLink>
                      </p>
                      <button className="log-in" type='submit'>Register</button>
        </form>
        {message && <p className="text-green-200">{message} </p>}
        </div>
        </div>
        </div>
        </section>
        </div>
    )
}

