import React from "react";
import {SiTether} from "react-icons/si";
import type {IconType} from "react-icons";
import {useState, useCallback} from "react";
import {FaWeixin, FaAlipay} from "react-icons/fa";
import {CopyField} from "./components/CopyField";
import {QRCodeField} from "./components/QRCodeField";
import {generateUSDTAddress} from "./generators/usdt";
import {generateToPayAddress} from "./generators/toPay";
import {generateAlipayQrUrl} from "./generators/alipay";
import {generateWeChatPayUrl} from "./generators/wechat";
import {generateBankCardNumber} from "./generators/bankCard";
import {generateDigitalRMBNumber} from "./generators/digitalRMB";
import {MdAccountBalance, MdCurrencyExchange, MdPayment} from "react-icons/md";

type MethodId = "bankAccount" | "usdt" | "digitalRmb" | "toPay" | "wechat" | "alipay";

type CopyMethodConfig = {
    type: "copy";
    label: string;
    icon: IconType;
    generate: () => string;
};

type QRMethodConfig = {
    type: "qr";
    label: string;
    icon: IconType;
    fileName: string;
    generate: () => string;
};

type MethodConfig = CopyMethodConfig | QRMethodConfig;

const METHOD_CONFIG: Record<MethodId, MethodConfig> = {
    bankAccount: {
        type: "copy",
        label: "Bank Account",
        icon: MdAccountBalance,
        generate: generateBankCardNumber,
    },
    usdt: {
        type: "copy",
        label: "USDT",
        icon: SiTether,
        generate: generateUSDTAddress,
    },
    digitalRmb: {
        type: "copy",
        label: "Digital RMB",
        icon: MdCurrencyExchange,
        generate: generateDigitalRMBNumber,
    },
    toPay: {
        type: "copy",
        label: "ToPay",
        icon: MdPayment,
        generate: generateToPayAddress,
    },
    wechat: {
        type: "qr",
        label: "WeChat",
        icon: FaWeixin,
        fileName: "wechat-qrcode.png",
        generate: generateWeChatPayUrl,
    },
    alipay: {
        type: "qr",
        label: "Alipay",
        icon: FaAlipay,
        fileName: "alipay-qrcode.png",
        generate: generateAlipayQrUrl,
    },
};

const INITIAL_VALUES = Object.fromEntries(Object.entries(METHOD_CONFIG).map(([id, config]) => [id, config.generate()])) as Record<MethodId, string>;

export const App = React.memo(() => {
    const [values, setValues] = useState<Record<MethodId, string>>(INITIAL_VALUES);

    const handleGenerate = useCallback((id: MethodId) => {
        setValues(prev => ({...prev, [id]: METHOD_CONFIG[id].generate()}));
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-slate-100">Withdrawal Helper</h1>
                <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Copy account details or download QR codes for withdrawals</p>

                <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(METHOD_CONFIG).map(([id, config]) =>
                        config.type === "copy" ? (
                            <CopyField key={id} label={config.label} value={values[id as MethodId]} icon={config.icon} onGenerate={() => handleGenerate(id as MethodId)} />
                        ) : (
                            <QRCodeField key={id} label={config.label} value={values[id as MethodId]} icon={config.icon} fileName={config.fileName} onGenerate={() => handleGenerate(id as MethodId)} />
                        )
                    )}
                </div>
            </div>
        </div>
    );
});
