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

  getAll(): Observable<CertificateRequest[]>{
    return this.http.get<CertificateRequest[]>(this.path + "requests");
  }

  sendRequest(request: CertificateRequest): Observable<CertificateRequest>{
    return this.http.post<CertificateRequest>(this.path + "requests", request);
  }

  approveRequest(id: number): Observable<CertificateRequest>{
    return this.http.put<CertificateRequest>(this.path + "requests/accept/" + id, {});
}

    declineRequest(id: number): Observable<CertificateRequest>{
        return this.http.put<CertificateRequest>(this.path + "requests/decline/" + id, {});
    }

  getAllCertificates(): Observable<Certificate[]>{
    return this.http.get<Certificate[]>(this.path + "certificates")
  }

  sendCertificate(certificate: any): Observable<any>{
    return this.http.post<Certificate>(this.path + "certificates", certificate);
  }

  deleteCertificate(serialNumber: string): Observable<any>{
    return this.http.delete(this.path + "certificates/" + serialNumber);
  } 
}
