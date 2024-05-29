import URLShortener from "./urlShortener"

export default function Home() {
async function CreateLink(_: any, formData: FormData){
"use server"
 try {
  const res = await fetch("http://localhost:3000/api/shortener", {
   method:"POST",
   body:formData,
  });
  return res.json();
 } catch (err: any) {
   console.log(err);
 }
}

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen pb-10 mt-10 gap-64">
     <URLShortener action={CreateLink}/>
     <footer>&copy; All rights reserved - 2024</footer>
    </main>
  );
}
