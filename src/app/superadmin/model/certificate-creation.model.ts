export interface CertificateCreation {
    parentAlias: string,
    commonName: string,
    uid?: string,
    email?: string,
    startDate: Date,
    endDate: Date,
    isCa: boolean,
    isHttps: boolean,
    keyUsages: string[]
}
