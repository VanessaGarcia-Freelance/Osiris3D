$(document).ready(function() { 
        $('#product').j360();  
        $('img').on('dragstart', function(event) { event.preventDefault(); });
        $(".img").mousedown(function(){
            return false;
        });

 

    });
 

(function($) { 

    //console.log('the beginning');

    // Variables
 
    //var placeholderTime = 500;

    //var loadingSpeed = 1; //variable*100 milliseconds
    
    /*var printMin = printMin; //amount of minutes printing will take
    var printSec = printSec; //amount of seconds (minus the min) printing will take
    
    var scanMin = scanMin;
    var scanSec = scanSec;

    var verifyMin = verifyMin;
    var verifySec = verifySec;

    var sterilizeMin = sterilizeMin;
    var sterilizeSec = sterilizeSec; */

    //grabs amount of milliseconds total from the printing minutes and seconds vars provided. Do Not Adjust This Var 
    var printingMill = ((printMin * 60000) + (printSec * 1000)) / 100;
    var scanningMill = ((scanMin * 60000) + (scanSec * 1000)) / 100;
    var verifyMill = ((verifyMin * 60000) + (verifySec * 1000)) / 100;
    var sterilizeMill = ((sterilizeMin * 60000) + (sterilizeSec * 1000)) / 100;
        


    //STEP 1: Click the folder icons to start application
    $(".folder-icons a.launch").click(function(evt){
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

    function scanprogress() {
        console.log( 'scanning', scanningMill );
        var val = $( "#scanningprogress" ).progressbar( "value" ) || 0;

        $( "#scanningprogress" ).progressbar( "value", val + 1 );
        if ( val < 99 ) {
           setTimeout( scanprogress, scanningMill );
        }
    }
    function verifyprogress() {
        console.log( 'scanning', scanningMill );
        var val = $( "#verifyingprogress" ).progressbar( "value" ) || 0;

        $( "#verifyingprogress" ).progressbar( "value", val + 1 );
        if ( val < 99 ) {
           setTimeout( verifyprogress, verifyMill );
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
            if (( msLeft < 1000 )) {
                //element.innerHTML = "countdown's over!";
                if(elementName === "countdownSterilize") {
                    $(".steps-list .sterilize").removeClass('active').addClass('done');
                    $(".steps-list .ready").addClass('done');

                    $(".print-steps .sterilizing").hide();
                    $(".print-steps .ready").show();
                }
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
        $(".view-module-wrapper").hide();
        $(".compiled-module-wrapper").show(); 
    });

    //STEP 3: Show 3d view of new skull piece
    $(".compiled-module .create").click(function(evt) {
        evt.preventDefault();
        $(".create-module-wrapper").show();  
        $('#news-link').data('backstep',".view-module .compile-link");
        $('#news-link').data('removeprint',"y");
    });

    // STEP 4a: Print Module, select Printer Dropdown
    $(".create-module .print").click(function(evt) {
        evt.preventDefault();
        $( ".selectmenu" ).selectmenu();
        $(".print-steps-wrapper").show(); 
        $('#news-link').data('backstep',".compiled-module .create");
        $('#news-link').data('removeprint',"y");
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

        $( "#scanningprogress" ).progressbar({
            value: false,
            complete: function() {
                $(".steps-list .scan").removeClass('active').addClass('done');
                $(".steps-list .verify").addClass('active');

                $(".print-steps .scanning").hide();
                $(".print-steps .verifing").show();

                $( "#verifyingprogress" ).progressbar({
                    value: false,
                    complete: function() {
                        $(".print-steps .verifing").hide();
                        $(".print-steps .verify-complete").show();
                    }
                });
                countdown( "countdownVerify", verifyMin, verifySec );
                verifyprogress();
            }
        });
        countdown( "countdownScan", scanMin, scanSec );
        scanprogress(); 
    });

    $(".print-steps .verify-complete button").click(function(evt) {
        evt.preventDefault(); 
        $(".steps-list .verify").removeClass('active').addClass('done');
        $(".steps-list .sterilize").addClass('active');

        $(".print-steps .verify-complete").hide();
        $(".print-steps .sterilizing").show();

        countdown( "countdownSterilize", sterilizeMin, sterilizeSec );
    });
    $(".modify-implant").click(function(evt) {
        evt.preventDefault(); 
 
        $(".print-steps-wrapper").fadeOut(); 
        $(".steps-list li").removeClass('active');
        $(".steps-list li").removeClass('done'); 
        $(".print-steps .print-dropdown").addClass('active');
        $(".print-steps .print-dropdown").fadeIn();
        $(".print-steps .ready").fadeOut();
    });

    $("#home-link").click(function(evt) {
        evt.preventDefault();  
        $('.view-module-wrapper').fadeOut();
        $(".compiled-module-wrapper").fadeOut(); 
        $(".create-module-wrapper").fadeOut();  
        $(".print-steps-wrapper").fadeOut(); 
        $(".steps-list .sterilize").removeClass('active');
        $(".steps-list li").removeClass('done'); 
        $(".print-steps .print-dropdown").addClass('active');
        $(".print-steps .print-dropdown").fadeIn();
        $(".print-steps .ready").fadeOut();
        $('#news-link').data('backstep',".folder-icons a.launch");
    });

    $("#main-screen-link").click(function(evt) {
        evt.preventDefault();  
        $("#home-link").click();
    });
    $(".help-icon").click(function(evt) {
        evt.preventDefault();  
        $(".application-wrapper").toggleClass('show-help');
    });

    $("#news-link").click(function(evt) {
        evt.preventDefault();  
        $('.view-module-wrapper').hide();
        $(".compiled-module-wrapper").hide(); 
            $(".create-module-wrapper").hide(); 
        var golink = $(this).data('backstep'); 
        if($(this).data('removeprint') == 'y'){ 
            $(".print-steps-wrapper").fadeOut(); 
            $(".steps-list li").removeClass('active'); 
            $(".steps-list li").removeClass('done'); 
            $(".print-steps .ready").fadeOut();
            $('.steps-modules .module').hide();
            $(".print-steps .print-dropdown").addClass('active');
            $(".print-steps .print-dropdown").fadeIn();
        } 
        //alert(golink);
        $(golink).click();
    });

})(jQuery);