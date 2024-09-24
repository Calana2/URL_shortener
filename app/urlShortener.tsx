"use client"

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function URLShortener({ action }: any) {

  const [show, setShow] = useState<boolean>(false);
  const [state, formAction] = useFormState<any>(action, null);
  const { pending } = useFormStatus();

  function handleSubmit(_: React.FormEvent<HTMLFormElement>) {
    setShow(true);
  }



  return (
    <div className="flex flex-col w-full md:w-1/2 border p-4  
    rounded-lg shadow-lg border-neutral-400">
      {/*Banner*/}
      <h1 className="text-3xl pb-2 mb-8 text-white p-2 font-semibold">
       URL shortener
      </h1>

      {/*Form*/}
      <form className="flex flex-col gap-2 text-white" action={formAction} onSubmit={handleSubmit}>
        <label className="font-semibold">Original URL name</label>
        <input className="border-2 rounded-sm p-1 text-black" type="url"
          placeholder="http://site.com/?q=long_string_of_characters"
          id="url" name="url" required />
        <label className="font-semibold">New name (alias)</label>
        <input className="border-2 rounded-sm p-1 text-black" type="text" 
          placeholder="awesome_name"
          id="alias" name="alias" required />
        <div className="flex justify-center">
         <button type="submit" className="mt-2 p-2 shadow-md rounded-md font-medium"
       style={{background: "linear-gradient(to left,#1111ff,#ff00ff)"}}
          disabled={pending}>Create new URL</button>
        </div>
      </form>

      {/*Pop ups*/}
      <div className={`${!show ? "hidden" : "text-white"} mt-10`}>
        {pending
          ? "Sending"
          : state === null
            ? "Wait..."
            : (<div>
              <span>{!state.errMsg
                ? "Your new URL is"
                : "Error "
              }: </span>
              <span className={`p-1 px-2 font-medium text-black md:text-base text-sm rounded-md
                ${!state.errMsg
                  ? "bg-white"
                  : "bg-red-500 text-white"}`}>
                {!state.errMsg
                  ? state.alias
                  : state.errMsg}
              </span>
            </div>)}
      </div>
    </div>
  );
}
