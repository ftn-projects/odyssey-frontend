export interface CertificateRequest{
    id?: number,
    commonName?: string,
    email?: string,
    uid?: string,
    date?: Date,
    status?: CertificateStatus
}

export enum CertificateStatus {
    PENDING, ACCEPTED, DECLINED
}