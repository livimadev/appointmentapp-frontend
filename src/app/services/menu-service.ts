import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic-service';
import { Menu } from '../model/menu';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu> {
  private menuChange = new Subject<Menu[]>();

   constructor() { 
      super(
        inject(HttpClient),
        `${environment.HOST}/menus`
      );
    }

    getMenusByUser(username: string){
      return this.http.post<Menu[]>(`${environment.HOST}/menus/user`, username);
    }

    getMenuChange(){
      return this.menuChange.asObservable();
    }

    setMenuChange(menus: Menu[]){
      this.menuChange.next(menus);
    }

}
