import React from "react";
import QRCode from "qrcode";
import type {IconType} from "react-icons";
import {useCallback, useEffect, useRef} from "react";
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

export const QRCodeField = React.memo<Props>(({label, value, icon, fileName, onGenerate}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, value, {
                width: 150,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
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
                <canvas ref={canvasRef} />
                <div className="flex flex-wrap gap-2 justify-center">
                    <ButtonGroup>
                        <Button variant="outline" onPress={onGenerate} style={{minWidth: "6rem"}}>
                            <MdRefresh className="w-4 h-4" />
                            <span className="ml-1">Regenerate</span>
                        </Button>
                        <Button variant="primary" onPress={download} style={{minWidth: "6rem"}}>
                            <MdDownload className="w-4 h-4" />
                            <span className="ml-1">Download</span>
                        </Button>
                    </ButtonGroup>
                </div>
            </CardContent>
        </MethodCard>
    );
});
