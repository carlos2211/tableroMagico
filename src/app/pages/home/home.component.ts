import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  
  categorias = [
    {
      nombre: 'Estrategia',
      slug: 'estrategia',
      imagen: 'assets/img/estrategia.png'
    },
    {
      nombre: 'Familiares',
      slug: 'familiares',
      imagen: 'assets/img/familiar.png'
    },
    {
      nombre: 'Cartas',
      slug: 'cartas',
      imagen: 'assets/img/cartas.png'
    }
  ];
}
