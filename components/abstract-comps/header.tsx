import { cn } from "@/lib/utils";

interface HeaderProps {
    title: string,
    description: string,
    headingClassName?: string
    paraClassName?: string
}
const Header = ({
    title,
    description,
    headingClassName,
    paraClassName
}: HeaderProps) => {
    return (
        <div className="flex flex-col justify-center items-start my-4">
            <h1
                className={cn("text-primary font-semibold", headingClassName)}>
                {title}
            </h1>
            <p className={cn("text-secondary-foreground font-medium", paraClassName)}>{description}</p>
        </div >
    );
}

export default Header