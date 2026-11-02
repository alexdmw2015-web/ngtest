import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Recipe, RecipeSummary } from '../models/recipe';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  private readonly baseUrl = isPlatformBrowser(inject(PLATFORM_ID)) ? '/api' : 'http://localhost:3001';
  readonly recipes = signal<RecipeSummary[]>([]);
  readonly recentlyViewed = signal<RecipeSummary[]>([]);

  constructor(private readonly http: HttpClient) {}

  loadRecipes(): Observable<RecipeSummary[]> {
    return this.http.get<RecipeSummary[]>(`${this.baseUrl}/recipes`).pipe(
      map((recipes) => recipes.map((recipe) => this.normalizeImage(recipe))),
      tap((recipes) => this.recipes.set(recipes)),
    );
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`).pipe(
      map((recipe) => this.normalizeImage(recipe)),
    );
  }

  loadRecentlyViewed(): Observable<RecipeSummary[]> {
    return this.http.get<RecipeSummary[]>(`${this.baseUrl}/recipes/recently-viewed`).pipe(
      map((recipes) => recipes.map((recipe) => this.normalizeImage(recipe))),
      tap((recipes) => this.recentlyViewed.set(recipes)),
    );
  }

  setFavorite(id: string, isFavorite: boolean): Observable<RecipeSummary> {
    return this.http
      .patch<RecipeSummary>(`${this.baseUrl}/recipes/${id}/favorite`, { isFavorite })
      .pipe(
        map((recipe) => this.normalizeImage(recipe)),
        tap((updatedRecipe) => {
          this.recipes.update((recipes) =>
            recipes.map((recipe) => recipe.id === id ? updatedRecipe : recipe),
          );
        }),
      );
  }

  recordView(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/recipes/${id}/view`, null);
  }

  private normalizeImage<T extends RecipeSummary>(recipe: T): T {
    const backendUrl = 'http://localhost:3001';
    return recipe.image.startsWith(backendUrl)
      ? { ...recipe, image: recipe.image.slice(backendUrl.length) }
      : recipe;
  }
}