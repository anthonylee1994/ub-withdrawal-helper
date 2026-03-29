import React from "react";
import type {IconType} from "react-icons";
import {Card, CardHeader} from "@heroui/react";

interface Props {
    label: string;
    icon: IconType;
    className?: string;
    children: React.ReactNode;
}

export const MethodCard = React.memo<Props>(({label, icon: Icon, className, children}) => (
    <Card className={`w-full ${className ?? ""}`}>
        <CardHeader className="flex gap-3 flex-row items-center">
            <Icon className="text-2xl" />
            <h3 className="text-lg font-semibold">{label}</h3>
        </CardHeader>
        {children}
    </Card>
));
