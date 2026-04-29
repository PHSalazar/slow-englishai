import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Config {
    username: string;
    apiKey: string;
    language: string;
    setUsername: (username: string) => void;
    setApiKey: (apiKey: string) => void;
    setLanguage: (language: string) => void;
    reset: () => void;
}

const useUserInfoStore = create<Config>()(
    persist(
        (set) => ({
            username: 'Usuário',
            apiKey: 'Sem API configurada',
            language: 'english',

            setUsername: (username) => set({ username }),
            setApiKey: (apiKey) => set({ apiKey }),
            setLanguage: (language) => set({ language }),

            reset: () => set({ username: 'Sem nome', apiKey: 'Sem API configurada', language: 'English' })
        }),
        {
            name: 'slow-englishai-user-info',
        }
    )
);

export default useUserInfoStore;