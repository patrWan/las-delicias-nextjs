export default function popup(props) {
  const { openPopUp, setOpenPopUp, result } = props;
  return (
    <div className={`flex w-full h-full z-50 left-0 top-0 overflow-auto fixed ${openPopUp ? 'visible bg-black/80cl' : 'invisible'}`}>
      <div
        className={`bg-white w-96 h-2/4  text-center flex flex-col p-4 rounded-md shadow-sm border-2 transition-all mx-auto mt-12
        ${openPopUp ? 'visible scale-100 opacity-100' : 'invisible scale-125 opacity-0'}`}
      >
        <p>{result ? 'Venta registrada correctamente!!!' : 'A ocurrido un error al registrar la venta :('}</p>
        <div className={`h-2/3  font-bold ${result ? 'text-green-500' : 'text-red-500'}`}>
          {result ? 'OK :)' : 'NOT OK :('}
          <p>Venta registrada correctamente</p>
        </div>
        <button
          className=" bg-blue-400 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-0"
          onClick={() => setOpenPopUp(!openPopUp)}
        >
          Cerrar
        </button>
      </div>
    </div>

  )
}
