import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeSummary } from '../../models/recipe';
import { RecipeApiService } from '../../services/recipe-api.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage implements OnInit {
  readonly api = inject(RecipeApiService);
  readonly query = signal('');
  readonly selectedCategory = signal('');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly recipes = this.api.recipes;
  readonly favorites = computed(() => this.recipes().filter((recipe) => recipe.isFavorite));
  readonly categories = computed(() =>
    [...new Set(this.recipes().map((recipe) => recipe.category))].sort((a, b) => a.localeCompare(b, 'ru')),
  );
  readonly filteredRecipes = computed(() => {
    const query = this.query().trim().toLocaleLowerCase('ru');
    return this.recipes().filter((recipe) => {
      const matchesTitle = recipe.title.toLocaleLowerCase('ru').includes(query);
      const matchesCategory = !this.selectedCategory() || recipe.category === this.selectedCategory();
      return matchesTitle && matchesCategory;
    });
  });
  readonly featuredRecipe = computed(() => this.filteredRecipes()[0] ?? this.recipes()[0] ?? null);

  ngOnInit(): void {
    this.api.loadRecipes().subscribe({
      next: () => this.loading.set(false),
      error: () => {
        this.error.set('Не удалось загрузить рецепты. Проверьте, запущен ли backend на localhost:3001.');
        this.loading.set(false);
      },
    });
    this.api.loadRecentlyViewed().subscribe({ error: () => this.api.recentlyViewed.set([]) });
  }

  toggleFavorite(event: Event, recipe: RecipeSummary): void {
    event.preventDefault();
    event.stopPropagation();
    this.api.setFavorite(recipe.id, !recipe.isFavorite).subscribe({
      error: () => this.error.set('Не удалось обновить избранное. Попробуйте ещё раз.'),
    });
  }
}