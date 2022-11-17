import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  trigger,
  transition,
  animate,
  style,
  state,
  group,
} from '@angular/animations';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class MiPerfilComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
