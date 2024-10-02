document.getElementById('myAnchor').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default GET request
    const selectedType = document.querySelector('input[name="persontype"]:checked');
    if (selectedType) {
        const persontypeValue = selectedType.value; // "seller" or "user"
    console.log(persontypeValue)
    var output=document.getElementById("outputmasseage")
    const values = {
        userNameF: document.getElementById('userName').value,
        emailF: document.getElementById('email').value,
        PasswordF: document.getElementById('password').value, 
        personType:persontypeValue
    };


    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    };

    fetch("http://localhost:3000/signup", options)
        .then(res => {
            if (res.ok) {
                return res.json(); 
            } else {
                throw new Error('Failed to submit signup form');
            }
        })
        .then(body => {
            console.log('Server Response:', body.massege); 
            output.innerText=body.massege

        })
        .catch(error => {
            console.log('There was a problem with the fetch operation:', error);
        });}
});
