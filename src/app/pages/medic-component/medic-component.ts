import { Component, ViewChild } from '@angular/core';
import { Medic } from '../../model/medic';
import { MedicService } from '../../services/medic-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MedicDialogComponent } from './medic-dialog-component/medic-dialog-component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medic',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatIconModule, 
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './medic-component.html',
  styleUrl: './medic-component.css'
})
export class MedicComponent {
  dataSource: MatTableDataSource<Medic>;

  columnsDefinitions = [
    { def: 'idMedic', label: 'idMedic', hide: true },
    { def: 'primaryName', label: 'primaryName', hide: false },
    { def: 'surname', label: 'surname', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicService: MedicService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.medicService.findAll().subscribe((data) => this.createTable(data));
    this.medicService.getMedicChange().subscribe(data => this.createTable(data));
    this.medicService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', { duration: 2000 }));
  }

  createTable(data: Medic[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openDialog(medic?: Medic) {
    this._dialog.open(MedicDialogComponent, {
      width: '750px',
      data: medic
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
