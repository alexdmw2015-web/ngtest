export interface RecipeSummary {
  id: string;
  title: string;
  category: string;
  image: string;
  cookTime: number;
  isFavorite?: boolean;
}

export interface Recipe extends RecipeSummary {
  ingredients: string[];
  instructions: string;
}