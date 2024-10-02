const homeId=sessionStorage.getItem("homeId")
sessionStorage.removeItem("homeId")

var output=document.getElementById("outputmain")

output.innerHTML=""
var datahome ;
fetch(`http://localhost:3000/homeDetail/${homeId}`)
    .then(res => res.json())
    .then(data => {
        console.log(data); 
      datahome =data







      var cart=`
        <div class="right">
        <div class="cont" id="outputcont">
      <div class="ele">
          <div class="elename">الاسم</div>
          <div class="elevalue">${datahome.name}</div> <!-- Fixed the closing tag -->
      </div>
      <div class="ele">
          <div class="elename">الوصف</div>
          <div class="elevalue">${datahome.description}</div> <!-- Changed to use datahome.description -->
      </div>
      <div class="ele">
          <div class="elename">عدد الغرف</div>
          <div class="elevalue">${datahome.Nrooms}</div> <!-- Changed to use datahome.Nrooms -->
      </div>
      <div class="ele">
          <div class="elename">عدد الحمامات</div>
          <div class="elevalue">${datahome.Nbathrooms}</div> <!-- Changed to use datahome.Nbathrooms -->
      </div>
      <div class="ele">
          <div class="elename">السعر</div>
          <div class="elevalue"> ${datahome.price} جنيه </div> <!-- Changed to use datahome.price -->
      </div>
      <div class="ele">
          <div class="elename">المكان</div>
          <div class="elevalue">${datahome.place}</div> <!-- Changed to use datahome.place -->
      </div>
      <div class="ele">
          <div class="elename">الطابق</div>
          <div class="elevalue">${datahome.floor}</div> <!-- Changed to use datahome.floor -->
      </div>
      <div class="ele">
          <div class="elename">المساحة</div>
          <div class="elevalue">${datahome.area} م²</div> <!-- Changed to use datahome.area -->
      </div>
        </div>
      </div>
      <div class="left">
        <img src=${datahome.imgsURL } alt="" srcset="" /> 
  
      </div>

      `
      
      
      
      output.innerHTML=cart
      





        
    })
    .catch(error => {
        console.error('Error fetching home detail:', error);
    });

