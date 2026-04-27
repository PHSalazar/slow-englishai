import { create } from "zustand";

interface Lesson {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    percentage: number,
    started?: boolean
}

interface LessonState {
    allLessons: Lesson[],
    activeLesson: Lesson | null; // id da últ. lição estudada
    setLessons: (newLessons: Lesson[]) => void;
    setActiveLesson: (id: Lesson | null) => void;
}

const useLessonStore = create<LessonState>((set) => ({
    allLessons: [
        {
            "id": 1,
            "title": "Lesson 1: Greetings and Introductions",
            "description": "Aprenda a cumprimentar pessoas, se apresentar e usar expressões básicas de cortesia no dia a dia.",
            completed: false,
            percentage: 0,
        },
        {
            "id": 2,
            "title": "Lesson 2: Essential Verbs and Pronouns",
            "description": "Foco no verbo 'to be' e pronomes pessoais para construir frases afirmativas e negativas simples.",
            completed: false,
            percentage: 0
        },
        {
            "id": 3,
            "title": "Lesson 3: Common Vocabulary and Objects",
            "description": "Expansão de vocabulário com nomes de objetos comuns, cores e números para descrever o ambiente.",
            completed: false,
            percentage: 0
        },
        {
            "id": 4,
            "title": "Lesson 4: Present Simple Tense",
            "description": "Como falar sobre rotinas, hábitos e fatos usando verbos de ação no presente.",
            completed: false,
            percentage: 0
        },
        {
            "id": 5,
            "title": "Lesson 5: Asking Questions",
            "description": "Uso de 'Do/Does' e pronomes interrogativos (Who, What, Where, When, Why) para formular perguntas.",
            completed: false,
            percentage: 0
        },
        {
            "id": 6,
            "title": "Lesson 6: Telling Time and Schedules",
            "description": "Aprenda a ler as horas, falar sobre dias da semana e organizar compromissos em inglês.",
            completed: false,
            percentage: 0
        },
        {
            "id": 7,
            "title": "Lesson 7: Daily Conversations",
            "description": "Prática de diálogos situacionais, como pedir comida em um restaurante ou pedir informações.",
            completed: false,
            percentage: 0
        }
    ],
    activeLesson: null,

    // Salvar lições
    setLessons: (newLesson) => set({ allLessons: newLesson }),

    // Setar ult. licao aberta
    setActiveLesson: (lesson) => {
        if (!lesson) {
            set({ activeLesson: null });
            return;
        }

        set((state) => ({
            activeLesson: lesson,
            // Atualiza a lista global para refletir que esta lição começou
            allLessons: state.allLessons.map((l) =>
                l.id === lesson.id ? { ...l, started: true } : l
            ),
        }));
    },


}))

export default useLessonStore;