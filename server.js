// OUD

export default index;

import express from "express";

// basis url voor de api
const url = "https://api.vinimini.fdnd.nl/api/v1";

// Maak een nieuwe express app
const app = express();

// Stel in hoe we express gebruiken
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Maak een route voor de index
// dit plak je aan de basis url van de api, /categories
app.get("/", (request, response) => {
  let categoriesUrl = url + "/categories";

  fetchJson(categoriesUrl).then((data) => {
    response.render("index", data);
  });
});

// dit plak je aan de basis url van de api, /producten
app.get("/", async (request, response) => {
  let productenUrl = url + "/producten";

  fetchJson(productenUrl).then((data) => {
    response.render("index", data);
  });
});

// Stel het poortnummer in en start express
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
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

// JUSTUS
// import express from "express";
// import indexRoute from "./routes/index.js";
// import memberRoute from "./routes/member.js";

// // Maak een nieuwe express app
// const server = express();

// // Stel het poortnummer in
// server.set("port", process.env.PORT || 8000);

// // Stel de view engine in
// server.set("view engine", "ejs");
// server.set("views", "./views");

// // Stel de public map in
// server.use(express.static("public"));

// // Stel afhandeling van formulieren in
// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

// // Stel de routes in
// server.use("/", indexRoute);
// server.use("/member", memberRoute);

// // Start met luisteren
// server.listen(server.get("port"), () => {
//   console.log(`Application started on http://localhost:${server.get("port")}`);
// });
