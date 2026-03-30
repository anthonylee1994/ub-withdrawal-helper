import type {IconType} from "react-icons";

export type MethodType = "copy" | "qr";

export interface BaseMethodConfig {
    type: MethodType;
    label: string;
    icon: IconType;
    generate: () => string;
}

export interface CopyMethodConfig extends BaseMethodConfig {
    type: "copy";
}

export interface QRMethodConfig extends BaseMethodConfig {
    type: "qr";
    fileName: string;
}

export type MethodConfig = CopyMethodConfig | QRMethodConfig;

export type MethodId = "bankAccount" | "trc20" | "erc20" | "digitalRmbAndToPay" | "wechat" | "alipay";

export interface BankConfigRow {
    [key: number]: string | number;
    0: string; // prefix
    1: string; // bank name
    2: string; // bank code
    3: string; // length
    4: string | number; // type
}
