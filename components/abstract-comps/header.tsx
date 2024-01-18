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
        <div className="flex flex-col justify-center items-start gap-y-5">
            <h1
                className={cn("text-xl text-primary md:text-5xl font-semibold", headingClassName)}>
                {title}
            </h1>
            <p className={cn("text-sm text-secondary-foreground md:text-lg font-medium", paraClassName)}>{description}</p>
        </div >
    );
}

export default Header