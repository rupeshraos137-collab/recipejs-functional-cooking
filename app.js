// --------------------
// Recipe Data (IMMUTABLE)
// --------------------
const recipes = [
  { id: 1, title: "Garlic Butter Pasta", time: 25, difficulty: "easy", description: "Quick creamy pasta with garlic butter.", category: "pasta" },
  { id: 2, title: "Chicken Tikka Masala", time: 70, difficulty: "medium", description: "Spiced Indian curry with tender chicken.", category: "curry" },
  { id: 3, title: "Avocado Quinoa Salad", time: 20, difficulty: "easy", description: "Healthy salad with quinoa and avocado.", category: "salad" },
  { id: 4, title: "Beef Bourguignon", time: 120, difficulty: "hard", description: "French stew slow-cooked in red wine.", category: "stew" },
  { id: 5, title: "Spicy Ramen Bowl", time: 35, difficulty: "medium", description: "Ramen noodles in spicy broth.", category: "noodles" },
  { id: 6, title: "Margherita Pizza", time: 90, difficulty: "hard", description: "Classic pizza with mozzarella & basil.", category: "pizza" },
  { id: 7, title: "Vegetable Stir Fry", time: 30, difficulty: "easy", description: "Colorful veggies in soy-sesame sauce.", category: "asian" },
  { id: 8, title: "Lamb Rogan Josh", time: 80, difficulty: "hard", description: "Rich Kashmiri lamb curry.", category: "curry" }
];

// --------------------
// State
// --------------------
let currentFilter = "all";
let currentSort = null;

const recipeContainer = document.querySelector("#recipe-container");

// --------------------
// Pure Functions
// --------------------
const filterRecipes = (list, filter) => {
  if (filter === "quick") return list.filter(r => r.time < 30);
  if (["easy", "medium", "hard"].includes(filter))
    return list.filter(r => r.difficulty === filter);
  return list;
};

const sortRecipes = (list, sortType) => {
  const copy = [...list];
  if (sortType === "name") return copy.sort((a, b) => a.title.localeCompare(b.title));
  if (sortType === "time") return copy.sort((a, b) => a.time - b.time);
  return copy;
};

const createRecipeCard = recipe => `
  <div class="recipe-card" data-id="${recipe.id}">
    <h3>${recipe.title}</h3>
    <div class="recipe-meta">
      <span>⏱️ ${recipe.time} min</span>
      <span class="difficulty ${recipe.difficulty}">
        ${recipe.difficulty}
      </span>
    </div>
    <p>${recipe.description}</p>
  </div>
`;

const renderRecipes = list => {
  recipeContainer.innerHTML = list.map(createRecipeCard).join("");
};

// --------------------
// Central Update
// --------------------
const updateDisplay = () => {
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
};

// --------------------
// Events
// --------------------
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    updateDisplay();
  });
});

document.querySelectorAll(".sorting button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentSort = btn.dataset.sort;
    updateDisplay();
  });
});

// --------------------
// Init
// --------------------
updateDisplay();