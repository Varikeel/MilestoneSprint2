# Request Data
#### To make a request to the pop-up microservice, the /confirm-task endpoint is used. It first interacts using the /alert endpoint. The todo list, using axios, makes a POST request made of the microservice's URL and port. It then sends a request body with confirmation that the task has been completed, using a JSON object.
### Here is an example call:
```
axios.post('http://localhost:3001/alert', { confirmed: true })
     .then(response => {
         // successful response
     })
     .catch(error => {
         // error response
     });
```

# Receive Data
#### To receive data from the pop-up microservice, it is first received in the .then() block of the axios call. If the user's showPopUps is set to true, then the response will contain the randomly generated motivational message by the microservice. However, if the pop ups was set to false, the response will indicate that pop-ups are disabled. The todo list then uses the response to display the pop-up alert.
### Here is an example call:
```
axios.post('http://localhost:3001/alert', { confirmed: true })
     .then(response => {
         if (response.data.message) {
             // Display motivational pop-up
         } else {
             // Pop-ups disabled
         }
     })
     .catch(error => {
         // errors
     });
```
