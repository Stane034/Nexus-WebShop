document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let username = document.getElementById('loginusername').value;
    let password = document.getElementById('loginpassword').value;
  
    let data = {
      username: username,
      password: password
    };
  
    fetch('http://127.0.0.1:3000/login', {
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
        throw new Error('Nepostojeci korisnik ili lozinka');
      }
    })
    .then(response => {
      if (response.success) {
        alert("Uspesna prijava")
        window.open("../index.html");
        window.location.href = "../index.html";
      } else {
        alert("Neuspesna prijava")
      }
    })
    .catch(error => {
      alert(error.message);
    });
});