var request = new XMLHttpRequest();

request.open('GET', 'http://localhost:8000/notes', true);

request.onload = function () {
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(notes => {
      console.log(notes)
    })
  } else {
    console.log('error')
  }

};

request.send();