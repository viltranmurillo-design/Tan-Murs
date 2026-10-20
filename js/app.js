function loadChickens() {
  try {
    const raw = localStorage.getItem("chickensData");
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

function seedChickens() {
  const defaults = [
    {
      id: "c4m-01",
      name: "Red Comet Pullet",
      breed: "Red Comet",
      ageCategory: "4-month-old chickens",
      ageMonths: 4,
      price: 120.0,
      currency: "PHP",
      description:
        "4-month-old pullet still growing and developing. Feathers mostly fully grown in. On grower feed (16-18% protein).",
      availability: "in stock",
      image: "images/chicken-4m-01.svg",
      details:
        "Still growing and developing; feathers are mostly fully grown in. Should be on grower feed (about 16-18% protein), not layer feed yet. Combs and wattles start to redden and enlarge as they near maturity. Roosters begin crowing and may start sparring; hens are usually not laying yet. Can live outdoors full-time if fully feathered.",
    },
    {
      id: "c4m-02",
      name: "Barred Rock Teen",
      breed: "Barred Plymouth Rock",
      ageCategory: "4-month-old chickens",
      ageMonths: 4,
      price: 125.0,
      currency: "PHP",
      description:
        "Healthy 4-month-old Barred Rock. Fully feathered and ready for grow-out in outdoor coop.",
      availability: "in stock",
      image: "images/chicken-4m-02.svg",
      details:
        "Still growing and developing; feathers are mostly fully grown in. Should be on grower feed (about 16-18% protein), not layer feed yet. Combs and wattles start to redden and enlarge as they near maturity. Roosters begin crowing and may start sparring; hens are usually not laying yet. Can live outdoors full-time if fully feathered.",
    },
    {
      id: "c5m-01",
      name: "Rhode Island Red Near-Lay",
      breed: "Rhode Island Red",
      ageCategory: "5-month-old chickens",
      ageMonths: 5,
      price: 180.0,
      currency: "PHP",
      description:
        "Nearly mature hen nearing first lay. Switched to layer considerations; nesting boxes recommended.",
      availability: "in stock",
      image: "images/chicken-4m-01.svg",
      details:
        "Many hens begin laying their first small eggs (some breeds start as early as 18 weeks, others wait until 6+ months). Switch to layer feed (16% protein with added calcium) around the first egg or at about 18-20 weeks. Offer oyster shell separately. Add nesting boxes now so hens learn where to lay. Pecking order settling; watch for bullying. Roosters clearly identifiable by larger combs, long saddle and hackle feathers, and spurs starting to develop.",
    },
    {
      id: "c5m-02",
      name: "Leghorn Near-Mature",
      breed: "White Leghorn",
      ageCategory: "5-month-old chickens",
      ageMonths: 5,
      price: 175.0,
      currency: "PHP",
      description: "5-month-old Leghorn approaching maturity. Good layer potential.",
      availability: "in stock",
      image: "images/chicken-4m-02.svg",
      details:
        "Many hens begin laying their first small eggs (some breeds start as early as 18 weeks, others wait until 6+ months). Switch to layer feed (16% protein with added calcium) around the first egg or at about 18-20 weeks. Offer oyster shell separately. Add nesting boxes now so hens learn where to lay. Pecking order settling; watch for bullying. Roosters clearly identifiable by larger combs, long saddle and hackle feathers, and spurs starting to develop.",
    },
    {
      id: "c6m-01",
      name: "ISA Brown Laying Hen",
      breed: "ISA Brown",
      ageCategory: "6-month-old chickens and older",
      ageMonths: 6,
      price: 250.0,
      currency: "PHP",
      description:
        "Fully mature laying hen, productive. ~4-6 eggs per week. Good care can extend laying life.",
      availability: "in stock",
      image: "images/chicken-4m-01.svg",
      details:
        "Fully mature and in regular laying (most hens lay an egg about every 24-26 hours, around 4-6 eggs per week for productive breeds). Eggs reach full size by around 7-8 months. Need layer feed, grit, fresh water, and calcium supplements daily. Roosters fully mature, fertile, and protective of flock. Peak laying lasts roughly 1-2 years; production gradually declines after that; annual molt typically in fall pauses laying. With good care, hens can live 5-8+ years.",
    },
    {
      id: "c6m-02",
      name: "Barred Rock Mature Hen",
      breed: "Barred Plymouth Rock",
      ageCategory: "6-month-old chickens and older",
      ageMonths: 7,
      price: 230.0,
      currency: "PHP",
      description: "Mature Barred Rock hen in regular lay. Hardy and reliable layer.",
      availability: "in stock",
      image: "images/chicken-4m-02.svg",
      details:
        "Fully mature and in regular laying (most hens lay an egg about every 24-26 hours, around 4-6 eggs per week for productive breeds). Eggs reach full size by around 7-8 months. Need layer feed, grit, fresh water, and calcium supplements daily. Roosters fully mature, fertile, and protective of flock. Peak laying lasts roughly 1-2 years; production gradually declines after that; annual molt typically in fall pauses laying. With good care, hens can live 5-8+ years.",
    },
  ];
  localStorage.setItem("chickensData", JSON.stringify(defaults));
  return defaults;
}

function getAllChickens() {
  return loadChickens() || seedChickens();
}

function saveChickens(list) {
  localStorage.setItem("chickensData", JSON.stringify(list));
}

function uid() {
  return "c" + Math.random().toString(36).slice(2, 8);
}

function initNav() {
  const btn = document.getElementById("navToggle");
  const list = document.getElementById("navList");
  if (btn && list) {
    btn.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }
}

initNav();