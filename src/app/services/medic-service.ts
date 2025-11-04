import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Medic } from '../model/medic';
import { GenericService } from './generic-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic> {
  private medicChange: Subject<Medic[]> = new Subject<Medic[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/medics`
    );
  }

  setMedicChange(medic: Medic[]){
    this.medicChange.next(medic);
  }

  getMedicChange(){
    return this.medicChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

}
