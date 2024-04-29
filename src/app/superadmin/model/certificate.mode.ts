export interface Certificate {
    alias?: string,
    parentAlias?: string,
    issuer?: any,
    subject?: any,
    validity?: { start?: Date, end?: Date },
    publicKey?: { format?: string, algorithm?: string, encoded?: any },
    extensions?: { name?: string, critical?: boolean, values?: any[] }[],
    signature?: { algorithm?: string, value?: any }
}

export enum KeyUsage {
    DIGITAL_SIGNATURE,
    NON_REPUDIATION,
    KEY_ENCIPHERMENT,
    DATA_ENCIPHERMENT,
    KEY_AGREEMENT,
    CERTIFICATE_SIGN,
    CRL_SIGN
}

export const keyUsageDescription = new Map<KeyUsage, string>([
    [KeyUsage.DIGITAL_SIGNATURE, 'Digital Signature'],
    [KeyUsage.NON_REPUDIATION, 'Non-Repudiation'],
    [KeyUsage.KEY_ENCIPHERMENT, 'Key Data Encipherment'],
    [KeyUsage.DATA_ENCIPHERMENT, 'Data Encipherment'],
    [KeyUsage.KEY_AGREEMENT, 'Key Agreement'],
    [KeyUsage.CERTIFICATE_SIGN, 'Certificate Signer'],
    [KeyUsage.CRL_SIGN, 'CRL Signer']
]);

export const parseKeyUsage = new Map<string, KeyUsage>(
    Array.from(keyUsageDescription, e => [e[1], e[0]])
);