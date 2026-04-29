import { useState } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../store/useUserInfoStore";

const SetupWizard = () => {
    const { username, apiKey, language, setUsername, setApiKey, setLanguage } = useUserInfoStore();
    const [usernameState, setUsernameState] = useState(username);
    const [apiKeyState, setApiKeyState] = useState(apiKey);
    const [languageState, setLanguageState] = useState(language);


    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setUsername(usernameState);
        setApiKey(apiKeyState);
        setLanguage(languageState);

        alert(`${usernameState}, seus dados já foram salvos!`);
        navigate('/');
    }

    return (
        <div className="bg-white shadow shadow-sm w-full flex flex-col p-5 rounded-sm">
            <h1 className="mb-4">Configuração Inicial</h1>
            <p className="text-xs mb-4">Estamos felizes em ver você aqui! Vamos personalizar sua experiência de aprendizado para que você comece com o pé direito.</p>

            <form action="/" onSubmit={handleSubmit} className="my-2 flex flex-col gap-2">
                <label htmlFor="" className="text-sm">Seu nome</label>
                <input type="text" className="border rounded-sm p-2" placeholder="Ex.: Maria Silva" onChange={(e) => setUsernameState(e.target.value)} value={usernameState === "Usuário" ? "" : usernameState} required />

                <label htmlFor="" className="text-sm">Chave de API</label>
                <input type="password" className="border rounded-sm p-2" placeholder="**********" onChange={(e) => setApiKeyState(e.target.value)} required />

                <label htmlFor="" className="text-sm">Idioma de Interesse</label>
                <select name="" id="" className="border rounded-sm p-2" value={languageState} onChange={(e) => setLanguageState(e.target.value)} required>
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