$(document).ready(function () {

    loadToken();
    getUserInfo();
    $(window).resize(function () {
        var bodyheight = $(document).height();
        $('body').css({
            'min-height': bodyheight
        })
    });
    $(window).resize();

    $('#mobileNavIcon').click(function () {
        $('#nav').slideToggle();
        return false;
    });
    $('#SearchIcon').click(function () {
        $('#search').slideToggle();
        return false;
    });

    $('header h1').click(function () {
        $('#UserNav').slideToggle();
        return false;
    });

    $(function () {
        $('.logout').click(function () {

            var url = '/api/Timesheet/Logout';
            var data = null;
            var type = 'GET';

            ajax(url, data, redirectHome, type);

        });
    })
});