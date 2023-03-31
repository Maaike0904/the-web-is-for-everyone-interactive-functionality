//import express (heb dot env niet gedaan, werd te ingewikkeld)
import express from "express";

//maak een nieuwe express server
const server = express();

//public map gebruiken
server.use(express.static("public"));

//stel de views in
server.set("view engine", "ejs");
server.set("views", "./views");

// Stel afhandeling van formulieren in
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//hier komen de routes (Hulp van krijn om zo beide endpoints te kunnen gebruiken)
server.get("/", (request, response) => {
  const baseUrl = "https://api.vinimini.fdnd.nl/api/v1";
  const samId = "/notities?id=clemozv3c3eod0bunahh71sx7";
  const notitiesUrl = `${baseUrl}${samId}`;
  fetchJson(notitiesUrl).then((notitiesData) => {
    let categoriesUrl = baseUrl + "/categories";
    fetchJson(categoriesUrl).then((categoriesData) => {
      response.render("index", {
        categories: categoriesData.categories,
        notities: notitiesData.notities,
      });
    });
  });
});

// Dit is de data uit de notitie api // Met dit stuk code willen we de data roepen uit de notitie api
server.post("/", function (req, res, next) {
  const baseurl = "https://api.vinimini.fdnd.nl/api/v1/";
  const url = `${baseurl}`;
  req.body.afgerond = false;
  req.body.persoonId = "clemozv3c3eod0bunahh71sx7";
  req.body.datum = req.body.datum + ":00Z";
  req.body.herinnering = [req.body.herinnering + ":00Z"];
  console.log(req.body);

  //Nieuwe notite kunnen maken
  postJson(url + "/notities", req.body).then((data) => {
    console.log(JSON.stringify(data));
    let newNotitie = { ...req.body };

    if (data.success) {
      res.redirect("/");
      // /(shlash) Verwijst naar de homepage
    } else {
      const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`;
      const newdata = { error: errormessage, values: newData };

      res.render("index", newdata);
    }
  });
});

// Stel het poortnummer in en start express / (Goed opletten dat alles van app veranderd word naar server)
server.set("port", process.env.PORT || 8000);
server.listen(server.get("port"), function () {
  console.log(`Application started on http://localhost:${server.get("port")}`);
});

// Hiermee kun je uitleg geven over de Waarde zodat als je er met je muis
// over gaat, je dit krijgt.
/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}

// route naar pinda.ejs voor de producten
server.get("/Pinda", async (request, response) => {
  let productenUrl = url + "/producten";

  await fetchJson(productenUrl).then((data) => {
    response.render("Pinda", data);
  });
});

// pagina's andere allergenen
server.get("/Amandel", (request, response) => {
  response.render("Amandel");
});

server.get("/Schelp", (request, response) => {
  response.render("Schelp");
});

server.get("/Ei", (request, response) => {
  response.render("Ei");
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

export async function postJson(url, body) {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => error);
}

// Definities:
// - const is een constante Waarde
// - server.set :
// - server.use :
// - server.get :
// - => is een functie
// - request : resourceverzoek (verzoek van een bron)
// - response : antwoord op een request(verzoek)
// - response.render :
// - then : dan..
// - catch : Een functie die wordt aangeroepen wanneer de belofte wordt afgewezen.Word ook gebruikt met een promise
// - await :
