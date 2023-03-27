import express from "express";

// Link naar de api van vini mini
const url = "https://api.vinimini.fdnd.nl/api/v1";
const data = await fetch(url)
  .then((response) => response.json())
  .catch((error) => error);

// Maak een nieuwe express server
const server = express();

// Stel in hoe we express gebruiken
server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.static("public"));

// Maak een route naar de index.ejs voor categorieën
server.get("/", (request, response) => {
  let categoriesUrl = url + "/categories";

  fetchJson(categoriesUrl).then((data) => {
    response.render("index", data);
  });
});

// Maak een route naar de ei.ejs
server.get("/ei", async (request, response) => {
  let productenUrl = url + "/producten";

  await fetchJson(productenUrl).then((data) => {
    response.render("ei", data);
  });
});

// Maak een route naar de pinda.ejs
server.get("/pinda", async (request, response) => {
  let productenUrl = url + "/producten";

  await fetchJson(productenUrl).then((data) => {
    response.render("pinda", data);
  });
});

// FORMULIER NOTITIE
// Stel de afhandeling van formulieren in
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Maak een route voor de index
server.get("/", (request, response) => {
  const baseUrl = "https://api.vinimini.fdnd.nl/api/v1/";
  const pepijnId = "notities?id=clemozv3c3eod0bunahh71sx7";
  const url = `${baseUrl}${pepijnId}`;

  fetchJson(url).then((data) => {
    response.render("index", data);
  });
});

// Stel het poortnummer in en start express
server.set("port", process.env.PORT || 4001);
server.listen(server.get("port"), function () {
  console.log(
    `serverlication started on http://localhost:${server.get("port")}`
  );
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}
