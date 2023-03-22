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

// dit plak je aan de basis url van de api, /producten (Voor in de kalender)
server.get("/", async (request, response) => {
  let productenUrl = url + "/producten";

  fetchJson(productenUrl).then((data) => {
    response.render("index", data);
  });
});

server.get("/", (request, response) => {
  response.render("index");
});

server.post("/", (request, response) => {
  const url = "https://whois.fdnd.nl/api/v1";

  postJson(url, request.body).then((data) => {
    // ... zorgt ervoor dat de invoelvelden ingevuld blijven, zodat je het niet steeds opnieuw in hoeft te vullen bij een error
    let newComment = { ...request.body };

    if (data.success) {
      response.redirect("/?commentPosted=true");
      // TODO: squad meegeven, message meegeven
      // TODO: Toast meegeven aan de homepagina
    } else {
      const errormessage = `${data.message}: Heb je alles goed ingevuld?.`;
      const newdata = { error: errormessage, values: newComment };

      response.render("index", newdata);
    }
  });
});

// pagina's zonder inhoud van andere allergenen
server.get("/Ei", (request, response) => {
  response.render("Ei");
});

server.get("/Pinda", (request, response) => {
  response.render("Pinda");
});

server.get("/Amandel", (request, response) => {
  response.render("Amandel");
});

server.get("/Schelp", (request, response) => {
  response.render("Schelp");
});

server.get("/Soja", (request, response) => {
  response.render("Soja");
});

server.get("/Vis", (request, response) => {
  response.render("Vis");
});

server.get("/Hazelnoot", (request, response) => {
  response.render("Hazelnoot");
});

server.get("/Walnoot", (request, response) => {
  response.render("Walnoot");
});

server.get("/Cashewnoot", (request, response) => {
  response.render("Cashewnoot");
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
