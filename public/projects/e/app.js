const STORAGE_KEY = "earn-it-state-v1";

const defaultItemCatalog = [
  {
    id: "movie-night",
    name: "Movie Night",
    pointsRequired: 30,
    image: "assets/movie-night.svg"
  },
  {
    id: "boba-trip",
    name: "Boba Trip",
    pointsRequired: 45,
    image: "assets/boba-trip.svg"
  },
  {
    id: "game-hour",
    name: "Game Hour",
    pointsRequired: 60,
    image: "assets/game-hour.svg"
  },
  {
    id: "book-buy",
    name: "Book Buy",
    pointsRequired: 75,
    image: "assets/book-buy.svg"
  }
];

const state = loadState();

const pointsEarnedEl = document.getElementById("points-earned");
const pointsSpentEl = document.getElementById("points-spent");
const pointsRemainingEl = document.getElementById("points-remaining");
const form = document.getElementById("entry-form");
const itemForm = document.getElementById("item-form");
const entriesList = document.getElementById("entries-list");
const unlockGrid = document.getElementById("unlock-grid");
const purchasedGrid = document.getElementById("purchased-grid");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const activity = String(formData.get("activity") || "").trim();
  const points = Number(formData.get("points"));
  const date = toDateValue(new Date());

  if (!activity || !Number.isFinite(points) || points <= 0) {
    return;
  }

  state.entries.unshift({
    id: crypto.randomUUID(),
    activity,
    points,
    date
  });

  saveState();
  render();
  form.reset();
});

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(itemForm);
  const name = String(formData.get("item-name") || "").trim();
  const pointsRequired = Number(formData.get("item-points"));
  const imageInput = String(formData.get("item-image") || "").trim();

  if (!name || !Number.isFinite(pointsRequired) || pointsRequired <= 0) {
    return;
  }

  state.items.unshift({
    id: crypto.randomUUID(),
    name,
    pointsRequired,
    image: imageInput || "assets/movie-night.svg"
  });

  saveState();
  render();
  itemForm.reset();
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { entries: [], purchases: [], items: [...defaultItemCatalog] };
    }
    const parsed = JSON.parse(raw);
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
      purchases: Array.isArray(parsed.purchases) ? parsed.purchases : [],
      items: Array.isArray(parsed.items) && parsed.items.length > 0 ? parsed.items : [...defaultItemCatalog]
    };
  } catch {
    return { entries: [], purchases: [], items: [...defaultItemCatalog] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toDateValue(date) {
  return date.toISOString().slice(0, 10);
}

function calculateTotals() {
  const earned = state.entries.reduce((sum, entry) => sum + Number(entry.points || 0), 0);
  const spent = state.purchases.reduce((sum, purchase) => sum + Number(purchase.pointsUsed || 0), 0);
  return { earned, spent, remaining: earned - spent };
}

function purchaseItem(item) {
  const totals = calculateTotals();
  const alreadyPurchased = state.purchases.some((purchase) => purchase.itemId === item.id);
  if (alreadyPurchased || totals.remaining < item.pointsRequired) {
    return;
  }

  state.purchases.unshift({
    id: crypto.randomUUID(),
    itemId: item.id,
    name: item.name,
    image: item.image,
    pointsUsed: item.pointsRequired,
    purchasedOn: toDateValue(new Date())
  });

  saveState();
  render();
}

function removeEntry(entryId) {
  state.entries = state.entries.filter((entry) => entry.id !== entryId);
  saveState();
  render();
}

function removeItem(itemId) {
  state.items = state.items.filter((item) => item.id !== itemId);
  saveState();
  render();
}

function removePurchase(purchaseId) {
  state.purchases = state.purchases.filter((purchase) => purchase.id !== purchaseId);
  saveState();
  render();
}

function renderEntries() {
  entriesList.innerHTML = "";

  if (state.entries.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-note";
    empty.textContent = "No entries yet. Add your first activity.";
    entriesList.appendChild(empty);
    return;
  }

  for (const entry of state.entries) {
    const row = document.createElement("li");
    row.className = "entry-row";

    const name = document.createElement("div");
    name.className = "entry-name";
    name.textContent = entry.activity;

    const meta = document.createElement("div");
    meta.className = "entry-meta";
    meta.textContent = entry.date;

    const right = document.createElement("div");
    right.className = "entry-name entry-points";
    right.textContent = `+${entry.points} pts`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn entry-remove-btn";
    removeBtn.textContent = "x";
    removeBtn.title = "Delete entry";
    removeBtn.addEventListener("click", () => removeEntry(entry.id));

    row.appendChild(name);
    row.appendChild(meta);
    row.appendChild(right);
    row.appendChild(removeBtn);
    entriesList.appendChild(row);
  }
}

function renderUnlockItems(remainingPoints) {
  unlockGrid.innerHTML = "";
  const purchasedIds = new Set(state.purchases.map((purchase) => purchase.itemId));
  const available = state.items.filter((item) => !purchasedIds.has(item.id));

  if (available.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-note";
    empty.textContent = "All rewards purchased.";
    unlockGrid.appendChild(empty);
    return;
  }

  for (const item of available) {
    const card = document.createElement("article");
    card.className = "item-card";
    if (remainingPoints < item.pointsRequired) {
      card.classList.add("locked-card");
    }

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    const line = document.createElement("div");
    line.className = "reward-line";

    const name = document.createElement("h4");
    name.className = "reward-name";
    name.textContent = item.name;

    const points = document.createElement("p");
    points.className = "points-pill reward-points";
    points.textContent = `${item.pointsRequired}`;

    const button = document.createElement("button");
    button.textContent = "Buy";
    button.disabled = remainingPoints < item.pointsRequired;
    button.addEventListener("click", () => purchaseItem(item));

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn card-remove-btn";
    removeBtn.textContent = "x";
    removeBtn.title = "Delete wish list item";
    removeBtn.addEventListener("click", () => removeItem(item.id));

    card.appendChild(img);
    card.appendChild(removeBtn);
    line.appendChild(name);
    line.appendChild(points);
    line.appendChild(button);
    card.appendChild(line);
    unlockGrid.appendChild(card);
  }
}

function renderPurchasedItems() {
  purchasedGrid.innerHTML = "";

  if (state.purchases.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-note";
    empty.textContent = "No purchases yet.";
    purchasedGrid.appendChild(empty);
    return;
  }

  for (const purchase of state.purchases) {
    const card = document.createElement("article");
    card.className = "item-card";

    const img = document.createElement("img");
    img.src = purchase.image;
    img.alt = purchase.name;

    const title = document.createElement("h4");
    title.textContent = purchase.name;

    const points = document.createElement("p");
    points.className = "points-pill";
    points.textContent = `${purchase.pointsUsed} points used`;

    const date = document.createElement("p");
    date.className = "points-pill";
    date.textContent = `Purchased: ${purchase.purchasedOn}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn card-remove-btn";
    removeBtn.textContent = "x";
    removeBtn.title = "Delete purchased item";
    removeBtn.addEventListener("click", () => removePurchase(purchase.id));

    card.appendChild(img);
    card.appendChild(removeBtn);
    card.appendChild(title);
    card.appendChild(points);
    card.appendChild(date);
    purchasedGrid.appendChild(card);
  }
}

function render() {
  const totals = calculateTotals();
  pointsEarnedEl.textContent = String(totals.earned);
  pointsSpentEl.textContent = String(totals.spent);
  pointsRemainingEl.textContent = String(totals.remaining);
  renderEntries();
  renderUnlockItems(totals.remaining);
  renderPurchasedItems();
}

render();
