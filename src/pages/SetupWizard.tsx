import { MdOutlineRocketLaunch } from "react-icons/md"

const SetupWizard = () => {
    return (
        <div className="bg-white shadow shadow-sm w-full flex flex-col p-5 rounded-sm">
            <h1 className="mb-4">Configuração Inicial</h1>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, assumenda.</p>
            <hr />

            <form action="/" className="my-2 flex flex-col gap-2">
                <label htmlFor="" className="text-sm">Seu nome</label>
                <input type="text" className="border rounded-sm p-2" placeholder="Ex.: Maria Silva" />

                <label htmlFor="" className="text-sm">Chave de API</label>
                <input type="password" className="border rounded-sm p-2" placeholder="**********" />

                <label htmlFor="" className="text-sm">Idioma de Interesse</label>
                <select name="" id="" className="border rounded-sm p-2">
                    <option value="english">Inglês</option>
                    <option value="spanish">Espanhol</option>
                </select>

                <button className="bg-[#1E40AF] text-white font-semibold rounded-sm mt-2 w-fit px-10 py-2 flex flex-nowrap self-center items-center gap-2 cursor-pointer hover:opacity-90 transition-all">
                    Concluir <MdOutlineRocketLaunch />
                </button>
            </form>
        </div>
    )
}

export default SetupWizard