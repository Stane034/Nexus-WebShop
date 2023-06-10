document.getElementById('signup').addEventListener('submit', function(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let data = {
    username: username,
    password: password
  };

  fetch('http://127.0.0.1:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status == 325) {
        throw new Error('Vec postoji korisnik sa takvim username');
      }

      throw new Error('Došlo je do greške prilikom slanja zahteva. Status: ' + response.status);
    }
  })
  .then(response => {
    alert(response.message);
    window.open("../index.html");
    window.location.href = "../index.html";
  })
  .catch(error => {
    alert(error.message);
  });
});