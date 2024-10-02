
document.getElementById('myAnchor').addEventListener('click', function (e) {
    e.preventDefault(); 
    var output=document.getElementById("outputmasseage")
    const values = {
        emailF: document.getElementById('email').value,
        PasswordF: document.getElementById('password').value, 
    };


    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    };

    fetch("http://localhost:3000/signin", options)
    .then(res => res.json()) 
    .then(data => {
        if (data.message === "login successful") {
            console.log('Login Successful:', data.username);
            sessionStorage.setItem("usernames",data.username)
            window.open(`addhome.html?username=${encodeURIComponent(data.username)}`);
         }
          else {
            return res.json(); 
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});
