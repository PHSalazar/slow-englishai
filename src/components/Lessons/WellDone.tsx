import wellDone from "../../assets/well-done.png";
import useUserInfoStore from "../../store/useUserInfoStore";


const WellDone = () => {
    const { language } = useUserInfoStore();


    return (
        <div className="flex flex-col items-center justify-center h-full">
            <img src={wellDone} height="250" width={"250"} alt="Ilustração para comunicar que a página está em breve." />
            <p className="text-lg font-medium">Lição concluída! 🎉</p>
            <p className="text-sm text-gray-500">Você terminou mais uma etapa da sua jornada em <b>{language.toUpperCase()}</b>. Continue assim!</p>
        </div>
    )
}

export default WellDone