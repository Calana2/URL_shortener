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
    <div className="flex flex-col w-full md:w-1/2">
      {/*Banner*/}
      <h1 className="text-3xl pb-2 mb-8 border-b-2 border-black">
        kurl: URL shortener
      </h1>

      {/*Form*/}
      <form className="flex flex-col gap-2" action={formAction} onSubmit={handleSubmit}>
        <label>Original URL name</label>
        <input className="border-2 rounded-sm p-1" type="url"
          id="url" name="url" required />
        <label>New name (alias)</label>
        <input className="border-2 rounded-sm p-1" type="text"
          id="alias" name="alias" required />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white"
          disabled={pending}>Create new URL</button>
      </form>

      {/*Pop ups*/}
      <div className={`${!show ? "hidden" : ""} mt-10`}>
        {pending
          ? "Sending"
          : state === null
            ? "Wait..."
            : (<div>
              <span>{!state.errMsg
                ? "Your new URL is"
                : "Error "
              }: </span>
              <span className={`p-1 text-white font-semibold
                ${!state.errMsg
                  ? "bg-green-500"
                  : "bg-red-500"}`}>
                {!state.errMsg
                  ? state.alias
                  : state.errMsg}
              </span>
            </div>)}
      </div>
    </div>
  );
}
