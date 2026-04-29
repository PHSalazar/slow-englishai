import { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import useUserInfoStore from '../store/useUserInfoStore';

const FullScreenLesson = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const allLessons = useUserInfoStore((state) => state.allLessons);
    const setActiveLesson = useUserInfoStore((state) => state.setActiveLesson);

    const currentLesson = allLessons.find(lesson => lesson.id === Number(id));
    const titleCurrentLesson = currentLesson ? currentLesson.title : null;

    useEffect(() => {
        if (currentLesson && !currentLesson.started) {
            setActiveLesson(currentLesson);
        }
    }, [currentLesson, setActiveLesson]);

    return (
        <div>
            <div className='flex flex-nowrap items-center gap-2'>
                <IoIosArrowRoundBack size={20} onClick={() => navigate(-1)} className='cursor-pointer' title='Voltar para Lessons' />
                <p>
                    {titleCurrentLesson}
                </p>
            </div>
        </div>
    )
}

export default FullScreenLesson