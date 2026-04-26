import comingSoonSvg from "../assets/undraw_coming-soon.svg"
const ComingSoonPage = () => {
    return (
        <div className="flex items-center flex-col gap-5">
            <img src={comingSoonSvg} height="250" width={"250"} alt="Ilustração para comunicar que a página está em breve." />

            <p>Esta página ainda está em construção.</p>
        </div>
    )
}

export default ComingSoonPage