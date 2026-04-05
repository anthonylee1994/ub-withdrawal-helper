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
