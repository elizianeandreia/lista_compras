const categoryInput = document.getElementById("categoryInput") as HTMLInputElement;
const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement;
const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const exportBtn = document.getElementById("exportBtn") as HTMLButtonElement;
const categoriesContainer = document.getElementById("categoriesContainer") as HTMLDivElement;
const shoppingListElement = document.getElementById("shoppingList") as HTMLDivElement;

let shoppingList: Record<string, string[]> = {};

function renderCategories(): void {
  categoriesContainer.innerHTML = "";

  Object.keys(shoppingList).forEach((category) => {
    const catBtn = document.createElement("button");
    catBtn.textContent = category;
    catBtn.classList.add("category-btn");

    categoriesContainer.appendChild(catBtn);
  });
}

function renderList(): void {
  shoppingListElement.innerHTML = "";

  for (const category in shoppingList) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    const ul = document.createElement("ul");

    shoppingList[category].forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.classList.add("remove-item");

      removeBtn.addEventListener("click", () => {
        shoppingList[category].splice(index, 1);
        if (shoppingList[category].length === 0) {
          delete shoppingList[category];
          updateCategorySelect();
        }
        renderCategories();
        renderList();
      });

      li.appendChild(removeBtn);
      ul.appendChild(li);
    });

    categoryDiv.appendChild(ul);
    shoppingListElement.appendChild(categoryDiv);
  }
}