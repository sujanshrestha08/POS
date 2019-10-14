const { Given, When, Then } = require('cucumber');
const fetch = require("node-fetch");

const assert = require('assert');

var jsonFormat = {
    headers: { 'Content-Type': 'application/json' },
    json: true
};
Given('Get the service api {string} and i should get the {string}', async function (url, expectval) {
    let re=[]
    result = await fetch(url) .then(re => re.json())
    .then(res => {re.push(res)});
   
    var data =re[0];
    var assertdata = JSON.parse(expectval);
   
    return assert.deepEqual(data, assertdata);
});
Given("Post to service api {string} with {string} and I should get the {string}", async function (url, data, expectval) {
    let dat=JSON.parse(data)
  
    let re=[]
    // var option = {
    //     method:'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     json: true,
    //     body: JSON.parse(data)
    // };

let resp = await fetch(url, {
        method: 'post',
        body:   JSON.stringify(dat),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => re.push(res.status))
   
    var data = re[0];
    
    var assertdata = JSON.parse(expectval);
 
    return assert.deepEqual(data, assertdata.status);
});
When(/^send PUT request to "([^"]*)", the data is$/, async function (arg1, docString) {

    var data = {
        headers: { 'Content-Type': 'application/json' },
        json: true,
        body: JSON.parse(docString)
    };
    await got.put(url, data);
});

Then(/^Put to service api "([^"]*)" with '([^']*)' and I should get the '([^']*)'$/, async function (url, data, expectval) {
    let dat=JSON.parse(data)
  
    let re=[]

let resp = await fetch(url, {
        method: 'put',
        body:   JSON.stringify(dat),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => re.push(res.status))
   
    var data = re[0];
    
    var assertdata = JSON.parse(expectval);
 
    return assert.deepEqual(data, assertdata.status);
});

Given('Delete the service api {string} and i should get the {string}', async function (url, expectval) {
    let re=[]
    result = await fetch(url,{method:'delete'})  .then(res => re.push(res.status))
   
   
    var data =re[0];
    var assertdata = JSON.parse(expectval);
   
    return assert.deepEqual(data, assertdata.status);
});

