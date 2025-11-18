import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Menu } from '../../model/menu';
import { MenuService } from '../../services/menu-service';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css'
})
export class LayoutComponent {
  menus: Menu[];

  constructor(
    private menuService: MenuService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }

  logout(){
    this.loginService.logout();
  }
}
