import URLShortener from "./urlShortener"

export default function Home() {
async function CreateLink(_: any, formData: FormData){
"use server" // unn
 try {
   const res = await fetch("http://localhost:3000/api/shortener", {
   method:"POST",
   body:formData,
  });
   const data = await res.json()
   return data
 } catch (err: any) {
   console.log(err);
 }
}

  return (
    <main className="w-svw h-svh flex flex-col items-start justify-between p-10">
     <URLShortener action={CreateLink}/>
     <footer>&copy; All rights reserved - 2024</footer>
    </main>
  );
}

