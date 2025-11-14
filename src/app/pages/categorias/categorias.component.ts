import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {

  slug = '';
  titulo = '';
  productosFiltrados: Producto[] = [];

  productos: Producto[] = [
    { id: 1, nombre: 'Catan', precio: 19990, categoria: 'estrategia', imagen: 'assets/img/catan.webp' },
    { id: 2, nombre: 'Ajedrez Profesional', precio: 4980, categoria: 'estrategia', imagen: 'assets/img/ajedrez.webp' },
    { id: 3, nombre: 'Risk', precio: 26990, categoria: 'estrategia', imagen: 'assets/img/risk.webp' },
    { id: 4, nombre: 'Jenga Party', precio: 11990, categoria: 'familiares', imagen: 'assets/img/jengaparty.webp' },
    { id: 5, nombre: 'Pictionary', precio: 19990, categoria: 'familiares', imagen: 'assets/img/pictionary.webp' },
    { id: 6, nombre: 'Dixit', precio: 38990, categoria: 'familiares', imagen: 'assets/img/dixit.webp' },
    { id: 7, nombre: 'Uno', precio: 8990, categoria: 'cartas', imagen: 'assets/img/uno.webp' },
    { id: 8, nombre: 'Exploding kittens', precio: 14990, categoria: 'cartas', imagen: 'assets/img/explodingkittens.webp' },
    { id: 9, nombre: 'Dobble', precio: 11990, categoria: 'cartas', imagen: 'assets/img/dobble.webp' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.slug = params.get('slug') ?? '';

    const titulos: any = {
      estrategia: 'Juegos de Estrategia',
      familiares: 'Juegos Familiares',
      cartas: 'Juegos de Cartas'
    };

    this.titulo = titulos[this.slug] || 'Categoría';

    this.productosFiltrados = this.productos.filter(
      p => p.categoria === this.slug
    );
  });
}

}
