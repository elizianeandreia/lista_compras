var categoryInput = document.getElementById("categoryInput");
var categorySelect = document.getElementById("categorySelect");
var itemInput = document.getElementById("itemInput");
var addBtn = document.getElementById("addBtn");
var exportBtn = document.getElementById("exportBtn");
var categoriesContainer = document.getElementById("categoriesContainer");
var shoppingListElement = document.getElementById("shoppingList");
var shoppingList = {};
var lastModified = null;
function renderCategories() {
    categoriesContainer.innerHTML = "";
    Object.keys(shoppingList).forEach(function (category) {
        var catBtn = document.createElement("button");
        catBtn.textContent = category;
        catBtn.classList.add("category-btn");
        categoriesContainer.appendChild(catBtn);
    });
}
function updateLastModified() {
    lastModified = new Date();
    renderLastModified();
}
function renderLastModified() {
    var _a;
    var lastModifiedDiv = document.getElementById("lastModified");
    if (!lastModifiedDiv) {
        lastModifiedDiv = document.createElement("div");
        lastModifiedDiv.id = "lastModified";
        (_a = shoppingListElement.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(lastModifiedDiv, shoppingListElement);
    }
    if (lastModified) {
        lastModifiedDiv.textContent = "\u00DAltima modifica\u00E7\u00E3o: ".concat(lastModified.toLocaleString());
    }
    else {
        lastModifiedDiv.textContent = "";
    }
}
function renderList() {
    shoppingListElement.innerHTML = "";
    var _loop_1 = function (category) {
        var categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        var categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        var ul = document.createElement("ul");
        shoppingList[category].forEach(function (item, index) {
            var li = document.createElement("li");
            li.textContent = item;
            var removeBtn = document.createElement("button");
            removeBtn.textContent = "x";
            removeBtn.classList.add("remove-item");
            removeBtn.addEventListener("click", function () {
                shoppingList[category].splice(index, 1);
                if (shoppingList[category].length === 0) {
                    delete shoppingList[category];
                    updateCategorySelect();
                }
                updateLastModified();
                renderCategories();
                renderList();
            });
            li.appendChild(removeBtn);
            ul.appendChild(li);
        });
        categoryDiv.appendChild(ul);
        shoppingListElement.appendChild(categoryDiv);
    };
    for (var category in shoppingList) {
        _loop_1(category);
    }
}
function updateCategorySelect() {
    categorySelect.innerHTML = "";
    var categories = Object.keys(shoppingList);
    if (categories.length === 0) {
        categorySelect.style.display = "none";
        categoryInput.style.display = "inline-block";
    }
    else {
        categorySelect.style.display = "inline-block";
        categoryInput.style.display = "none";
        categories.forEach(function (cat) {
            var option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
        var newOption = document.createElement("option");
        newOption.value = "new";
        newOption.textContent = "+ Nova Categoria";
        categorySelect.appendChild(newOption);
    }
}
function addItem() {
    var _a;
    var category = "";
    var item = itemInput.value.trim();
    if (Object.keys(shoppingList).length === 0) {
        category = categoryInput.value.trim();
        if (!category) {
            alert("Digite uma categoria!");
            return;
        }
    }
    else {
        if (categorySelect.value === "new") {
            category = ((_a = prompt("Digite o nome da nova categoria:")) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            if (!category)
                return;
        }
        else {
            category = categorySelect.value;
        }
    }
    if (!item) {
        alert("Digite um item!");
        return;
    }
    if (!shoppingList[category]) {
        shoppingList[category] = [];
    }
    shoppingList[category].push(item);
    itemInput.value = "";
    updateCategorySelect();
    renderCategories();
    renderList();
    updateLastModified();
}
function exportCSV() {
    var csvContent = "Categoria,Item\n";
    var _loop_2 = function (category) {
        shoppingList[category].forEach(function (item) {
            csvContent += "\"".concat(category, "\",\"").concat(item, "\"\n");
        });
    };
    for (var category in shoppingList) {
        _loop_2(category);
    }
    var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "lista_de_compras.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
addBtn.addEventListener("click", addItem);
exportBtn.addEventListener("click", exportCSV);
var exportPdfBtn = document.getElementById("exportPdfBtn");
function exportPDF() {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Lista de Compras", 105, 15, { align: "center" });
    var y = 30;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    for (var category in shoppingList) {
        doc.setFont("helvetica", "bold");
        doc.text(category, 15, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        shoppingList[category].forEach(function (item) {
            doc.text("- ".concat(item), 20, y);
            y += 7;
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        });
        y += 5;
    }
    doc.save("lista_de_compras.pdf");
}
exportPdfBtn.addEventListener("click", exportPDF);
