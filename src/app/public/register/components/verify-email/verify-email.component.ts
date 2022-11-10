import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  public usuario$: Observable<any> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSendEmail(): Promise<void> {
    try {
      this.usuario$.subscribe(async (item) => {
        const user = {
          id: item.uid,
          email: item.email,
        };
        await this.authSvc.sendVerifcationEmail();
      });
    } catch (error) {
      console.log('Error->', error);
    }
  }

  ngOnDestroy(): void {
    this.authSvc.setearMsjError();
  }
}
