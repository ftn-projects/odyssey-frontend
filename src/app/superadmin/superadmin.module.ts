import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateRequestsPageComponent } from './certificate-requests-page/certificate-requests-page.component';
import { CertificateCreationComponent } from './certificate-creation/certificate-creation.component';



@NgModule({
  declarations: [
    CertificateRequestsPageComponent,
    CertificateCreationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SuperadminModule { }
