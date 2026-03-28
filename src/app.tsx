import {useState, useCallback} from "react";
import {SiTether} from "react-icons/si";
import {MdAccountBalance, MdCurrencyExchange, MdPayment} from "react-icons/md";
import {FaWeixin, FaAlipay} from "react-icons/fa";
import {CopyField} from "./components/CopyField";
import {QRCodeField} from "./components/QRCodeField";
import {generateBankCardNumber} from "./utils/generators/bankCard";
import {generateUSDTAddress} from "./utils/generators/usdt";
import {generateDigitalRMBNumber} from "./utils/generators/digitalRMB";
import {generateToPayAddress} from "./utils/generators/toPay";
import {generateAlipayQrUrl} from "./utils/generators/alipay";
import {generateWeChatPayUrl} from "./utils/generators/wechat";

type CopyMethodId = "bankAccount" | "usdt" | "digitalRmb" | "toPay";

const METHOD_CONFIG = {
    bankAccount: {
        label: "Bank Account",
        icon: MdAccountBalance,
        type: "copy" as const,
    },
    usdt: {
        label: "USDT",
        icon: SiTether,
        type: "copy" as const,
    },
    digitalRmb: {
        label: "Digital RMB",
        icon: MdCurrencyExchange,
        type: "copy" as const,
    },
    toPay: {
        label: "ToPay",
        icon: MdPayment,
        type: "copy" as const,
    },
    wechat: {
        label: "WeChat",
        icon: FaWeixin,
        type: "qr" as const,
        fileName: "wechat-qrcode.png" as const,
    },
    alipay: {
        label: "Alipay",
        icon: FaAlipay,
        type: "qr" as const,
        fileName: "alipay-qrcode.png" as const,
    },
} as const;

const QR_METHODS = Object.values(METHOD_CONFIG).filter(m => m.type === "qr");

function generateValue(id: CopyMethodId): string {
    switch (id) {
        case "bankAccount":
            return generateBankCardNumber();
        case "usdt":
            return generateUSDTAddress();
        case "digitalRmb":
            return generateDigitalRMBNumber();
        case "toPay":
            return generateToPayAddress();
    }
}

export const App = () => {
    const [wechatUrl, setWechatUrl] = useState(() => generateWeChatPayUrl());
    const [alipayUrl, setAlipayUrl] = useState(() => generateAlipayQrUrl());

    const [values, setValues] = useState<Record<CopyMethodId, string>>(() => ({
        bankAccount: generateValue("bankAccount"),
        usdt: generateValue("usdt"),
        digitalRmb: generateValue("digitalRmb"),
        toPay: generateValue("toPay"),
    }));

    const handleGenerate = useCallback((id: CopyMethodId) => {
        setValues(prev => ({...prev, [id]: generateValue(id)}));
    }, []);

    const copyIds: CopyMethodId[] = ["bankAccount", "usdt", "digitalRmb", "toPay"];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-slate-100">Withdrawal Helper</h1>
                <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Copy account details or download QR codes for withdrawals</p>

                <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        {copyIds.map(id => {
                            const config = METHOD_CONFIG[id];
                            return <CopyField key={id} label={config.label} value={values[id]} icon={config.icon} onGenerate={() => handleGenerate(id)} />;
                        })}

                        {QR_METHODS.map(method => (
                            <QRCodeField
                                key={method.label}
                                label={method.label}
                                value={method.label === "WeChat" ? wechatUrl : alipayUrl}
                                icon={method.icon}
                                fileName={method.fileName}
                                onGenerate={method.label === "WeChat" ? () => setWechatUrl(generateWeChatPayUrl()) : () => setAlipayUrl(generateAlipayQrUrl())}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
