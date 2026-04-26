import { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import useLessonStore from '../store/useLessonStore';

const FullScreenLesson = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const setActiveLesson = useLessonStore((state) => state.setActiveLesson);

    useEffect(() => {
        setActiveLesson(Number(id));
    }, [])

    return (
        <div>
            <div className='flex flex-nowrap items-center gap-2'>
                <IoIosArrowRoundBack size={20} onClick={() => navigate(-1)} className='cursor-pointer' title='Voltar para Lessons' />
                <p>
                    Lesson {id}
                </p>
            </div>
        </div>
    )
}

export default FullScreenLesson