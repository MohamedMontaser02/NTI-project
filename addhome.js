function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;

    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

const params = getQueryParams();
const username = params.username;
console.log('UsernameMMM:', username);



document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); 
    document.getElementById('usernameiddd').value = username;

    const formData = new FormData(this);
    const formValues = {};

    formData.forEach((value, key) => {
        formValues[key] = value;
        console.log( key +" its value is " +value)
    });

    fetch("http://localhost:3000/create-homepost", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues) 
    })
    .then(response => response.json())  
    .then(data => {
        alert(data.message); 

        window.location.href = '/index.html'; 
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Failed to create home post"); 
    });
});