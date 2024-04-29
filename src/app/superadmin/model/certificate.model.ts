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

export const keyUsageDescription: { [key: string]: string } = {
    'DIGITAL_SIGNATURE': 'Digital Signature',
    'NON_REPUDIATION': 'Non-Repudiation',
    'KEY_ENCIPHERMENT': 'Key Encipherment',
    'DATA_ENCIPHERMENT': 'Data Encipherment',
    'KEY_AGREEMENT': 'Key Agreement',
    'CERTIFICATE_SIGN': 'Certificate Signer',
    'CRL_SIGN': 'CRL Signer'
};

export const parseKeyUsage: { [key: string]: string } = {
    'Digital Signature': 'DIGITAL_SIGNATURE',
    'Non-Repudiation': 'NON_REPUDIATION',
    'Key Encipherment': 'KEY_ENCIPHERMENT',
    'Data Encipherment': 'DATA_ENCIPHERMENT',
    'Key Agreement': 'KEY_AGREEMENT',
    'Certificate Signer': 'CERTIFICATE_SIGN',
    'CRL Signer': 'CRL_SIGN'
};
