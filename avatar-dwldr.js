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
  } else {
    // user arguments validation failed
    throw new TypeError('invalid arguments');
  }
};

const downloadImageByUrl = function(url, filePath) {
  // dir check/creation
  if (fs.existsSync('./avatar')) {
  } else {
    fs.mkdirSync('./avatar');
  }

  // get image and write to disk
  request(url).pipe(fs.createWriteStream(filePath));
};

const getJSON = function(err, body) {
  if (err) throw err;
  const res = JSON.parse(body);
  for (let person in res) {
    downloadImageByUrl((res[person]['avatar_url']), 'avatar/' + res[person]['login'] + '.jpg');
  }
  // console.log(res);
  // console.log(body);
};


// downloadImageByUrl('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', './avatar/kvirani.jpg');
console.log('Welcome to the GitHub Avatar Downloader!');
const args = process.argv.slice(2);
const repoOwner = args[0];
const repoName = args[1];
getRepoContributors(repoOwner, repoName, getJSON);


