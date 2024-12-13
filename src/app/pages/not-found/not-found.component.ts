import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para usar diretivas como *ngFor
import { MatCardModule } from '@angular/material/card'; // Módulo do Material Design para Cards
import { MatButtonModule } from '@angular/material/button'; // Módulo para Botões
import { MatIconModule } from '@angular/material/icon'; // Importando MatIconModule

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule], // Importando o MatIconModule
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  aliens: number[] = []; // Array para gerar os alienígenas dinamicamente, você pode personalizar

  constructor(private router: Router) {
    this.generateAliens();
  }

  /**
   * Redireciona o usuário para a página inicial
   */
  goBack(): void {
    this.router.navigate(['/']); // Substitua '/' pela rota da sua página inicial
  }

  /**
   * Gera um array para os alienígenas
   */
  private generateAliens(): void {
    this.aliens = Array.from({ length: 5 }, (_, i) => i); // Gera 5 alienígenas para ficarem na página
  }
}
