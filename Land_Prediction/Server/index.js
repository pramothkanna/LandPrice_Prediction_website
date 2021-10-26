function onPageLoad(){
    var url="http://127.0.0.1:5000/get_locations";
    $.get(url,function(data,status){
        if(data){
            var locations=data.locations;
            $("#uiLocations").empty();
            for(var i in locations){
                var opt=new Option(locations[i]);
                $("#uiLocations").append(opt);
            }
        }
        
    });
}

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    
}
  
function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
   
}
  
  function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    
    var url = "http://127.0.0.1:5000/predict_price";
  
    $.post(url, {
        sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        area: location.value
    },function(data, status) {
        estPrice.innerHTML = "<h2>" + data.price.toString() + " Lakh</h2>";
    });
  }

window.onload= onPageLoad;