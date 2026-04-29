import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

const Card = ({ children, className, ...props }: CardProps) => {
    return (
        <div {...props} className={`p-2 rounded-md shadow shadow-md ${className}`}>
            {children}
        </div>
    )
}

export default Card