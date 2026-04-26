import { create } from "zustand";

interface Lesson {
    id: number,
    title: string,
    description: string
}

interface LessonState {
    allLessons: Lesson[],
    activeLesson: number | null; // id da últ. lição estudada
    setLessons: (newLessons: Lesson[]) => void;
    setActiveLesson: (id: number) => void;
}

const useLessonStore = create<LessonState>((set) => ({
    allLessons: [
        {
            "id": 1,
            "title": "Lesson 1: Greetings and Introductions",
            "description": "Aprenda a cumprimentar pessoas, se apresentar e usar expressões básicas de cortesia no dia a dia."
        },
        {
            "id": 2,
            "title": "Lesson 2: Essential Verbs and Pronouns",
            "description": "Foco no verbo 'to be' e pronomes pessoais para construir frases afirmativas e negativas simples."
        },
        {
            "id": 3,
            "title": "Lesson 3: Common Vocabulary and Objects",
            "description": "Expansão de vocabulário com nomes de objetos comuns, cores e números para descrever o ambiente."
        },
        {
            "id": 4,
            "title": "Lesson 4: Present Simple Tense",
            "description": "Como falar sobre rotinas, hábitos e fatos usando verbos de ação no presente."
        },
        {
            "id": 5,
            "title": "Lesson 5: Asking Questions",
            "description": "Uso de 'Do/Does' e pronomes interrogativos (Who, What, Where, When, Why) para formular perguntas."
        },
        {
            "id": 6,
            "title": "Lesson 6: Telling Time and Schedules",
            "description": "Aprenda a ler as horas, falar sobre dias da semana e organizar compromissos em inglês."
        },
        {
            "id": 7,
            "title": "Lesson 7: Daily Conversations",
            "description": "Prática de diálogos situacionais, como pedir comida em um restaurante ou pedir informações."
        }
    ],
    activeLesson: null,

    // Salvar lições
    setLessons: (newLesson) => set({ allLessons: newLesson }),

    // Setar ult. licao aberta
    setActiveLesson: (id) => set({ activeLesson: id })


}))

export default useLessonStore;