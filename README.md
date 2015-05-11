# fetch-client

An http client based on Fetch API.

## How To
```javascript
var Fetch = require('fetch-client');

var headers = {}; //default headers for all requests
var fetchClient = new Fetch('<baseURL>', headers);

//POST
var body = {};
fetchClient.POST('p/a/t/h', body)
	.then((res) => res.json()) 
	.then((json) => {console.log('succeed with response:', json);})
	.catch((error) => {console.log('fail with error:', error);});
	
//GET
var params = {};
fetchClient.GET('p/at/h', params) // also returns a promise

//set Basic Authorization header
var username = 'hello';
var password = '123';
fetchClient.setBasicAuthorizationHeader(username, password);

//set header field
fetchClient.setHeader("Content-type", "application/json; charset=UTF-8");

//get header field value
fetchClient.getHeader("Content-type"); // returns "application/json; charset=UTF-8"

```

## License
fetch-client is available under the MIT license.
