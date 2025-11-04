import { Component, signal } from '@angular/core';
import { LayoutComponent } from './pages/layout-component/layout-component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('appointmentapp-frontend');
}
