import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public usuario$: Observable<any> = this.authService.afAuth.user;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout().then((res) => {
      console.log('onLogout navbar');
      location.reload();
      this.router.navigate(['/iniciar-sesion']);
    });
  }

  goInicio() {
    this.router.navigate(['/inicio']);
  }

  goIniciarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }

  goRegistrarme() {
    this.router.navigate(['/registro']);
  }

  goHabilitarEspecialistas() {
    this.router.navigate(['/administracion/habilitar-cuentas']);
  }

  goRegistrarAdmin() {
    this.router.navigate(['/administracion/registro/admin']);
  }

  onMiPerfil() {
    this.router.navigate(['/intranet/mi-perfil']);
  }

  goSolicitarTurnos() {
    this.router.navigate(['/intranet/solicitar-turno']);
  }

  goVerTurnos() {
    this.router.navigate(['/administracion/turnos']);
  }

  onEstadisticas() {
    this.router.navigate(['/administracion/estadisticas']);
  }

  onMisHorarios() {
    this.router.navigate(['/intranet/mis-horarios']);
  }

  goMisTurnosPaciente() {
    this.router.navigate(['/intranet/mis-turnos-paciente']);
  }

  goMisTurnosEspecialista() {
    this.router.navigate(['/intranet/mis-turnos-especialista']);
  }

  goMisPacientes() {
    this.router.navigate(['/intranet/mis-pacientes']);
  }

  goUsuarios() {
    this.router.navigate(['/intranet/usuarios']);
  }
}
