import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Recipe } from '../../models/recipe';
import { RecipeApiService } from '../../services/recipe-api.service';

@Component({
  selector: 'app-recipe-detail-page',
  imports: [RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(RecipeApiService);
  readonly recipe = signal<Recipe | null>(null);
  readonly isFavorite = signal(false);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Рецепт не найден.');
      this.loading.set(false);
      return;
    }

    forkJoin({ recipe: this.api.getRecipe(id), recipes: this.api.loadRecipes() }).subscribe({
      next: ({ recipe, recipes }) => {
        this.recipe.set(recipe);
        this.isFavorite.set(Boolean(recipes.find((item) => item.id === id)?.isFavorite));
        this.loading.set(false);
        this.api.recordView(id).subscribe({
          next: () => this.api.loadRecentlyViewed().subscribe({ error: () => undefined }),
        });
      },
      error: () => {
        this.error.set('Не удалось загрузить рецепт. Проверьте подключение к backend.');
        this.loading.set(false);
      },
    });
  }

  toggleFavorite(): void {
    const recipe = this.recipe();
    if (!recipe) return;

    const nextFavorite = !this.isFavorite();
    this.api.setFavorite(recipe.id, nextFavorite).subscribe({
      next: () => this.isFavorite.set(nextFavorite),
      error: () => this.error.set('Не удалось обновить избранное. Попробуйте ещё раз.'),
    });
  }
}