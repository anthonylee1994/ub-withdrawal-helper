import {useEffect, useRef} from "react";
import {type IconType} from "react-icons";
import {Card, CardHeader, CardContent, Button, ButtonGroup} from "@heroui/react";
import {MdDownload, MdRefresh} from "react-icons/md";
import QRCode from "qrcode";

interface Props {
    label: string;
    value: string;
    icon?: IconType;
    fileName?: string;
    onGenerate: () => void;
}

export const QRCodeField = ({label, value, icon: Icon, fileName, onGenerate: onGenerate}: Props) => {
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

    const download = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = fileName || `${label.toLowerCase()}-qrcode.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <Card className="w-full gap-0">
            <CardHeader className="flex gap-3">
                {Icon && <Icon className="text-2xl" />}
                <h3 className="text-lg font-semibold">{label}</h3>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <canvas ref={canvasRef} />
                <div className="flex flex-wrap gap-2 justify-center">
                    <ButtonGroup>
                        <Button variant="outline" onPress={onGenerate} style={{minWidth: "6rem"}}>
                            <MdRefresh className="w-4 h-4" />
                            <span className="ml-1">Generate</span>
                        </Button>
                        <Button variant="primary" onPress={download} style={{minWidth: "6rem"}}>
                            <MdDownload className="w-4 h-4" />
                            <span className="ml-1">Download</span>
                        </Button>
                    </ButtonGroup>
                </div>
            </CardContent>
        </Card>
    );
};
