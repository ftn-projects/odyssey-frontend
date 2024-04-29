import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateRequest } from './model/certificate-request.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { Certificate } from './model/certificate.model';
import { CertificateCreation } from './model/certificate-creation.model';


@Injectable({
    providedIn: 'root'
})
export class SuperadminService {

    constructor(private http: HttpClient) { }
    private path: string = environment.certificateApi;

    getAll(): Observable<CertificateRequest[]> {
        return this.http.get<CertificateRequest[]>(this.path + "requests");
    }

    getByCommonName(uid: number): Observable<Blob> {
        const options = { responseType: 'blob' as 'json' };
        return this.http.get<Blob>(this.path + "certificates/download/" + uid, options);
    }

    sendRequest(request: CertificateRequest): Observable<CertificateRequest> {
        return this.http.post<CertificateRequest>(this.path + "requests", request);
    }

    hasCertificate(uid: number): Observable<boolean> {
        return this.http.get<boolean>(this.path + "certificates/has/" + uid);
    }

    approveRequest(id: number): Observable<CertificateRequest> {
        return this.http.put<CertificateRequest>(this.path + "requests/accept/" + id, {});
    }

    declineRequest(id: number): Observable<CertificateRequest> {
        return this.http.put<CertificateRequest>(this.path + "requests/decline/" + id, {});
    }

    getAllCertificates(): Observable<Certificate[]> {
        return this.http.get<Certificate[]>(this.path + "certificates")
    }

    createCertificate(certificate: CertificateCreation): Observable<Certificate> {
        return this.http.post<Certificate>(this.path + "certificates", certificate);
    }

    deleteCertificate(alias: string): Observable<Certificate[]> {
        return this.http.delete<Certificate[]>(this.path + "certificates/" + alias);
    }

    getByAlias(alias: string): Observable<Certificate> {
        return this.http.get<Certificate>(this.path + "certificates/" + alias);
    }
}
