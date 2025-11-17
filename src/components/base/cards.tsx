
import type { ReactNode, MouseEvent } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function Card({ children, className = '', hover = false, padding = 'md', onClick }: CardProps) {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div
            className={`bg-white rounded-xl border border-gray-200 shadow-sm ${hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : ''} ${paddingClasses[padding]} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
