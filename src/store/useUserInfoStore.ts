import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- Interfaces ---
interface Lesson {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    percentage: number;
    started?: boolean;
}

interface AppState {
    // User Info
    username: string;
    apiKey: string;
    language: string;

    // Lessons
    allLessons: Lesson[];
    activeLesson: Lesson | null;

    // Actions: User
    setUsername: (username: string) => void;
    setApiKey: (apiKey: string) => void;
    setLanguage: (language: string) => void;
    resetUser: () => void;

    // Actions: Lessons
    setLessons: (newLessons: Lesson[]) => void;
    setActiveLesson: (lesson: Lesson | null) => void;
}

const initialLessons: Lesson[] = [
    { id: 1, title: "Lesson 1: Greetings and Introductions", description: "Aprenda a cumprimentar pessoas...", completed: false, percentage: 0 },
    { id: 2, title: "Lesson 2: Essential Verbs and Pronouns", description: "Foco no verbo 'to be'...", completed: false, percentage: 0 },
    { id: 3, title: "Lesson 3: Common Vocabulary and Objects", description: "Expansão de vocabulário...", completed: false, percentage: 0 },
    { id: 4, title: "Lesson 4: Present Simple Tense", description: "Falar sobre rotinas...", completed: false, percentage: 0 },
    { id: 5, title: "Lesson 5: Asking Questions", description: "Uso de 'Do/Does'...", completed: false, percentage: 0 },
    { id: 6, title: "Lesson 6: Telling Time and Schedules", description: "Aprenda a ler as horas...", completed: false, percentage: 0 },
    { id: 7, title: "Lesson 7: Daily Conversations", description: "Prática de diálogos...", completed: false, percentage: 0 }
];

const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            username: 'Usuário',
            apiKey: 'Sem API configurada',
            language: 'english',
            allLessons: initialLessons,
            activeLesson: null,

            setUsername: (username) => set({ username }),
            setApiKey: (apiKey) => set({ apiKey }),
            setLanguage: (language) => set({ language }),
            resetUser: () => set({
                username: 'Sem nome',
                apiKey: 'Sem API configurada',
                language: 'English'
            }),

            setLessons: (newLessons) => set({ allLessons: newLessons }),

            setActiveLesson: (lesson) => {
                if (!lesson) {
                    set({ activeLesson: null });
                    return;
                }

                set((state) => ({
                    activeLesson: lesson,
                    allLessons: state.allLessons.map((l) =>
                        l.id === lesson.id ? { ...l, started: true } : l
                    ),
                }));
            },
        }),
        {
            name: 'slow-englishai-phsalazar',
        }
    )
);

export default useAppStore;