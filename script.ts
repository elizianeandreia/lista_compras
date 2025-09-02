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