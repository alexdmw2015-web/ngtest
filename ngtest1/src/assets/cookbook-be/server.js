const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

function localImage(relativePath) {
  return `${IMAGE_BASE_URL}${relativePath}`;
}

const recipes = [
  {
    id: "1",
    title: "Pasta Carbonara",
    category: "Italian",
    image: localImage("/images/recipes/pasta-carbonara.jpg"),
    cookTime: 25,
    ingredients: ["Spaghetti", "Eggs", "Parmesan", "Pancetta", "Black pepper"],
    instructions:
      "Cook pasta. Fry pancetta. Mix eggs with parmesan. Combine everything off heat and season with pepper.",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Margherita Pizza",
    category: "Italian",
    image: localImage("/images/recipes/margherita-pizza.jpg"),
    cookTime: 30,
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil", "Olive oil"],
    instructions:
      "Spread sauce on dough, add mozzarella, bake until golden, then top with basil and olive oil.",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Chicken Curry",
    category: "Asian",
    image: localImage("/images/recipes/chicken-curry.jpg"),
    cookTime: 40,
    ingredients: ["Chicken", "Onion", "Garlic", "Curry paste", "Coconut milk"],
    instructions:
      "Saute onion and garlic, add chicken and curry paste, pour coconut milk, then simmer until tender.",
    isFavorite: false,
  },
  {
    id: "4",
    title: "Beef Stir Fry",
    category: "Asian",
    image: localImage("/images/recipes/beef-stir-fry.jpg"),
    cookTime: 20,
    ingredients: ["Beef strips", "Bell pepper", "Broccoli", "Soy sauce", "Ginger"],
    instructions:
      "Stir fry beef on high heat, add vegetables, season with soy sauce and ginger, cook until crisp-tender.",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Greek Salad",
    category: "Mediterranean",
    image: localImage("/images/recipes/greek-salad.jpg"),
    cookTime: 10,
    ingredients: ["Tomatoes", "Cucumber", "Red onion", "Feta", "Olives"],
    instructions:
      "Chop vegetables, add feta and olives, drizzle with olive oil and lemon juice, then toss lightly.",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Shakshuka",
    category: "Mediterranean",
    image: localImage("/images/recipes/shakshuka.jpg"),
    cookTime: 30,
    ingredients: ["Eggs", "Tomatoes", "Onion", "Garlic", "Paprika"],
    instructions:
      "Cook onion and garlic, add tomatoes and paprika, simmer sauce, crack eggs into pan, cook until set.",
    isFavorite: false,
  },
  {
    id: "7",
    title: "Tacos al Pastor",
    category: "Mexican",
    image: localImage("/images/recipes/tacos-al-pastor.jpg"),
    cookTime: 35,
    ingredients: ["Pork", "Pineapple", "Corn tortillas", "Onion", "Cilantro"],
    instructions:
      "Cook marinated pork, warm tortillas, assemble with pineapple, onion, and cilantro.",
    isFavorite: false,
  },
  {
    id: "8",
    title: "Guacamole",
    category: "Mexican",
    image: localImage("/images/recipes/guacamole.jpg"),
    cookTime: 10,
    ingredients: ["Avocados", "Lime", "Onion", "Tomato", "Cilantro"],
    instructions:
      "Mash avocados and mix with lime juice, diced onion, tomato, and cilantro. Season with salt.",
    isFavorite: false,
  },
  {
    id: "9",
    title: "Butter Chicken",
    category: "Indian",
    image: localImage("/images/recipes/butter-chicken.jpg"),
    cookTime: 45,
    ingredients: ["Chicken", "Tomato puree", "Butter", "Cream", "Garam masala"],
    instructions:
      "Cook chicken with spices, add tomato puree and butter, simmer, then finish with cream.",
    isFavorite: false,
  },
  {
    id: "10",
    title: "Chana Masala",
    category: "Indian",
    image: localImage("/images/recipes/chana-masala.jpg"),
    cookTime: 30,
    ingredients: ["Chickpeas", "Tomatoes", "Onion", "Garlic", "Spices"],
    instructions:
      "Cook onion and garlic, add tomatoes and spices, stir in chickpeas, and simmer until thick.",
    isFavorite: false,
  },
  {
    id: "11",
    title: "Sushi Bowl",
    category: "Japanese",
    image: localImage("/images/recipes/sushi-bowl.jpg"),
    cookTime: 25,
    ingredients: ["Rice", "Salmon", "Cucumber", "Avocado", "Soy sauce"],
    instructions:
      "Prepare rice, slice toppings, arrange in a bowl, and serve with soy sauce.",
    isFavorite: false,
  },
  {
    id: "12",
    title: "Ramen Noodle Soup",
    category: "Japanese",
    image: localImage("/images/recipes/ramen-noodle-soup.jpg"),
    cookTime: 35,
    ingredients: ["Ramen noodles", "Broth", "Mushrooms", "Egg", "Green onion"],
    instructions:
      "Simmer broth with mushrooms, cook noodles, combine in bowls, and top with egg and green onion.",
    isFavorite: false,
  },
  {
    id: "13",
    title: "French Omelette",
    category: "French",
    image: localImage("/images/recipes/french-omelette.jpg"),
    cookTime: 12,
    ingredients: ["Eggs", "Butter", "Salt", "Pepper", "Chives"],
    instructions:
      "Whisk eggs, cook gently in butter while stirring, fold into shape, and garnish with chives.",
    isFavorite: false,
  },
  {
    id: "14",
    title: "Ratatouille",
    category: "French",
    image: localImage("/images/recipes/ratatouille.jpg"),
    cookTime: 50,
    ingredients: ["Eggplant", "Zucchini", "Tomatoes", "Bell pepper", "Herbs"],
    instructions:
      "Layer sliced vegetables in a dish, season with herbs and olive oil, then bake until tender.",
    isFavorite: false,
  },
  {
    id: "15",
    title: "Cheeseburger",
    category: "American",
    image: localImage("/images/recipes/cheeseburger.jpg"),
    cookTime: 20,
    ingredients: ["Ground beef", "Burger bun", "Cheddar", "Lettuce", "Tomato"],
    instructions:
      "Cook beef patty, melt cheddar on top, assemble in bun with lettuce and tomato.",
    isFavorite: false,
  },
  {
    id: "16",
    title: "Pancakes",
    category: "American",
    image: localImage("/images/recipes/pancakes.jpg"),
    cookTime: 18,
    ingredients: ["Flour", "Milk", "Eggs", "Baking powder", "Butter"],
    instructions:
      "Mix batter, pour on hot pan, flip when bubbles form, and serve with butter and syrup.",
    isFavorite: false,
  },
  {
    id: "17",
    title: "Pad Thai",
    category: "Thai",
    image: localImage("/images/recipes/pad-thai.jpg"),
    cookTime: 30,
    ingredients: ["Rice noodles", "Shrimp", "Egg", "Bean sprouts", "Peanuts"],
    instructions:
      "Soak noodles, stir fry shrimp and egg, add noodles and sauce, finish with sprouts and peanuts.",
    isFavorite: false,
  },
  {
    id: "18",
    title: "Tom Yum Soup",
    category: "Thai",
    image: localImage("/images/recipes/tom-yum-soup.jpg"),
    cookTime: 25,
    ingredients: ["Shrimp", "Mushrooms", "Lemongrass", "Lime", "Chili"],
    instructions:
      "Simmer broth with aromatics, add mushrooms and shrimp, then balance with lime and chili.",
    isFavorite: false,
  },
  {
    id: "19",
    title: "Fish and Chips",
    category: "British",
    image: localImage("/images/recipes/fish-and-chips.jpg"),
    cookTime: 35,
    ingredients: ["White fish", "Potatoes", "Flour", "Baking soda", "Oil"],
    instructions:
      "Batter fish and fry until crisp, fry potatoes separately, then serve hot with lemon.",
    isFavorite: false,
  },
  {
    id: "20",
    title: "Shepherd's Pie",
    category: "British",
    image: localImage("/images/recipes/shepherds-pie.jpg"),
    cookTime: 55,
    ingredients: ["Ground lamb", "Potatoes", "Carrot", "Onion", "Peas"],
    instructions:
      "Cook lamb with vegetables, top with mashed potatoes, and bake until golden.",
    isFavorite: false,
  },
];

const recentlyViewedIds = [];
const RECENTLY_VIEWED_LIMIT = 10;

function toRecipeListItem(recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    category: recipe.category,
    image: recipe.image,
    cookTime: recipe.cookTime,
    isFavorite: recipe.isFavorite,
  };
}

function toRecentlyViewedItem(recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    category: recipe.category,
    image: recipe.image,
    cookTime: recipe.cookTime,
  };
}

app.get("/recipes", (req, res) => {
  res.json(recipes.map(toRecipeListItem));
});

app.get("/recipes/recently-viewed", (req, res) => {
  const items = recentlyViewedIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean)
    .map(toRecentlyViewedItem);

  res.json(items);
});

app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find((item) => item.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  return res.json({
    id: recipe.id,
    title: recipe.title,
    category: recipe.category,
    image: recipe.image,
    cookTime: recipe.cookTime,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  });
});

app.patch("/recipes/:id/favorite", (req, res) => {
  const recipe = recipes.find((item) => item.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const { isFavorite } = req.body;
  if (typeof isFavorite !== "boolean") {
    return res.status(400).json({ message: "isFavorite must be a boolean" });
  }

  recipe.isFavorite = isFavorite;
  return res.json(toRecipeListItem(recipe));
});

app.post("/recipes/:id/view", (req, res) => {
  const recipe = recipes.find((item) => item.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const existingIndex = recentlyViewedIds.indexOf(recipe.id);
  if (existingIndex !== -1) {
    recentlyViewedIds.splice(existingIndex, 1);
  }

  recentlyViewedIds.unshift(recipe.id);
  if (recentlyViewedIds.length > RECENTLY_VIEWED_LIMIT) {
    recentlyViewedIds.pop();
  }

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`CookBook backend is running on port ${PORT}`);
});
