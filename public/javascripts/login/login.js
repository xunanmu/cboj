$(document).ready(function() {
    var username, password;
    function login() {
        username = $('#username').val();
        password = $.md5($('#password').val());
        $.post("/login/auth", {
            username: username,
            password: password
        }, function(data) {
            if (data.stat == "success") {
                var str = window.location.href.substr(window.location.href.length - 5, 5);
                if (str == 'login')
                    window.location.href='/';
                else window.history.go(0);
            }
            else {
                var EMessage = '<div class="alert alert-danger">用户名或密码错误</div>';
                $('.login-message').html(EMessage);
                setInterval("$('.login-message').html('<br /><br /><br />')", 2000);
            }
        });
    }
    $('#password').keyup(function(event) {
        var keycode = event.which;
        if (keycode == 13) {
            $('#username').focus();
            $('#submit').click();
        }
    });
    $('#username').keyup(function(event) {
        var keycode = event.which;
        if (keycode == 13) {
            $('#password').focus();
        }
    });
    $('#submit').click(function() {
        login();
    });
});

