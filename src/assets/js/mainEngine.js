  var prodSelection = '';
  
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

    })

    $('#destCurSel').on('change', function() {
        var destCurSelection = this.value ;
        var destCountryName = $("#destCurSel option:selected").text();

    });

    $('#prodSel').on('change', function() {
      var prodSelection = this.value ;

    })
   
      
    //Country Codes
    $.getJSON('/assets/js/countryJSON/product_rangetest.json', function(ccData) {    
 
        console.log(ccData);

    $('#QuantoCalc').click(function(){

        $('#quantoDetSect').fadeIn('slow');

        for (var i = 0; i < ccData.length; i++){

            if (ccData[i].products){

                if (ccData[i].ISO4217_currency_alphabetic_code == baseCurSelection){

                    var baseCom = ccData[i].products[prodSelection]['norm']['p'];

                    $("#baseCurrSymbol").html(ccData[i].ISO4217_currency_symbol);
                    $("#baseCurrSymbolDetail").html(ccData[i].ISO4217_currency_symbol);

                }    
            
                if (ccData[i].ISO4217_currency_alphabetic_code == destCurSelection){

                    $("#destCurrSymbol").html(ccData[i].ISO4217_currency_symbol);

                } 

            }
        }


           
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

    });                       





                    $('#loader-wrapper').fadeOut('slow');
                    

                    for(var i = 0; i < ccData.length; i++) {


                        var countryListData = ccData[i];

                        var countryName = countryListData.name;

                        var countryCurrencyCode = countryListData.ISO4217_currency_alphabetic_code;

                        console.log(countryCurrencyCode);
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