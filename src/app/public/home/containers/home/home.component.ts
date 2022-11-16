import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('deAbajoHaciaArriba', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('700ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('700ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  public usuario$: Observable<any> = this.authService.afAuth.user;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  goIniciarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }

  goRegistrarme() {
    this.router.navigate(['/registro']);
  }
}
