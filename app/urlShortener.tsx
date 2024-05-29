"use client"

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ReactFormState } from "react-dom/client";

export default function URLShortener({action}:any) {

 const [show, setShow ] = useState<boolean>(false);
 const [newURL, setNew] = useState<String|undefined>(undefined);
 const [state, formAction] = useFormState<any>(action,null);
 const {pending} = useFormStatus();

 function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setShow(true);
 }

 return(
  <div className="flex flex-col gap-5">
   <h1 className="text-3xl font-semibold"> 
    URL Shortener, put your URL below 
   </h1>
   <form className="flex p-2" action={formAction} onSubmit={handleSubmit}>
    <input className="border-2 w-3/4" type="url" id="url" name="url" required/>
    <button type="submit" className="p-2 bg-blue-500 text-white" disabled={pending}>Get Url</button>
   </form>
   <div className={`${!show ? "hidden" : ""}`}>
     { pending ? "Sending" : `${ state === null ?  "Wait..." : `Your new URL is: ${state.new}`}`}
   </div>
  </div>
 );
}
