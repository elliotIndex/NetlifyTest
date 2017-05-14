const config = require('./config.json');
const netlify = require('netlify');

const client = netlify.createClient({
  access_token: config.access_token
});

client.sites()
  .then(sites => {
    console.log('sites before', sites.map(site => site.name));
  })
  .then(() => client.createSite({
    name: 'elliot-test-site-2'
  }))
  .then(site => site.createDeploy({
    dir: './dist'
  }))
  .then(deploy => deploy.waitForReady())
  .then(something => {
    console.log('Deploy is done: ', something);
  })
  .catch(error => {
    console.log('Error!');
    console.error(error);
  })
  .then(() => client.sites())
  .then(sites => {
    console.log('sites after', sites.map(site => site.name));
  });
