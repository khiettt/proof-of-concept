// Importeer het npm package Espress
import express from "express";

// Importeer de Liquid package
import { Liquid } from "liquidjs";

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met de data uit Formulier iets prettiger
app.use(express.urlencoded({ extended: true }));

// Gebruik de map 'public' voor statische bestanden 
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Deze bestanden kunnen niet rechtstreeks laden
app.set("views", "./views");

app.get("/", async function (request, response) {
    // hier moet ik de url nog fethen en en parameters meegeven
    // niet vergeten geen JSON gebruiken maar XML 
    const tweakersXML = await tweakersXml.xml();
    response.render("index.liquid");
});

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), function () {
  console.log(
    `http://localhost:${app.get("port")}`,
  );
});