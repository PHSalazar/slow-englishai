import Card from "../components/Home/Card";
import useUserInfoStore from "../store/useUserInfoStore";

const Home = () => {
    const { username } = useUserInfoStore();

    const formattedName = (fullname: string) => {
        return fullname?.split(" ")[0] || fullname
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-2xl">Bem-vindo de volta, {formattedName(username)}!</h1>
            <p className="text-xs font-light">Você está a <b>5</b> dias de completar sua meta semanal.</p>

            <div className="flex flex-col sm:grid sm:grid-cols-6 sm:grid-rows-14 gap-4">
                <Card className="col-span-4 min-h-[200px] sm:row-span-7 bg-white">
                    Lorem ipsum dolor sit amet.
                    Next Lesson
                </Card>
                <Card className="col-span-2 min-h-[200px] sm:row-span-7 bg-white">
                    Lorem, ipsum dolor.
                    Last Info
                </Card>

                <Card className="col-span-6 min-h-[200px] sm:row-span-7">
                    Lorem ipsum dolor sit amet.
                    Quick Reply/Quiz
                </Card>
            </div>
        </div>
    )
}

export default Home