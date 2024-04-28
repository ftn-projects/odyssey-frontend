export interface Certificate {
    parentAlias?: string,
    commonName?: string,
    uid?: string,
    startDate?: Date,
    endDate?: Date,
    isCa?: Boolean,
    isHttps?: Boolean,
    keyUsages?: Map<KeyUsage, string[]>
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

//create mapper that maps string value to enum
export const KeyUsageMapper = {
    'Digital Signature': KeyUsage.DIGITAL_SIGNATURE,
    'Non-Repudiation': KeyUsage.NON_REPUDIATION,
    'Key Data Encipherment': KeyUsage.KEY_ENCIPHERMENT,
    'Data Encipherment': KeyUsage.DATA_ENCIPHERMENT,
    'Key Agreement': KeyUsage.KEY_AGREEMENT,
    'Certificate Signer': KeyUsage.CERTIFICATE_SIGN,
    'CRL Signer': KeyUsage.CRL_SIGN
}

