(function () {
  const form = document.getElementById("adminForm");
  const resetBtn = document.getElementById("resetBtn");
  const tbody = document.getElementById("productsTableBody");
  const formMsg = document.getElementById("formMsg");

  if (!form) return;

  let data = getAllChickens();

  function renderTable() {
    tbody.innerHTML = "";
    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(item.id)}</td>
        <td>${escapeHtml(item.name)}</td>
        <td>${escapeHtml(item.breed)}</td>
        <td>${escapeHtml(item.ageCategory)}</td>
        <td>${item.ageMonths}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${escapeHtml(item.availability)}</td>
        <td>${escapeHtml(item.image)}</td>
        <td>
          <div class="card-actions">
            <button class="btn secondary" type="button" data-act="edit" data-id="${item.id}">Edit</button>
            <button class="btn secondary" type="button" data-act="delete" data-id="${item.id}">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function setForm(item) {
    document.getElementById("productId").value = item.id || "";
    document.getElementById("name").value = item.name || "";
    document.getElementById("breed").value = item.breed || "";
    document.getElementById("ageCategory").value = item.ageCategory || "4-month-old chickens";
    document.getElementById("ageMonths").value = item.ageMonths || 4;
    document.getElementById("price").value = item.price || 0;
    document.getElementById("availability").value = item.availability || "in stock";
    document.getElementById("image").value = item.image || "images/chicken-4m-01.svg";
    document.getElementById("description").value = item.description || "";
    document.getElementById("details").value = item.details || "";
  }

  function resetForm() {
    setForm({
      id: "",
      name: "",
      breed: "",
      ageCategory: "4-month-old chickens",
      ageMonths: 4,
      price: 0,
      availability: "in stock",
      image: "images/chicken-4m-01.svg",
      description: "",
      details: "",
    });
    if (formMsg) formMsg.textContent = "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("productId").value.trim();
    const item = {
      id: id || uid(),
      name: document.getElementById("name").value.trim(),
      breed: document.getElementById("breed").value.trim(),
      ageCategory: document.getElementById("ageCategory").value,
      ageMonths: parseInt(document.getElementById("ageMonths").value, 10),
      price: parseFloat(document.getElementById("price").value),
      currency: "PHP",
      description: document.getElementById("description").value.trim(),
      availability: document.getElementById("availability").value,
      image: document.getElementById("image").value,
      details: document.getElementById("details").value.trim(),
    };
    if (!item.name || !item.breed || isNaN(item.ageMonths) || isNaN(item.price)) {
      if (formMsg) formMsg.textContent = "Please fill all required fields.";
      return;
    }
    const idx = data.findIndex((x) => x.id === item.id);
    if (idx >= 0) {
      data[idx] = item;
      if (formMsg) formMsg.textContent = "Product updated.";
    } else {
      data.push(item);
      if (formMsg) formMsg.textContent = "Product added.";
    }
    saveChickens(data);
    renderTable();
    resetForm();
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resetForm();
    });
  }

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    const act = btn.getAttribute("data-act");
    if (act === "edit") {
      const item = data.find((x) => x.id === id);
      if (item) {
        setForm(item);
        window.scrollTo({ top: form.offsetTop - 60, behavior: "smooth" });
        if (formMsg) formMsg.textContent = "Editing product.";
      }
    } else if (act === "delete") {
      if (!confirm("Delete this product?")) return;
      data = data.filter((x) => x.id !== id);
      saveChickens(data);
      renderTable();
      resetForm();
      if (formMsg) formMsg.textContent = "Product deleted.";
    }
  });

  resetForm();
  renderTable();
})();

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}