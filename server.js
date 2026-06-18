// Importeer het npm package Espress
import express from "express";

// import het npm package feed
import { parseFeed } from 'feedsmith'

// Importeer de Liquid package
import { Liquid } from "liquidjs";

import { JSDOM } from 'jsdom'

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

const scrapeAndUpdateTweakers = async function () {
  const tweakersActiveTopicsResponse = await fetch('https://gathering.tweakers.net/rss/list_activetopics')
  const tweakersActiveTopicsResponseXML = await tweakersActiveTopicsResponse.text()
  const { feed: tweakersActiveTopicsFeed } = parseFeed(tweakersActiveTopicsResponseXML)
  const tweakersLastPoster = tweakersActiveTopicsFeed.items[0].description.substring(13 + tweakersActiveTopicsFeed.items[0].description.indexOf('Last poster: '), tweakersActiveTopicsFeed.items[0].description.indexOf(' at '))
  const directusUserResponse = await fetch('https://fdnd-agency.directus.app/items/tweakers_users?' + new URLSearchParams({ 'filter[username]': tweakersLastPoster }))
  const directusUserResponseJSON = await directusUserResponse.json()
  const tweakersLastPosterProfileResponse = await fetch('https://tweakers.net/gallery/' + tweakersLastPoster)
  const tweakersLastPosterProfileResponseHTML = await tweakersLastPosterProfileResponse.text()
  const { document: tweakersLastPosterProfileResponseDOM } = (new JSDOM(tweakersLastPosterProfileResponseHTML)).window
  const tweakersLastPosterProfileLink = tweakersLastPosterProfileResponseDOM.querySelector('a[href^="https://gathering.tweakers.net/forum/find/poster/"]')
  const tweakersLastPosterPostCount = tweakersLastPosterProfileLink.textContent.replace(/\./g, '')
  if (directusUserResponseJSON.data.length == 1) {
    await fetch('https://fdnd-agency.directus.app/items/tweakers_users', {
      method: 'PATCH',
      body: JSON.stringify({
        number_of_posts: tweakersLastPosterPostCount
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    const tweakersLastPosterProfileRegistered = tweakersLastPosterProfileResponseDOM.querySelector('.registered').textContent
    const tweakersLastPosterProfileRegisteredDateParts = tweakersLastPosterProfileRegistered.substring(18, tweakersLastPosterProfileRegistered.indexOf(', laatste')).split(' ')
    const months = { januari: '01', februari: '02', maart: '03', april: '04', mei: '05', juni: '06', juli: '07', augustus: '08', september: '09', oktober: 10, november: 11, december: 12 }
    const tweakersLastPosterProfileRegisteredDate = tweakersLastPosterProfileRegisteredDateParts[2] + '-' + months[tweakersLastPosterProfileRegisteredDateParts[1]] + '-' + tweakersLastPosterProfileRegisteredDateParts[0].padStart(2, '0')
    await fetch('https://fdnd-agency.directus.app/items/tweakers_users', {
      method: 'POST',
      body: JSON.stringify({
        member_since: tweakersLastPosterProfileRegisteredDate,
        username: tweakersLastPoster,
        forum_id: tweakersLastPosterProfileLink.getAttribute('href').substring(13 + tweakersLastPosterProfileLink.getAttribute('href').indexOf('/find/poster/')),
        number_of_posts: tweakersLastPosterPostCount
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}

scrapeAndUpdateTweakers()

// Stel de map met Liquid templates in
// Deze bestanden kunnen niet rechtstreeks laden
app.set("views", "./views");

// // base url
// const baseURL = "https://gathering.tweakers.net/"
// // directus url
// const directusURL = 'https://fdnd-agency.directus.app/items/tweakers_'

// app.get('/tweakers/:categorie', async function (request, response) {

//   const tweakersResponse = await fetch('$baseURL/list_topics/' + request.params.categorie)
//   const tweakersResponseXML = await tweakersResponse.text()

//   const { format, feed } = parseFeed(tweakersResponseXML)
//   console.log(feed) // Om te debuggen

//   const items = []
//   for (const item of feed.items) {
//     items.push({
//       title: item.title,
//       link: item.link,
//       replies: Number(item.description.substring(9, item.description.indexOf('\n')))
//     })
//   }

//   items.sort(function(a, b) {
//    if (a.replies < b.replies) {
//     return 1;
//    } else if (a.replies > b.replies) {
//     return -1;
//    }
//    return 0;
//   })

//   // console.log(items)

//   response.render('index.liquid', {item: items[0]})
// })
// base url
const baseURL = "https://gathering.tweakers.net/rss/"
// directus url
const directusURL = 'https://fdnd-agency.directus.app/items/tweakers_users?'

app.get("/", async function (request, response) {

  const params = {
  'field': 'id,member_since,username,number_of_posts,forum_id',
  'sort': '-number_of_posts',
  'limit': '5'
  }

  // url fetch 
  const tweakersResponse = await fetch('https://fdnd-agency.directus.app/items/tweakers_users?' + new URLSearchParams(params))
  const tweakersResponseJSON = await tweakersResponse.json()

  response.render("index.liquid", {users: tweakersResponseJSON.data});
    const newData = []

    tweakersResponseJSON.data.forEach(function (user) {
    user.number_of_posts = Intl.NumberFormat("nl-NL").format(user.number_of_posts)
    newData.push(user)
  })

  const gebruikersResponse = await fetch(
    "https://fdnd-agency.directus.app/items/tweakers_users?sort=-number_of_posts&limit=5",
  );
  const gebruikersData = await gebruikersResponse.json();
  const categorieen = [7, 4, 127, 100, 32, 9, 41];

  const teksten = await Promise.all(
    categorieen.map(function (categorie) {
      return fetch(
        "https://gathering.tweakers.net/rss/list_topics/" + categorie,
      ).then(function (res) {
        return res.text();
      });
    }),
  );

  const items = [];
  const categorieStats = [];

  for (const xml of teksten) {
    const { feed } = parseFeed(xml);
    // console.log(feed.items[0]);

    let totaalReacties = 0;
    for (const item of feed.items) {
      const replies = Number(
        item.description.substring(9, item.description.indexOf("\n")),
      );
      items.push({ title: item.title, link: item.link, replies: replies });
      totaalReacties += replies;
    }

    categorieStats.push({
      naam: feed.title, // naam van de categorie
      aantalTopics: feed.items.length,
      totaalReacties: totaalReacties,
    });
  }

  // Sorteer aflopend op aantal reacties en pak de top 5 topics
  items.sort(function (a, b) {
    return b.replies - a.replies;
  });

  // Sorteer categorieën aflopend op totaal aantal reacties
  categorieStats.sort(function (a, b) {
    return b.totaalReacties - a.totaalReacties;
  });

  response.render("index.liquid", {
    items: items.slice(0, 5),
    users: tweakersResponseJSON.data
  });
});

// app.get("/categorie/:id", async function (request, response) {
//   const rssResponse = await fetch('https://gathering.tweakers.net/rss/list_topics/${request.params.id}')
//   const ResponseXml = await rssResponse.text()

//   const { format, feed } = parseFeed(responseXML)
//   response.render("categorie.liquid", { items: feed.items })
// })

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), function () {
  console.log(
    `http://localhost:${app.get("port")}`,
  );
});