import express from "express";

// Maak een nieuwe express app
const server = express();

// Stel de public map in
server.use(express.static("public"));

// Stel de view engine in
server.set("view engine", "ejs");
server.set("views", "./views");

// Stel afhandeling van de formulieren in
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Maak een route voor de index
// dit plak je aan de basis url van de api, /categories (filtersysteem)
server.get("/", (request, response) => {
  // Dit is eigenlijk ook de "baseurl", maar MOET een "url" hebben
  let url = "https://api.vinimini.fdnd.nl/api/v1";
  let categoriesUrl = url + "/categories";

  fetchJson(categoriesUrl).then((data) => {
    response.render("index", data);
  });
});

// dit plak je aan de basis url van de api, /producten
server.get("/", async (request, response) => {
  let productenUrl = url + "/producten";

  fetchJson(productenUrl).then((data) => {
    response.render("index", data);
  });
});

// Stel het poortnummer in en start express
server.set("port", process.env.PORT || 4000);
server.listen(server.get("port"), function () {
  console.log(`Application started on http://localhost:${server.get("port")}`);
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}
