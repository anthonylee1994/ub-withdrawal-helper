import {memo, useState, useCallback} from "react";
import {SiTether} from "react-icons/si";
import {FaWeixin, FaAlipay} from "react-icons/fa";
import {CopyField} from "@/components/CopyField";
import {QRCodeField} from "@/components/QRCodeField";
import {generateTRC20Address} from "@/generators/trc20";
import {generateERC20Address} from "@/generators/erc20";
import {generateAlipayQrUrl} from "@/generators/alipay";
import {generateWeChatQrUrl} from "@/generators/wechat";
import {generateBankCardNumber} from "@/generators/bankCard";
import {generateDigitalRMBAndToPayNumber} from "@/generators/digitalRMBAndToPay";
import {MdAccountBalance, MdCurrencyExchange, MdRefresh} from "react-icons/md";
import {Button} from "@heroui/react";
import type {MethodId, MethodConfig} from "@/types/generators";

const METHOD_CONFIG: Record<MethodId, MethodConfig> = {
    bankAccount: {
        type: "copy",
        label: "Bank Account",
        icon: MdAccountBalance,
        generate: generateBankCardNumber,
    },
    digitalRmbAndToPay: {
        type: "copy",
        label: "Digital RMB / ToPay",
        icon: MdCurrencyExchange,
        generate: generateDigitalRMBAndToPayNumber,
    },
    trc20: {
        type: "copy",
        label: "USDT (TRC-20)",
        icon: SiTether,
        generate: generateTRC20Address,
    },
    erc20: {
        type: "copy",
        label: "USDT (ERC-20)",
        icon: SiTether,
        generate: generateERC20Address,
    },
    wechat: {
        type: "qr",
        label: "WeChat",
        icon: FaWeixin,
        fileName: "wechat-qrcode.png",
        generate: generateWeChatQrUrl,
    },
    alipay: {
        type: "qr",
        label: "Alipay",
        icon: FaAlipay,
        fileName: "alipay-qrcode.png",
        generate: generateAlipayQrUrl,
    },
};

const METHOD_IDS = Object.freeze(Object.keys(METHOD_CONFIG)) as readonly MethodId[];

function generateAllValues(): Record<MethodId, string> {
    return Object.fromEntries(METHOD_IDS.map(id => [id, METHOD_CONFIG[id].generate()])) as Record<MethodId, string>;
}

export const App = memo(() => {
    const [values, setValues] = useState<Record<MethodId, string>>(generateAllValues);

    const handleGenerate = useCallback((id: MethodId) => {
        setValues(prev => ({...prev, [id]: METHOD_CONFIG[id].generate()}));
    }, []);

    const handleGenerateAll = useCallback(() => {
        setValues(generateAllValues());
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-slate-100">Withdrawal Helper</h1>
                <p className="text-center text-slate-500 dark:text-slate-400 mb-4">Copy account details or download QR codes for withdrawals</p>
                <div className="flex justify-center mb-8">
                    <Button variant="outline" onPress={handleGenerateAll}>
                        <MdRefresh className="w-4 h-4" />
                        Regenerate all
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {METHOD_IDS.map(id => {
                        const config = METHOD_CONFIG[id];
                        return config.type === "copy" ? (
                            <CopyField key={id} label={config.label} value={values[id]} icon={config.icon} onGenerate={() => handleGenerate(id)} />
                        ) : (
                            <QRCodeField key={id} label={config.label} value={values[id]} icon={config.icon} fileName={config.fileName} onGenerate={() => handleGenerate(id)} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
