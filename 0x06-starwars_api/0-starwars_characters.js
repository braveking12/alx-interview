#!/usr/bin/env node

const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

request(apiUrl, { json: true }, (err, res, body) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  if (res.statusCode !== 200) {
    console.error(`Failed to get movie data: ${res.statusCode}`);
    process.exit(1);
  }

  const characterUrls = body.characters;

  characterUrls.forEach((characterUrl) => {
    request(characterUrl, { json: true }, (err, res, body) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      if (res.statusCode !== 200) {
        console.error(`Failed to get character data: ${res.statusCode}`);
        process.exit(1);
      }

      console.log(body.name);
    });
  });
});

