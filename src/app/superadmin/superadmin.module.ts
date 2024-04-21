import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateRequestsPageComponent } from './certificate-requests-page/certificate-requests-page.component';
import { CertificateCreationComponent } from './certificate-creation/certificate-creation.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CertificatesViewComponent } from './certificates-view/certificates-view.component';
import { CertificateStatus } from './model/certificate-request.model';


@NgModule({
  declarations: [
    CertificateRequestsPageComponent,
    CertificateCreationComponent,
    CertificatesViewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class SuperadminModule { }
