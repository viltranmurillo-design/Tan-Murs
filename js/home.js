(function () {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  const data = getAllChickens();
  const featured = data.slice(0, 4);

  featured.forEach((item) => {
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
          <a class="btn" href="products.html?id=${item.id}">View Details</a>
          <a class="btn secondary" href="products.html?cat=${encodeURIComponent(item.ageCategory)}">View Category</a>
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