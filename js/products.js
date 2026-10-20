(function () {
  const grid = document.getElementById("productsGrid");
  const title = document.getElementById("productsTitle");
  const filterMeta = document.getElementById("filterMeta");
  const detailSection = document.getElementById("productDetail");
  const detailContent = document.getElementById("detailContent");
  const backBtn = document.getElementById("backToListBtn");

  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const id = params.get("id");

  let data = getAllChickens();

  if (id) {
    const item = data.find((x) => x.id === id);
    if (!item) {
      grid.innerHTML = '<div class="meta">Product not found.</div>';
      return;
    }
    if (title) title.textContent = "Product Details";
    if (filterMeta) filterMeta.textContent = "";
    grid.style.display = "none";
    if (detailSection) detailSection.hidden = false;
    if (detailContent) {
      detailContent.innerHTML = `
        <div class="detail-media">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" />
        </div>
        <div class="detail-body">
          <h3 class="card-title">${escapeHtml(item.name)}</h3>
          <div class="meta">${escapeHtml(item.breed)}</div>
          <div class="meta">${escapeHtml(item.ageCategory)} (${item.ageMonths} months)</div>
          <div class="price">PHP ${item.price.toFixed(2)}</div>
          <div class="avail ${item.availability === "in stock" ? "" : "oos"}">${escapeHtml(item.availability)}</div>
          <p class="meta">${escapeHtml(item.description)}</p>
          <ul class="detail-list">
            <li>
              <div class="detail-heading">Breed</div>
              <div class="meta">${escapeHtml(item.breed)}</div>
            </li>
            <li>
              <div class="detail-heading">Age</div>
              <div class="meta">${escapeHtml(item.ageCategory)} (${item.ageMonths} months). ${escapeHtml(item.details)}</div>
            </li>
          </ul>
        </div>
      `;
    }
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.history.back();
      });
    }
    return;
  }

  if (cat) {
    data = data.filter((x) => x.ageCategory === cat);
    if (title) title.textContent = `Product Listings – ${cat}`;
    if (filterMeta) filterMeta.textContent = `${data.length} item(s)`;
  } else {
    if (title) title.textContent = "Product Listings – All";
    if (filterMeta) filterMeta.textContent = `${data.length} item(s)`;
  }

  grid.innerHTML = "";
  if (data.length === 0) {
    grid.innerHTML = '<div class="meta">No products found for this category.</div>';
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-media">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(item.name)}</h3>
        <div class="meta">${escapeHtml(item.breed)} • ${escapeHtml(item.ageCategory)} (${item.ageMonths} mo)</div>
        <div class="price">PHP ${item.price.toFixed(2)}</div>
        <div class="avail ${item.availability === "in stock" ? "" : "oos"}">${escapeHtml(item.availability)}</div>
        <p class="meta">${escapeHtml(item.description)}</p>
        <div class="card-actions">
          <a class="btn" href="products.html?id=${item.id}">Product Details</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
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