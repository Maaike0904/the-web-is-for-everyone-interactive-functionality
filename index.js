//import express en dotenv
import express from "express";

//maak een nieuwe express app
const server = express();

//public map gebruiken
server.use(express.static("public"));

//stel de views in
server.set("view engine", "ejs");
server.set("views", "./views");

// Stel afhandeling van formulieren in
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//hier komen de routes

server.get("/", (request, response) => {
  const baseUrl = "https://api.vinimini.fdnd.nl/api/v1/";
  const samId = "notities?id=clemozv3c3eod0bunahh71sx7";
  const url = `${baseUrl}${samId}`;

  fetchJson(url).then((data) => {
    response.render("index", data);
  });
});

// Dit is de data uit whois api // Met deze stuk code willen we de data roepen uit de whois api?
server.post("/", function (req, res, next) {
  const baseurl = "https://api.vinimini.fdnd.nl/api/v1/";
  const url = `${baseurl}`;
  req.body.afgerond = false;
  req.body.persoonId = "clemozv3c3eod0bunahh71sx7";
  req.body.datum = req.body.datum + ":00Z";
  req.body.herinnering = [req.body.herinnering + ":00Z"];
  console.log(req.body);

  //
  postJson(url + "/notities", req.body).then((data) => {
    console.log(JSON.stringify(data));
    let newNotitie = { ...req.body };

    if (data.success) {
      res.redirect("/");
      // TODO: squad meegeven, message meegeven
      // TODO: Toast meegeven aan de homepagina
    } else {
      const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`;
      const newdata = { error: errormessage, values: newData };

      res.render("index", newdata);
    }
  });
});

// Stel het poortnummer in en start express
server.set("port", process.env.PORT || 8000);
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

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
