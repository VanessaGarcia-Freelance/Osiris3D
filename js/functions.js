(function($) { 

    console.log('the beginning');

    // Variables
    var placeholderTime = 500;

    var loadingSpeed = 1; //variable*100 milliseconds
    
    var printMin = 0; //amount of minutes printing will take
    var printSec = 5; //amount of seconds (minus the min) printing will take
    
    

    //grabs amount of milliseconds total from the printing minutes and seconds vars provided. Do Not Adjust This Var 
    var printingMill = ((printMin * 60000) + (printSec * 1000)) / 100;

        


    //STEP 1: Click the folder icons to start application
    $(".folder-icons a").click(function(evt){
        evt.preventDefault();
        $(".loading-module").show();
        //load progress bar
        $( "#progressbar" ).progressbar({
            value: false,
            complete: function() {
                $(".loading-module").hide();
                $(".view-module-wrapper").show();
            }
        });
        progress();
    });

    function progress() {
        var val = $( "#progressbar" ).progressbar( "value" ) || 0;
        $( "#progressbar" ).progressbar( "value", val + 1 );
        if ( val < 99 ) {
           setTimeout( progress, loadingSpeed );
        }
    }

    function printprogress() {
        var val = $( "#printingprogress" ).progressbar( "value" ) || 0;

        $( "#printingprogress" ).progressbar( "value", val + 1 );
        if ( val < 99 ) {
           setTimeout( printprogress, printingMill );
        }
    }
    function countdown( elementName, minutes, seconds ) {
        var element, endTime, hours, mins, msLeft, time;

        function twoDigits( n )
        {
            return (n <= 9 ? "0" + n : n);
        }
        function updateTimer()
        {
            msLeft = endTime - (+new Date);
            if ( msLeft < 1000 ) {
                //element.innerHTML = "countdown's over!";
            } else {
                time = new Date( msLeft );
                hours = time.getUTCHours();
                mins = time.getUTCMinutes();
                element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
            }
        }
        element = document.getElementById( elementName );
        endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
        updateTimer();
    }

     
    //STEP 2: Show Compiled 3D View of Skull
    $(".view-module .compile-link").click(function(evt) {
        evt.preventDefault();
        //$(".view-module-wrapper").hide(); 
        $(".compiled-module-wrapper").show(); 
    });

    //STEP 3: Show 3d view of new skull piece
    $(".compiled-module .create").click(function(evt) {
        evt.preventDefault();
        //$(".compiled-module-wrapper").hide(); 
        $(".create-module-wrapper").show(); 
    });

    // STEP 4a: Print Module, select Printer Dropdown
    $(".create-module .print").click(function(evt) {
        evt.preventDefault();
        $( ".selectmenu" ).selectmenu();
        $(".print-steps-wrapper").show(); 
    });

    //STEP 4b: Show Printing Progress 
    $(".print-steps .print-dropdown button").click(function (evt) {
        evt.preventDefault();
        $(".print-steps .print-dropdown").hide();
        $(".print-steps .printing").show();

        $( "#printingprogress" ).progressbar({
            value: false,
            complete: function() {
                $(".print-steps .printing").hide();
                $(".print-steps .print-complete").show();
            }
        });
        countdown( "countdown", printMin, printSec );
        printprogress();

    });

    $(".print-steps .print-complete button").click(function(evt) {
        evt.preventDefault();
        $(".steps-list .print").removeClass('active').addClass('done');
        $(".steps-list .scan").addClass('active');

        $(".print-steps .print-complete").hide();
        $(".print-steps .scanning").show();

        setTimeout(function() {
            $(".steps-list .scan").removeClass('active').addClass('done');
            $(".steps-list .verify").addClass('active');

            $(".print-steps .scanning").hide();
            $(".print-steps .verifing").show();
        }, placeholderTime);

        setTimeout(function() {
            $(".print-steps .verifing").hide();
            $(".print-steps .verify-complete").show();
        }, placeholderTime*2);
    });

    $(".print-steps .verify-complete button").click(function(evt) {
        evt.preventDefault();
        $(".steps-list .verify").removeClass('active').addClass('done');
        $(".steps-list .sterilize").addClass('active');

        $(".print-steps .verify-complete").hide();
        $(".print-steps .sterilizing").show();

        setTimeout(function() {
            $(".steps-list .sterilize").removeClass('active').addClass('done');
            $(".steps-list .ready").addClass('done');

            $(".print-steps .sterilizing").hide();
            $(".print-steps .ready").show();
        }, placeholderTime);
    });


})(jQuery);