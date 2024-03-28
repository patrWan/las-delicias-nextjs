import Link from "next/link";
import { Lobster } from 'next/font/google'

const noto = Lobster({ subsets: ['latin'], weight: '400' })

export default function Home() {
  return (
    <main className="bg-pink-400 h-screen">
      <div className="flex relative bg-teal-600 w-full"   >
        <div className="bg-repeat w-screen h-screen  heropattern-overlappingcircles-teal-900/90 flex justify-center items-center flex-col md:flex-row" >
          <section className="hidden h-full md:flex md:min-h-max md:w-3/4 bg-slate-700">
            Home
          </section>

          <section className="m-8 h-2/3 w-80 p-4 flex flex-col md:w-1/4 bg-zinc-800 rounded-md cursor-pointer border-2 border-teal-300  shadow-2xl shadow-teal-900">
            <section className="w-full p-2 flex items-center rounded-md cursor-pointer text-3xl text-teal-600 text-center justify-center my-8">
              <p className={noto.className}>Las delicias de Rosario</p>
            </section>
            <input placeholder="Ingrese su nombre" className="border-2 p-2 my-4" />
            <Link
              href="/dashboard"
              className="hover:text-teal-700 hover:bg-teal-200 h-5 p-5 flex items-center bg-teal-600 text-white font-bold uppercase justify-center"
            >
              Iniciar Sesion
            </Link>
            <p className="text-sm text-teal-700/50 mt-auto text-center">
              Desarrollado por <br/> <span className="font-bold">Patricio González Camilo</span>
            </p>

          </section>
        </div>
      </div>
    </main>
  );
}
