import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  currentUser = null;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    console.log(this.currentUser);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
