function getURLDate(num) {
    var url = document.URL
    var urlarray = url.split('/');
    if(num > 1){
        var date = urlarray[urlarray.length - num]
    }else{
        var date = urlarray[urlarray.length - 1]
    }
    
    return date;
}

function loadToken() {
    $.ajax({
        url: site_url("/api/Timesheet/GetToken"),
        async: false,
        type: "GET",
        dataType: 'JSON',
        success: function (data) {
            $('#token').val(data);
        }
    });
}

function site_url(url){
	return 'http://localhost:4440' + url
}

function getUserInfo() {
    $.ajax({
        url: site_url("/api/Timesheet/GetUserInformation"),
        async: false,
        type: "GET",
        success: function (data) {
            $('#loggedin-username').html(data.Name);
        }
    });
}

function querystring2object() {
    var qryString = window.location.search;
    qryString = qryString.substring(1);
    var qryStringArr = qryString.split('&');
    var jsonobj = {}, paramvalue = '';

    for (i = 0; i < qryStringArr.length; i++) {
        paramvalue = qryStringArr[i].split('=');
        jsonobj[paramvalue[0]] = paramvalue[1];
    }
    return jsonobj;
}

function ajax(url, data, object, type) {

    var type = (type === undefined) ? "GET" : type;

    if (data == null) {
        $.ajax({
            url: site_url(url),
            async: false,
            type: type,
            dataType: 'JSON',
            success: object
        });
    } else {
        $.ajax({
            url: site_url(url),
            async: false,
            type: type,
            data: data,
            dataType: 'JSON',
            success: object
        });
    }
}

function jsonajax(url, data, object, type) {

    var type = (type === undefined) ? "GET" : type;
    
    if (data == null) {
        $.ajax({
            url: site_url(url),
            async: false,
            type: type,
            data : ko.toJSON(data),
            contentType: 'application/json',
            success: object
        });
    } else {
        $.ajax({
            url: site_url(url),
            async: false,
            type: type,
            data: ko.toJSON(data),
            contentType: 'application/json',
            success: object
        });
    }
}

function redirectHome() {
    window.location.href = '/HTML/Index';
}

function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({
        width: progressBarWidth
    }, 500).html("");
}

var obj = querystring2object();




$(document).ajaxSend(function (event, request) {

    if (request == null) return;

    var requestToken = $('#token').val();

    if (requestToken.length) {
        request.setRequestHeader("RequestVerificationToken", requestToken);
    }
});