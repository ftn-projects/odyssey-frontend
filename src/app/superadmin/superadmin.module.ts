import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateRequestsPageComponent } from './certificate-requests-page/certificate-requests-page.component';
import { CertificateCreationComponent } from './certificate-creation/certificate-creation.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CertificatesViewComponent } from './certificates-view/certificates-view.component';
import { CertificateStatus } from './model/certificate-request.model';
import { MaterialModule } from '../infrastructure/material/material.module';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CertDatePickerComponent } from './cert-date-picker/cert-date-picker.component';
import { CertificateInfoComponent } from './certificate-info/certificate-info.component';

@NgModule({
  declarations: [
    CertificateRequestsPageComponent,
    CertificateCreationComponent,
    CertificatesViewComponent,
    CertDatePickerComponent,
    CertificateInfoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class SuperadminModule { }
