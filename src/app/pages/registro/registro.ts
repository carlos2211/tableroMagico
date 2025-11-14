import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';

  registrar() {
    alert('Usuario registrado con éxito');
    console.log('Registrando usuario:', {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    });
  }
}
