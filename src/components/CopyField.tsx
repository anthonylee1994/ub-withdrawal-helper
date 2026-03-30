import React from "react";
import type {IconType} from "react-icons";
import {useCallback, useEffect, useRef, useState} from "react";
import {MdCheck, MdContentCopy, MdRefresh} from "react-icons/md";
import {CardContent, Button, InputGroup} from "@heroui/react";
import {MethodCard} from "@/components/MethodCard";

interface Props {
    label: string;
    value: string;
    icon: IconType;
    onGenerate: () => void;
}

export const CopyField = React.memo<Props>(({label, value, icon, onGenerate}) => {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }, [value]);

    return (
        <MethodCard label={label} icon={icon}>
            <CardContent className="flex gap-3 items-center">
                <InputGroup variant="secondary" className="w-full rounded-full">
                    <InputGroup.Input readOnly value={value} />
                    <InputGroup.Suffix className="pr-0.5">
                        <Button isIconOnly aria-label="Copy" size="sm" variant="ghost" onPress={handleCopy}>
                            {copied ? <MdCheck className="text-lg text-emerald-600" /> : <MdContentCopy className="text-lg" />}
                        </Button>
                    </InputGroup.Suffix>
                </InputGroup>
                <Button variant="outline" onPress={onGenerate} style={{minWidth: "6rem"}}>
                    <MdRefresh className="w-4 h-4" />
                    Regenerate
                </Button>
            </CardContent>
        </MethodCard>
    );
});
