import { Routes } from "@angular/router";
import { PatientComponent } from "./patient-component/patient-component";
import { PatientEditComponent } from "./patient-component/patient-edit-component/patient-edit-component";
import { MedicComponent } from "./medic-component/medic-component";

export const pagesRoutes: Routes = [
    {
        path: 'patient',
        component: PatientComponent,
        children: [
          { path: 'new', component: PatientEditComponent },
          { path: 'edit/:id', component: PatientEditComponent },
        ],
      },
      { path: 'medic', component: MedicComponent },
]