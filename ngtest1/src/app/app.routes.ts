import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { RecipeDetailPage } from './pages/recipe-detail/recipe-detail';

export const routes: Routes = [
	{ path: '', component: HomePage, title: 'CookBook | Рецепты' },
	{ path: 'recipes/:id', component: RecipeDetailPage, title: 'Рецепт | CookBook' },
	{ path: '**', redirectTo: '' },
];
