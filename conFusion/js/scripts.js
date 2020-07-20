
$(document).ready(function(){
    $("#mycarousel").carousel( { interval: 2000 } );
    $("#carouselButton").click(function(){
        if ($('#carouselButton').children('span').hasClass('fa-pause')){
            $("#mycarousel").carousel('pause');
            $('#carouselButton').children('span').removeClass('fa-pause')
            $('#carouselButton').children('span').addClass('fa-play')

            $('#carouselButton').removeClass('btn-danger')
            $('#carouselButton').addClass('btn-success')
        
        }else if ($('#carouselButton').children('span').hasClass('fa-play')){
            $("#mycarousel").carousel('cycle');
            $('#carouselButton').children('span').removeClass('fa-play')
            $('#carouselButton').children('span').addClass('fa-pause')  

            $('#carouselButton').removeClass('btn-success')
            $('#carouselButton').addClass('btn-danger')  
        }
    });

    $("#reserveButton").click(function(){
        $("#reserveModal").modal("toggle");
    });

    $("#loginButton").click(function(){
        $("#loginModal").modal("toggle");
    });

    /**
     * necesarily for fuction the tooltips in buttons. 
    
    $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    });
    
    **/
});