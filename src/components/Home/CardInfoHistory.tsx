import type { IconType } from "react-icons"

interface Task {
    icon?: IconType,
    label: string,
    date: Date
}

const CardInfoHistory = ({ icon: Icon, label, date }: Task) => {
    return (
        <div className="flex items-center gap-2 mb-4">
            {Icon && <Icon className="text-xs p-1.5 text-white rounded-md bg-blue-600 w-[32px] h-[32px]" />}

            <div className="flex flex-col">
                <p className="text-sm font-bold">{label}</p>
                <span className="text-xs text-gray-500">{date.toLocaleString('pt-br')}</span>
            </div>
        </div>
    )
}

export default CardInfoHistory