'use client'
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CardWrapperProps {
    title: string,
    description: string,
    children: React.ReactNode,
}

const CardWrapper = ({
    title,
    description,
    children
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default CardWrapper;