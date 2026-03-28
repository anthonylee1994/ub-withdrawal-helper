import {useCallback, useState} from "react";
import {type IconType} from "react-icons";
import {Card, CardHeader, CardContent, Button, InputGroup} from "@heroui/react";
import {MdCheck, MdContentCopy} from "react-icons/md";

interface Props {
    label: string;
    value: string;
    icon: IconType;
    onGenerate: () => void;
}

export const CopyField = ({label, value, icon: Icon, onGenerate}: Props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [value]);

    return (
        <Card className="w-full">
            <CardHeader className="flex gap-3">
                {Icon && <Icon className="text-2xl" />}
                <h3 className="text-lg font-semibold">{label}</h3>
            </CardHeader>
            <CardContent className="flex gap-3 items-center">
                <InputGroup variant="secondary" className="w-full rounded-full">
                    <InputGroup.Input readOnly value={value} />
                    <InputGroup.Suffix className="pr-0.5">
                        <Button isIconOnly aria-label="Copy" size="sm" variant="ghost" onPress={handleCopy}>
                            {copied ? <MdCheck className="text-lg text-emerald-600" /> : <MdContentCopy className="text-lg" />}
                        </Button>
                    </InputGroup.Suffix>
                </InputGroup>
                <Button variant="primary" onPress={onGenerate} style={{minWidth: "6rem"}}>
                    Generate
                </Button>
            </CardContent>
        </Card>
    );
};
