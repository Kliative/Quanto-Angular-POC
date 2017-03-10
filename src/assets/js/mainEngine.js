
  
        //Routing Hack
        $('.quant-p2').hide();
        $('.grocery-list-section').hide();

$(window).load(function() {

    // Screen Loader Fade Out
    $('#loader-wrapper').fadeOut('slow');

    // Menu hack
    $('#groceryPage').hide();
    $('#quantoPage-Btn').click(function(){
        $('#groceryPage').fadeOut('slow');
        $('#quantoPage').fadeIn('slow');
        document.getElementById("mySidenav").style.width = "0";
    });
    $('#groceryPage-Btn').click(function(){
        $('#quantoPage').fadeOut('slow');
        $('#groceryPage').fadeIn('slow');
        document.getElementById("mySidenav").style.width = "0";
    });

    //Routing Hack 2
    $('#reQauntoCalc').click(function(){
        $('.quant-p2').fadeOut('slow');
        $('.quant-p1').fadeIn('slow');
    });

    $('#QuantoCalc').click(function(){
        
        $('.quant-p1').fadeOut('slow');
        $('.quant-p2').fadeIn('slow');
        
    });                       
    $('#grocery-countryBtn').click(function(){
        $('.grocery-countrySel').fadeOut('slow');
        $('.grocery-list-section').fadeIn('slow');

    });
    $('#reSelCountry').click(function(){
        $('.grocery-list-section').fadeOut('slow');
        $('.grocery-countrySel').fadeIn('slow');
    });

    //Country Drop Down
    $.getJSON('/assets/js/countryJSON/product_rangetest.json', function(ccData) {
    
        for(var i = 0; i < ccData.length; i++) {

            var countryListData = ccData[i];

            var countryName = countryListData.name;

            var countryCurrencyCode = countryListData.ISO4217_currency_alphabetic_code;

            
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