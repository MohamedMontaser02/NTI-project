var homesdata


function getdatahomes() {
fetch("http://localhost:3000/getcontennet")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok: ' + res.statusText);
            }
            return res.json(); 
        })
        .then(body => {
            homesdata = body; 
            displayhome(homesdata)
            console.log(homesdata); 
        })
        .catch(error => {
            console.log("Fetch error:", error); 
        });
}



document.addEventListener("DOMContentLoaded", function() {
    getdatahomes(); 
});



function displayhome(homesdata)
{
    document.getElementById("outputoutput").innerHTML=""
    var cart=``
    for(var i=0;i<homesdata.length;i++)
    {
        cart +=` <div class="ele">
          <div class="upper"><img src="${homesdata[i].imgsURL}" alt="" srcset=""></div>
          <div class="lower">
            <div class="name">${homesdata[i].name}</div>
            <div class="place">${homesdata[i].place}</div>
            <div class="prics">${homesdata[i].price} جنيه</div>
            <button type="button" class="info-button" onclick="moreinfo('${homesdata[i]._id}')">معلومات اضافيه</button>
          </div>
        </div>`

    }
    document.getElementById("outputoutput").innerHTML=cart
}
console.log(homesdata)



function moreinfo(homeId)
{
    console.log(homeId)
    sessionStorage.setItem("homeId",homeId)
    window.location.href = "homedetals.html";
}