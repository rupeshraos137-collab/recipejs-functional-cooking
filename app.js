const RecipeApp = (() => {
  // ---------------- DATA ----------------
  const recipes = [
    {
      id: 1,
      title: "Garlic Butter Pasta",
      time: 25,
      difficulty: "easy",
      description: "Quick creamy pasta with garlic butter.",
      ingredients: ["Pasta", "Butter", "Garlic", "Parmesan"],
      steps: [
        "Boil pasta",
        { step: "Prepare sauce", substeps: ["Melt butter", "Add garlic", "Mix cheese"] }
      ]
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      time: 70,
      difficulty: "medium",
      description: "Spiced Indian curry with tender chicken.",
      ingredients: ["Chicken", "Tomato", "Cream", "Spices"],
      steps: [
        "Marinate chicken",
        {
          step: "Cook curry",
          substeps: [
            "Sauté spices",
            { step: "Finish", substeps: ["Add cream", "Simmer"] }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Avocado Quinoa Salad",
      time: 20,
      difficulty: "easy",
      description: "Healthy quinoa salad.",
      ingredients: ["Quinoa", "Avocado", "Lime"],
      steps: ["Cook quinoa", "Chop veggies", "Mix"]
    }
  ];

  let currentFilter = "all";
  let currentSort = null;

  const container = document.querySelector("#recipe-container");

  // ---------------- PURE FUNCTIONS ----------------
  const filterRecipes = (list, filter) => {
    if (filter === "quick") return list.filter(r => r.time < 30);
    if (["easy", "medium", "hard"].includes(filter))
      return list.filter(r => r.difficulty === filter);
    return list;
  };

  const sortRecipes = (list, sort) => {
    const copy = [...list];
    if (sort === "name") return copy.sort((a,b) => a.title.localeCompare(b.title));
    if (sort === "time") return copy.sort((a,b) => a.time - b.time);
    return copy;
  };

  // ---------------- RECURSIVE STEPS ----------------
  const renderSteps = steps => `
    <ul>
      ${steps.map(s =>
        typeof s === "string"
          ? `<li>${s}</li>`
          : `<li>${s.step}${renderSteps(s.substeps)}</li>`
      ).join("")}
    </ul>
  `;

  // ---------------- RENDER ----------------
  const createCard = r => `
    <div class="recipe-card">
      <h3>${r.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${r.time} min</span>
        <span class="difficulty ${r.difficulty}">${r.difficulty}</span>
      </div>
      <p>${r.description}</p>

      <div class="recipe-actions">
        <button data-action="steps">Show Steps</button>
        <button data-action="ingredients">Show Ingredients</button>
      </div>

      <div class="recipe-details steps hidden">
        <strong>Steps</strong>
        ${renderSteps(r.steps)}
      </div>

      <div class="recipe-details ingredients hidden">
        <strong>Ingredients</strong>
        <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>
    </div>
  `;

  const render = list => {
    container.innerHTML = list.map(createCard).join("");
  };

  const updateDisplay = () => {
    render(sortRecipes(filterRecipes(recipes, currentFilter), currentSort));
  };

  // ---------------- EVENTS ----------------
  container.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const card = btn.closest(".recipe-card");
    card.querySelector(`.${btn.dataset.action}`).classList.toggle("hidden");
  });

  document.querySelectorAll(".filters button").forEach(b =>
    b.addEventListener("click", () => {
      currentFilter = b.dataset.filter;
      updateDisplay();
    })
  );

  document.querySelectorAll(".sorting button").forEach(b =>
    b.addEventListener("click", () => {
      currentSort = b.dataset.sort;
      updateDisplay();
    })
  );

  // ---------------- PUBLIC ----------------
  const init = () => updateDisplay();
  return { init };
})();

RecipeApp.init();