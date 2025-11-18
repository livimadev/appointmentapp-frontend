import { Routes } from "@angular/router";
import { PatientComponent } from "./patient-component/patient-component";
import { PatientEditComponent } from "./patient-component/patient-edit-component/patient-edit-component";
import { MedicComponent } from "./medic-component/medic-component";
import { DashboardComponent } from "./dashboard-component/dashboard-component";

export const pagesRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
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