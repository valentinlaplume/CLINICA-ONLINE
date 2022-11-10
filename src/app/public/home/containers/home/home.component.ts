import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
