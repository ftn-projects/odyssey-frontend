import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateRequest } from './model/certificate-request.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { Certificate } from './model/certificate.mode';


@Injectable({
    providedIn: 'root'
})
export class SuperadminService {

    constructor(private http: HttpClient) { }
    private path: string = environment.certificateApi;

    getAll(): Observable<CertificateRequest[]> {
        return this.http.get<CertificateRequest[]>(this.path + "requests");
    }

    getByCommonName(name: string, surname: string): Observable<Blob> {
        const options = { responseType: 'blob' as 'json' };
        return this.http.get<Blob>(this.path + "certificates/download/" + name + "/" + surname, options);
    }

    sendRequest(request: CertificateRequest): Observable<CertificateRequest> {
        return this.http.post<CertificateRequest>(this.path + "requests", request);
    }

    hasCertificate(name: string, surname: string): Observable<boolean> {
        return this.http.get<boolean>(this.path + "certificates/has/" + name + "/" + surname);
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

    sendCertificate(certificate: any): Observable<any> {
        return this.http.post<Certificate>(this.path + "certificates", certificate);
    }

    deleteCertificate(serialNumber: string): Observable<any> {
        console.log(this.path + "certificates/" + serialNumber);
        return this.http.delete(this.path + "certificates/" + serialNumber);
    }
}
