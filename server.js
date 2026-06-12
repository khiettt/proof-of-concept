// Importeer het npm package Espress
import express from "express";

// import het npm package feed
import { parseFeed } from 'feedsmith'

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

// url totaaltopics
const totalTopics = "https://gathering.tweakers.net/"

// url 
const activeTopics = "https://gathering.tweakers.net/rss/list_activetopics"

app.get("/", async function (request, response) {

})

// app.get("/", async function (request, response) {

//     // url fetch 
//     const tweakersResponse = await fetch('https://gathering.tweakers.net/rss')
//     const tweakersResponseXml = await tweakersResponse.text()

//     const { format, feed } = parseFeed(tweakersResponseXml)

//     const items = []
//   for (const item of feed.items) {
//     items.push({
//       title: 4,
//       link: item.link,
//       replies: Number(item.description.substring(9, item.description.indexOf('\n')))
//     })
//   }
    
//     console.log(feed)

//     // niet vergeten geen JSON gebruiken maar XML 
//     response.render("index.liquid", {items: feed.items});
// });

app.get("/categorie/:id", async function (request, response) {
    const rssResponse = await fetch('https://gathering.tweakers.net/rss/list_topics/${request.params.id}')
    const ResponseXml = await rssResponse.text()
    
    const { format, feed } = parseFeed(responseXML)
    response.render("categorie.liquid", {items: feed.items})
})

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), function () {
  console.log(
    `http://localhost:${app.get("port")}`,
  );
});