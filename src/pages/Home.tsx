import { FaRocketchat } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { TbMoodEmpty } from "react-icons/tb";
import { VscDebugStart } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import imageStuding from "../assets/studing.png";
import Card from "../components/Home/Card";
import CardInfoHistory from "../components/Home/CardInfoHistory";
import QuizContainer from "../components/Quiz/QuizContainer";
import useUserInfoStore from "../store/useUserInfoStore";

const Home = () => {
    const { username, lastAccessedLesson } = useUserInfoStore();

    const { history, allLessons } = useUserInfoStore(); // useUserInfoStore((state) => state.allLessons);
    const currentLesson = allLessons.find(lesson => lesson.id === Number(lastAccessedLesson));
    const titleCurrentLesson = currentLesson ? currentLesson.title : null;
    const descriptionCurrentLesson = currentLesson ? currentLesson.description : null;

    const formattedName = (fullname: string) => {
        return fullname?.split(" ")[0] || fullname
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-2xl">Bem-vindo de volta, {formattedName(username)}!</h1>
            <p className="text-xs font-light">Você está a <b>5</b> dias de completar sua meta semanal.</p>

            <div className="flex flex-col sm:grid sm:grid-cols-6 sm:grid-rows-14 gap-4">
                <Card className="col-span-4 flex flex-col items-start min-h-[200px] sm:row-span-7 bg-blue-900/10 relative overflow-hidden p-5">
                    <img src={imageStuding} className="absolute bottom-5 sm:top-5 -z-50 opacity-10" />

                    {
                        lastAccessedLesson ? (
                            <>
                                <h1 className="text-2xl font-extrabold">{titleCurrentLesson}</h1>
                                <h2 className="text-md flex-1 text-gray-500!">{descriptionCurrentLesson}</h2>
                                <NavLink to={`lesson/${lastAccessedLesson}`} className="mt-8 self-center bg-white text-[#1E40AF] rounded-md w-11/12 sm:w-7/12 py-2
                    cursor-pointer flex flex-nowrap items-center justify-center font-medium hover:bg-[#1E40AF] hover:text-white transition-all gap-2">
                                    Continuar Lição <VscDebugStart />
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-extrabold">Que tal iniciarmos os seus estudos?</h1>
                                <h2 className="text-md flex-1 text-gray-500!">Inicie seus estudos agora mesmo e vamos avançar jutnos!</h2>

                                <NavLink to="lessons" className="mt-8 self-center bg-white text-[#1E40AF] rounded-md w-11/12 sm:w-7/12 py-2
                    cursor-pointer flex flex-nowrap items-center justify-center font-medium hover:bg-[#1E40AF] hover:text-white transition-all gap-2">
                                    Iniciar Lição <MdOutlineRocketLaunch />
                                </NavLink>
                            </>
                        )
                    }
                </Card>
                <Card className="col-span-2 min-h-[200px] h-[250px] sm:row-span-7 bg-white  flex flex-col">
                    <h6 className="font-bold text-xs mb-3 flex flex-nowrap gap-1 items-center"><FaRocketchat /> Atividades Recentes</h6>

                    <div className="flex-1 overflow-y-auto">
                        {
                            history.length > 0 ? (
                                history.slice(0, 3).map(t => <CardInfoHistory key={t.label + t.date} {...t} />)
                            ) : (
                                <p className="flex-1 h-full text-xs flex flex-col items-center justify-center text-gray-400"><TbMoodEmpty size={24} /> Sem histórico.</p>
                            )
                        }
                    </div>

                    <p className="text-center"><NavLink to="/" className="text-xs">Ver todas as atividades</NavLink></p>
                </Card>

                <Card className="col-span-6 min-h-[200px] sm:row-span-7">
                    <h2>Quiz</h2>
                    <QuizContainer />
                </Card>
            </div>
        </div>
    )
}

export default Home