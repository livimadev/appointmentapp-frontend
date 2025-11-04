import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { switchMap } from 'rxjs';
import { Medic } from '../../../model/medic';
import { Specialty } from '../../../model/specialty';
import { MedicService } from '../../../services/medic-service';
import { SpecialtyService } from '../../../services/specialty-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medic-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './medic-dialog-component.html',
  styleUrl: './medic-dialog-component.css'
})
export class MedicDialogComponent {
  medic: Medic;
  specialties: Specialty[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService,
    private specialtyService: SpecialtyService
  ){}

  ngOnInit(): void {
    this.medic = {... this.data}; //spread operator
    //this.medic = this.data;
    /*this.medic = new Medic();
    this.medic.idMedic = this.data.idMedic;
    this.medic.idSpecialty = this.data.idSpecialty;
    this.medic.primaryName = this.data.primaryName;
    this.medic.surname = this.data.surname;
    this.medic.photo = this.data.photo;*/

    this.specialtyService.findAll().subscribe(data => this.specialties = data);
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.medic != null && this.medic.idMedic > 0){
      //UPDATE
      this.medicService.update(this.medic.idMedic, this.medic)
        .pipe(switchMap ( () => this.medicService.findAll()))
        .subscribe(data => {
          this.medicService.setMedicChange(data);
          this.medicService.setMessageChange('UPDATED!');
        });
    }else{
      //INSERT
      this.medicService.save(this.medic)
        .pipe(switchMap ( () => this.medicService.findAll()))
        .subscribe(data => {
          this.medicService.setMedicChange(data);
          this.medicService.setMessageChange('CREATED!');
        });
    }

    this.close();
  }
}
