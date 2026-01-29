import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

@Component({
  standalone: true,
  selector: 'app-quiz',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.html'
})
export class Quiz implements OnInit {
  questions: any[] = [];
  formulaire!: FormGroup;
  corrections: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    const categoryParam = this.route.snapshot.queryParamMap.get('category');
    const amountParam = this.route.snapshot.queryParamMap.get('amount');

    const category = Number(categoryParam);
    const amount = Number(amountParam);

    if (!category || !amount) {
      this.router.navigate(['/']);
      return;
    }

    this.quizService.getQuestions(category, amount).subscribe({
      next: (questions: any[]) => {
        if (!questions || questions.length === 0) {
          this.router.navigate(['/']);
          return;
        }

        this.questions = questions;
        console.log('Questions reçues', this.questions);
        this.buildForm(questions.length);
      },
      error: (err: any) => {
        console.error('Erreur API quiz', err);
      }
    });
  }

  buildForm(nbQuestions: number) {
    const group: { [key: string]: any } = {};
    for (let i = 0; i < nbQuestions; i++) {
      group['q' + i] = [null];
    }
    this.formulaire = this.fb.group(group);
  }

  getAnswers(question: any): string[] {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  }

  submitQuiz() {
    if (!this.formulaire || this.formulaire.invalid) {
      return;
    }

    const questions = this.questions;
    let score = 0;
    const corrections: any[] = [];

    questions.forEach((q, index) => {
      const userAnswer = this.formulaire.get('q' + index)?.value;
      const isCorrect = userAnswer === q.correct_answer;

      if (isCorrect) {
        score++;
      }

      corrections.push({
        question: q.question,
        userAnswer: userAnswer,
        correctAnswer: q.correct_answer,
        isCorrect: isCorrect
      });
    });

    const total = questions.length;

    this.corrections = corrections;

    // on enregistre les détails de la dernière partie
    localStorage.setItem('quizLastDetails', JSON.stringify(corrections));

    this.router.navigate(['/result'], {
      queryParams: { score, total }
    });
  }
}
