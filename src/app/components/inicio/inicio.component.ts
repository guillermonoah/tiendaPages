import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/guest.service';
import { GLOBAL } from '../../services/global';
import { ClienteService } from '../../services/cliente.service';

declare var tns: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'] // Corregido "styleUrl" a "styleUrls"
})
export class InicioComponent implements OnInit {
  
  public descuento_activo: any = undefined;
  public url: any;
  public new_productos: Array<any> = [];
  public mas_vendidos: Array<any> = [];
  public categorias: Array<any> = [];

  private categoriasMap: { [key: string]: string } = {
    'Smartphones': 'assets/img/ecommerce/home/categories/04.jpg',
    'Headphones': 'assets/img/ecommerce/home/categories/06.jpg',
    'Oficina': 'assets/img/ecommerce/home/categories/07.jpg',
    'Moda': 'assets/img/ecommerce/home/categories/08.jpg',
    'Alimentos': 'assets/img/ecommerce/home/categories/09.jpg',
    'Hogar': 'assets/img/ecommerce/home/categories/03.jpg',
    'Calzado mujer': 'assets/img/ecommerce/home/categories/02.jpg',
    'Calzado hombre': 'assets/img/ecommerce/home/categories/01.jpg',
    'Ropa mujer': 'assets/img/ecommerce/home/categories/01.jpg',
    'Ropa hombre': 'assets/img/ecommerce/home/categories/01.jpg'
  };

  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService
  ) {
    this.url = GLOBAL.url;
    this.cargarCategorias();
  }

  ngOnInit(): void {
    this.cargarDescuentoActivo();
    this.cargarProductosNuevos();
    this.cargarProductosMasVendidos();
    this.iniciarCarruseles();
  }

  private cargarCategorias(): void {
    this._clienteService.obtener_config_publico().subscribe(
      response => {
        response.data.categorias.forEach((element: { titulo: string; }) => {
          if (this.categoriasMap[element.titulo]) {
            this.categorias.push({
              titulo: element.titulo,
              portada: this.categoriasMap[element.titulo]
            });
          }
        });
      },
      error => {
        console.error('Error al cargar categorías', error);
      }
    );
  }

  private cargarDescuentoActivo(): void {
    this._guestService.obtener_descuento_activo().subscribe(
      response => {
        this.descuento_activo = response.data ? response.data[0] : undefined;
      },
      error => {
        console.error('Error al cargar descuento activo', error);
      }
    );
  }

  private cargarProductosNuevos(): void {
    this._guestService.listar_producto_nuevos_publico().subscribe(
      response => {
        this.new_productos = response.data;
      },
      error => {
        console.error('Error al cargar productos nuevos', error);
      }
    );
  }

  private cargarProductosMasVendidos(): void {
    this._guestService.listar_producto_masvendidos_publico().subscribe(
      response => {
        this.mas_vendidos = response.data;
      },
      error => {
        console.error('Error al cargar productos más vendidos', error);
      }
    );
  }

  private iniciarCarruseles(): void {
    setTimeout(() => {
      this.iniciarCarrusel('.cs-carousel-inner', '#pager');
      this.iniciarCarrusel('.cs-carousel-inner-two', null, {
        0: { gutter: 20 },
        400: { items: 2, gutter: 20 },
        520: { gutter: 30 },
        768: { items: 3, gutter: 30 }
      });
      this.iniciarCarrusel('.cs-carousel-inner-three', null, {
        0: { items: 1, gutter: 20 },
        420: { items: 2, gutter: 20 },
        600: { items: 3, gutter: 20 },
        700: { items: 3, gutter: 30 },
        900: { items: 4, gutter: 30 },
        1200: { items: 5, gutter: 30 },
        1400: { items: 6, gutter: 30 }
      });
      this.iniciarCarrusel('.cs-carousel-inner-four', '#custom-controls-trending', {
        0: { items: 1, gutter: 20 },
        480: { items: 2, gutter: 24 },
        700: { items: 3, gutter: 24 },
        1100: { items: 4, gutter: 30 }
      });
      this.iniciarCarrusel('.cs-carousel-inner-five', null, {
        0: { items: 1 },
        380: { items: 2 },
        550: { items: 3 },
        750: { items: 4 },
        1000: { items: 5 },
        1250: { items: 6 }
      });
      this.iniciarCarrusel('.cs-carousel-inner-six', null, {
        0: { items: 2 },
        500: { items: 3 },
        1200: { items: 3 }
      });
    }, 500);
  }

  private iniciarCarrusel(container: string, navContainer: string | null, responsive?: any): void {
    tns({
      container: container,
      controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
      navContainer: navContainer,
      responsive: responsive || {
        0: { controls: false },
        991: { controls: true }
      }
    });
  }
}
