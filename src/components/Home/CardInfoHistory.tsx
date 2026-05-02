import * as Icons from 'react-icons/fa6';

interface Task {
    icon?: string,
    label: string,
    date: Date
}

const CardInfoHistory = ({ icon, label, date }: Task) => {
    const IconComponent = icon ? (Icons as any)[icon] : null;
    const convertedDate = typeof date === "string" ? new Date(date) : date;
    const stringDate = convertedDate.toLocaleString('pt-br', { dateStyle: "short", timeStyle: "short" }).toString().replace(", ", " às ")

    return (
        <div className="flex items-center gap-2 mb-4">
            {IconComponent && <IconComponent className="text-xs p-1.5 text-white rounded-md bg-blue-600 w-[32px] h-[32px] shrink-0" />}

            <div className="flex flex-col">
                <p className="text-sm font-bold">{label}</p>
                <span className="text-xs text-gray-500">{stringDate}</span>
            </div>
        </div>
    )
}

export default CardInfoHistory