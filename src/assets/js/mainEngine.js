  var baseCurSelection = '';
  var destCurSelection = '';
  var prodSelection = '';

  var baseCom = '';
  var destCom = '';


        //hide icon
        $('#McMeal').hide();
        $('#DomBeer').hide();
        $('#ImpBeer').hide();
        $('#Coke').hide();
        $('#WineBottle').hide();
        $('#quantoDetSect').hide();
  
$(window).load(function() {

    //amke window scroll down
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);

    // dropdown select
    $baseCurSel_option_selected = $("#baseCurSel");
    $baseCountryName_option_selected = $("#baseCountryName");
    $destCurSel_option_selected = $("#destCurSel");
    $destCountryName_option_selected = $("#destCountryName");
    $prodSel_option_selected = $("#prodSel");

    $baseCurSel_option_selected.change(function() {  baseCurSelection = $(this).val(); });
    $baseCountryName_option_selected.change(function() {  baseCountryName = $(this).val(); });    
    $destCurSel_option_selected.change(function() {  destCurSelection = $(this).val(); });
    $destCountryName_option_selected.change(function() {  destCountryName = $(this).val(); });
    $prodSel_option_selected.change(function() {  prodSelection = $(this).val(); });

    baseCurSelection = $baseCurSel_option_selected.val();
    baseCountryName = $baseCountryName_option_selected.text();
    destCurSelection = $destCurSel_option_selected.val();
    destCountryName = $destCountryName_option_selected.text();
    prodSelection = $prodSel_option_selected.val();

    $('#baseCurSel').on('change', function() {
      var baseCurSelection = this.value ;
      var baseCountryName = $("#baseCurSel option:selected").text();
      console.log('Base Cur selcted 1: '+baseCurSelection);
      console.log('Base Name selcted 1: '+baseCountryName);
    })

    $('#destCurSel').on('change', function() {
        var destCurSelection = this.value ;
        var destCountryName = $("#destCurSel option:selected").text();
      console.log('Destin Cur selcted 2: '+destCurSelection);
      console.log('Destin Name selcted 2: '+destCountryName);
    });

    $('#prodSel').on('change', function() {
      var prodSelection = this.value ;
      console.log('Prod selcted 3: '+prodSelection);
    })
    // $.getJSON('http://api.fixer.io/latest', getExchangeRate);
      
    //Country Codes
    $.getJSON('/assets/js/countryJSON/product_rangetest.json', function(ccData) {    

    // Exchange Rates
    var baseCur = "";
    var destCur = "";
    
    
    var getExchangeRate = function(data) {
      fx.base = "USD";
      fx.rates = data.rates;
      // var rate = fx(1).from(baseCur).to(destCur);
      var bVdRate = fx(1).from(baseCur).to(destCur);
      // console.log("Exchange: 1 "+baseCur+" = "+bVdRate.toFixed(5)+" "+destCur); 
    }
    $.getJSON('https://openexchangerates.org/api/latest.json?app_id=8189c190e69d471fb0b4abfba0a7c023', getExchangeRate);
    
    $('#QuantoCalc').click(function(){

        $('#quantoDetSect').fadeIn('slow');

      $("html, body").animate({ scrollTop: $(document).height()-$(document).height() }, 1000);
        for (var i = 0; i < ccData.length; i++){
          // look for the entry with a matching `code` value
            if (ccData[i].products){
                // we found it
                // obj[i].name is the matched result
                if (ccData[i].ISO4217_currency_alphabetic_code == baseCurSelection){
                // console.log("clickProd= "+ccData[i].products.prodSelection);
                    // console.log("clickProd Base= "+ccData[i].products[prodSelection]);
                    var baseCom = ccData[i].products[prodSelection]['norm']['p'];
                    document.getElementById("basePriceTxt").innerHTML = baseCom;
                    document.getElementById("baseCoName").innerHTML = ccData[i].name;
                    $("#baseCurrSymbol").html(ccData[i].ISO4217_currency_symbol);
                    $("#baseCurrSymbolDetail").html(ccData[i].ISO4217_currency_symbol);
                    // console.log("baseCurrSymbol "+ccData[i].ISO4217_currency_symbol);
                    // console.log("baseCom "+baseCom);
                }    
            
                if (ccData[i].ISO4217_currency_alphabetic_code == destCurSelection){

                    // console.log("clickProd Dest= "+ccData[i].products[prodSelection]);
                    var destCom = ccData[i].products[prodSelection]['norm']['p'];
                    document.getElementById("destPriceTxt").innerHTML = destCom;
                    document.getElementById("destPriceTxtEX").innerHTML = destCom;
                    document.getElementById("destCoName").innerHTML = ccData[i].name;
                    $("#destCurrSymbol").html(ccData[i].ISO4217_currency_symbol);
                    
                    // console.log("destCurrSymbol "+ccData[i].ISO4217_currency_symbol);
                    // console.log("destCom "+destCom);
                } 

            }
        }

        //Exchange Rate Calc
        var dVbRate = fx(1).from(baseCurSelection).to(destCurSelection);
        var dVb2Rate = fx(1).from(destCurSelection).to(baseCurSelection);
        document.getElementById("basVdestTxt").innerHTML = dVbRate.toFixed(5);
        document.getElementById("destVbasTxt").innerHTML = dVb2Rate.toFixed(5);
        
        //percentage
        var v1 = (destCom*dVb2Rate).toFixed(2);
        var v2 = baseCom;
        var diffPercent = ((v2 / v1) * 100).toFixed(2);
        // document.write(v2+" is "+diffPercent+"% of "+v1);
        if(diffPercent>100){
            document.getElementById("finalCalcPer").innerHTML = diffPercent+" % less expensive";
        } else {
            document.getElementById("finalCalcPer").innerHTML = diffPercent+" % more expensive";
        }
        // document.getElementById("pricerangeTxt").innerHTML = v2+" is "+diffPercent+"% of "+v1;

        //cash calc
        var priceDiff = (destCom*dVb2Rate).toFixed(2) - baseCom;

        if(priceDiff<0){
            document.getElementById("finalCalcCash").innerHTML = Math.abs(priceDiff.toFixed(2))+" less expensive";
        }else{
            document.getElementById("finalCalcCash").innerHTML = priceDiff.toFixed(2)+" more expensive";
        }   
        
        document.getElementById("basePricePlusExhange").innerHTML = (destCom*dVb2Rate).toFixed(2)+"~";


        // show icon
           
            switch (prodSelection) {
                case "McMeal":
                $('#McMeal').show();
                    $('#DomBeer').hide();
                    $('#ImpBeer').hide();
                    $('#Coke').hide();
                    $('#WineBottle').hide();
                    break;
                case "DomBeer":
                    $('#McMeal').hide();
                $('#DomBeer').show();
                    $('#ImpBeer').hide();
                    $('#Coke').hide();
                    $('#WineBottle').hide();
                    break;
                case "ImpBeer":
                    $('#McMeal').hide();
                    $('#DomBeer').hide();
                $('#ImpBeer').show();
                    $('#Coke').hide();
                    $('#WineBottle').hide();
                    break;
                case "Coke":
                    $('#McMeal').hide();
                    $('#DomBeer').hide();
                    $('#ImpBeer').hide();
                $('#Coke').show();
                    $('#WineBottle').hide();      
                    break;
                case "WineBottle":
                    $('#McMeal').hide();
                    $('#DomBeer').hide();
                    $('#ImpBeer').hide();
                    $('#Coke').hide();
                $('#WineBottle').show();
                    break;
                case "PackSmokes":
                console.log("PackSmokes");
                    break;
                case "OneWayTicket":
                console.log("OneWayTicket");
                    break;
                case "MovieTicket":
                console.log("MovieTicket");
                    break;
                default:
            }




        //convertion rate checks
        console.log("pricedif "+priceDiff);
        console.log(destCom+" * "+dVb2Rate.toFixed(5)+" = "+baseCom*dVb2Rate.toFixed(5));
        console.log("Selection Exchange: "+baseCurSelection+"1 = "+destCurSelection+" "+dVbRate.toFixed(5));
    });                       
    // console.log(getObject(ccData));


          //geoLocation
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

              var lat = position.coords.latitude; 
              var long = position.coords.longitude;

                $.getJSON('https://freegeoip.net/json/?callback=?', function(location) {
                  // console.log('freegeoip country_name = '+location.country_name);
                  // console.log('freegeoip country_code = '+location.country_code);
                  // console.log('freegeoip city = '+location.city);
                  // console.log('freegeoip region_name = '+location.region_name);

                    // alert(location.countryName);
                    // console.log('Your Current Counrty: '+location.countryName+' ('+location.countryCode+')');

                    //user location
                    // document.getElementById("userLoc").innerHTML = location.country_name+' ('+location.country_code+')';
                    $('#loader-wrapper').fadeOut('slow');
                    
                    // document.getElementById("currentLocOpt").value = location.countryCode;

                    for(var i = 0; i < ccData.length; i++) {

                        if (ccData[i].ISO3166_1_Alpha_2 == location.country_code){
                          //dropdown current location <option>
                          document.getElementById("currentLocOpt").innerHTML = 'Current Location: '+location.country_name+' ('+location.country_code+')';
                          $("#location").text(location.country_name+' '+location.country_code);
                          document.getElementById("currentLocOpt").value = ccData[i].ISO4217_currency_alphabetic_code;

                          document.getElementById("postCountry").innerHTML = 'Current Location: '+location.country_name+' ('+location.country_code+')';
                          document.getElementById("postCountry").value = ccData[i].ISO3166_1_Alpha_2;

                          document.getElementById("listCurrentLocOpt").innerHTML = 'Current Location: '+location.country_name+' ('+location.country_code+')';
                          document.getElementById("listCurrentLocOpt").value = ccData[i].ISO3166_1_Alpha_2;
                            // console.log("Some Dats: "+ccData[i].ISO4217_currency_alphabetic_code);
                        }
                        
                        var countryListData = ccData[i];
                        // console.log(countryListData);

                        var countryName = countryListData.name;
                        // console.log("countryName "+[i]+" = "+countryName);

                        var countryCode = countryListData.ISO3166_1_Alpha_2;
                        // console.log("countryCode "+[i]+" = "+countryCode+" which is "+countryListData.ISO3166_1_Alpha_2);

                        var countryCurrencyCode = countryListData.ISO4217_currency_alphabetic_code;
                        // console.log("countryCurrencyCode "+[i]+" = "+countryCurrencyCode);

                        var countryProd = countryListData.products;
                        // console.log("countryProd "+[i]+" = "+countryProd);
                        // console.log("countryProd length"+[i]+" = "+countryProd.length);


                        //QuantoCalc
                        $("#baseCurSel").append($('<option>', {
                          value: countryCurrencyCode,
                          text: countryName
                        }));
                        $("#destCurSel").append($('<option>', {
                            value: countryCurrencyCode,
                            text: countryName
                        }));
                        // Posting
                        $("#postCountrySel").append($('<option>', {
                          value: countryCurrencyCode,
                          text: countryName
                        }));
                        //Grocery List
                        $("#listBaseCurSel").append($('<option>', {
                          value: countryCurrencyCode,
                          text: countryName
                        }));
                        $("#listDestCurSel").append($('<option>', {
                            value: countryCurrencyCode,
                            text: countryName
                        }));

                        
                    }
                });
            });
          }
    });

    

  });