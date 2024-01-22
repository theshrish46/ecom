"use client";

interface HeadProps {
    title: string,
    description: string,
}

const Header = ({
    title,
    description,
}: HeadProps) => {
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="text-sm font-medium">{description}</p>
        </div>
    );
}

export default Header;