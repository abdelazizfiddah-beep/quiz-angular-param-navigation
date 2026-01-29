import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Quiz } from './components/quiz/quiz';
import { Result } from './components/result/result';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'quiz', component: Quiz },
  { path: 'result', component: Result }
];
