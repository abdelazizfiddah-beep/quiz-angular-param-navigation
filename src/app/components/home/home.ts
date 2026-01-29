import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  // Liste des catégories reçues depuis l'API
  categories: { id: number; name: string }[] = [];

  // Catégorie choisie dans le formulaire
  selectedCategoryId: number | null = null;

  // Nombre de questions
  amount = 5;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Appel à l'API Open Trivia pour charger les catégories
    this.http
      .get<{ trivia_categories: { id: number; name: string }[] }>(
        'https://opentdb.com/api_category.php'
      )
      .subscribe({
        next: (res) => {
          this.categories = res.trivia_categories;
        },
        error: () => {
          this.categories = [];
        }
      });
  }

  // Envoie les paramètres dans l'URL et va vers /quiz
  startQuiz() {
    if (!this.selectedCategoryId || this.amount <= 0) {
      return;
    }

    this.router.navigate(['/quiz'], {
      queryParams: {
        category: this.selectedCategoryId,
        amount: this.amount
      }
    });
  }
}
