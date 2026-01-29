import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html'
})
export class Result {
  score = 0;
  total = 0;
  scores: any[] = [];
  details: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    const scoreParam = this.route.snapshot.queryParamMap.get('score');
    const totalParam = this.route.snapshot.queryParamMap.get('total');

    this.score = Number(scoreParam ?? 0);
    this.total = Number(totalParam ?? 0);

    if (this.total === 0) {
      this.router.navigate(['/']);
      return;
    }

    const stored = localStorage.getItem('quizScores');
    const anciens = stored ? JSON.parse(stored) : [];

    const nouveau = {
      date: new Date().toLocaleString(),
      score: this.score,
      total: this.total
    };

    anciens.push(nouveau);
    localStorage.setItem('quizScores', JSON.stringify(anciens));
    this.scores = anciens;

    const detailsStored = localStorage.getItem('quizLastDetails');
    this.details = detailsStored ? JSON.parse(detailsStored) : [];
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
