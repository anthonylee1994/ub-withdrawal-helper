import {memo, useCallback, useEffect, useRef, useState} from "react";
import QRCode from "qrcode";
import type {IconType} from "react-icons";
import {MdDownload, MdRefresh} from "react-icons/md";
import {CardContent, Button, ButtonGroup} from "@heroui/react";
import {MethodCard} from "@/components/MethodCard";

interface Props {
    label: string;
    value: string;
    icon: IconType;
    fileName: string;
    onGenerate: () => void;
}

export const QRCodeField = memo<Props>(({label, value, icon, fileName, onGenerate}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, value, {
                width: 100,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            }).catch(error => {
                console.error("Failed to generate QR code:", error);
                setError("Failed to generate QR code");
            });
        }
    }, [value]);

    const download = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }, [fileName]);

    return (
        <MethodCard label={label} icon={icon} className="gap-0">
            <CardContent className="flex flex-col items-center gap-4">
                {error ? <div className="text-red-500 text-sm">{error}</div> : <canvas ref={canvasRef} />}
                <div className="flex flex-wrap gap-2 justify-center">
                    <ButtonGroup>
                        <Button variant="outline" onPress={onGenerate} style={{minWidth: "6rem"}}>
                            <MdRefresh className="w-4 h-4" />
                            <span className="ml-1">Regenerate</span>
                        </Button>
                        <Button variant="primary" onPress={download} style={{minWidth: "6rem"}} isDisabled={!!error}>
                            <MdDownload className="w-4 h-4" />
                            <span className="ml-1">Download</span>
                        </Button>
                    </ButtonGroup>
                </div>
            </CardContent>
        </MethodCard>
    );
});
