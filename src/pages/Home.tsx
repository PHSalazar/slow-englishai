import Card from "../components/Home/Card"

const Home = () => {
    return (
        <div className="flex flex-col gap-5 h-full">
            <h1 className="font-extrabold text-2xl">Bem-vindo de volta, João da Silva!</h1>
            <p className="text-xs font-light">Você está a <b>5</b> dias de completar sua meta semanal.</p>

            <div className="grid grid-cols-6 grid-rows-14 gap-4 h-full">
                <Card className="col-span-4 row-span-7 bg-white">
                    Lorem ipsum dolor sit amet.
                    Next Lesson
                </Card>
                <Card className="col-span-2 row-span-7 bg-white">
                    Lorem, ipsum dolor.
                    Last Info
                </Card>

                <Card className="col-span-6 row-span-7">
                    Lorem ipsum dolor sit amet.
                    Quick Reply/Quiz
                </Card>
            </div>
        </div>
    )
}

export default Home