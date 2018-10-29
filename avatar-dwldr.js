const request = require('request');
const fs = require('fs');
const env = require('dotenv').config();
const token = process.env.API_ACCESS_TOKEN;
const user = 'SrChip15';

const getRepoContributors = function(repoOwner, repoName, callback) {
  const options = {
    url:`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'access_token': token
    }
  };

  if (repoOwner && repoName) {
    // owner and repo validated
    request(options, function(err, response, body) {
      if (response.statusCode === 200) {
        console.log(`Connected to GitHub...`);
        callback(err, body);
      }
    });
  }
};

const getJSON = function(err, body) {
  if (err) throw err;
  const res = JSON.parse(body);
  for (let person in res) {
    console.log(res[person]['avatar_url']);
  }
  // console.log(res);
  // console.log(body);
};


console.log('Welcome to the GitHub Avatar Downloader!');
getRepoContributors('facebook', 'react', getJSON);

