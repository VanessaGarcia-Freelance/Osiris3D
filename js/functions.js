(function($) { 

    console.log('the beginning');

    // Variables
    var placeholderTime = 500;

    $(".folder-icons a").click(function(evt){
        evt.preventDefault();
        $(".loading-module").show();

        setTimeout(function() {
           $(".loading-module").hide();
           $(".view-module-wrapper").show(); 
        }, placeholderTime);
    });

    $(".view-module .compile-link").click(function(evt) {
        evt.preventDefault();
        //$(".view-module-wrapper").hide(); 
        $(".compiled-module-wrapper").show(); 
    });

    $(".compiled-module .create").click(function(evt) {
        evt.preventDefault();
        //$(".compiled-module-wrapper").hide(); 
        $(".create-module-wrapper").show(); 
    });

    $(".create-module .print").click(function(evt) {
        evt.preventDefault();
        $(".print-steps-wrapper").show(); 
    });




    $(".print-steps .print-dropdown button").click(function (evt) {
        evt.preventDefault();
        $(".print-steps .print-dropdown").hide();
        $(".print-steps .printing").show();

        setTimeout(function() {
            $(".print-steps .printing").hide();
            $(".print-steps .print-complete").show();
        }, placeholderTime);
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