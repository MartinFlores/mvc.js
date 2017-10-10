function setTitle(str) {
    $('#header-title').html(str);
}


function hideFooter() {
    $('#footer-app').hide();
}

function showFooter() {
    $('#footer-app').show();
}

function showCloseViewButton(action) {
    $('.top-button').css('visibility', 'visible').attr('onclick', action);
}

function hideCloseViewButton() {
    $('.top-button').css('visibility', 'hidden');
}

function setFooter(id) {
    $('#footer-app img').removeClass('active');
    $('#' + id + '>img').addClass('active');
}

function showDesign(el) {
    $('#' + el + ' .design>img')
        .css({
            'transform': 'scale(0.8)',
            'opacity': '0.6'
        })
        .wait(10)
        .css({
            'transform': 'scale(1)',
            'opacity': '1'
        })
}

function showDesignUp(el) {
    el
        .css({
            'transform': 'translateY(0px)',
            'opacity': '1'
        })
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function active(el) {
    $('.horizontal-menu li').removeClass('active');
    $(el).addClass('active');
}


function hash(url, params) {
    if (params != undefined)
        nx.params = params;
    window.location.hash = url;
}

function wait(f, ms) {
    setTimeout(function(argument) {
        f();
    }, ms);
}





function get(url, _done, _fail) {
    $.ajax({
            url: 'http://ec2-54-67-112-122.us-west-1.compute.amazonaws.com/admin/index.php/MobileApi/' + url,
            type: 'GET',
            dataType: 'json',
        })
        .done(function(r) {
            _done(r);
        })
        .fail(function(r) {
            console.log();
            // _fail(r);
            hash('not_internet');
        });
}

function getToken(url, _done, _fail) {
    try {
        var id = ilocati.user.id;
    } catch (err) {
        var id = 0;
    }
    $.ajax({
            url: 'http://ec2-54-67-112-122.us-west-1.compute.amazonaws.com/admin/index.php/MobileApi/' + url,
            type: 'GET',
            headers: {
                "token": id
            },
            dataType: 'json',
        })
        .done(function(r) {
            console.log("r", r);
            _done(r);
        })
        .fail(function(r) {
            console.log("r", r);
            // console.log();
            // _fail(r);
            hash('not_internet');
        });
}


function post(url, obj, _done, _fail) {
    $.ajax({
            url: 'http://ec2-54-67-112-122.us-west-1.compute.amazonaws.com/admin/index.php/MobileApi/' + url,
            type: 'POST',
            dataType: 'json',
            data: obj,
        })
        .done(function(r) {
            _done(r);
        })
        .fail(function(r) {
            console.log();
            // _fail(r);
            hash('not_internet');
        });
}


function val(id) {
    return $(id).val();
}

function valAttr(id) {
    return $(id).attr('data-value');
}


function focus(id, msg, type) {
    $(id).focus();
    console.log(msg);
    if (msg != undefined)
        nx.toast(msg);
    if (type == 'select') {
        $(id).trigger('click');
    }
}

function toggleSelectBox(el) {
    $('body').css('overflow', 'hidden');
    el
        .parent()
        .children('ul')
        .show()
        .wait(20)
        .css({
            'opacity': '1',
            'transform': 'scale(1)'
        });
}


function toggleRadio(el) {
    el
        .parent()
        .parent()
        .find('.input')
        .css('background', '#fff')
        .attr('data-selected', 'false');
    el
        .css('background', '#fbbe10')
        .attr('data-selected', 'true');
}


function radioSelected(el) {
    $(el + ' input[data-selected="true"]').length
    if ($(el + ' input[data-selected="true"]').length > 0) {
        return $(el + ' input[data-selected="true"]').attr('data-value');
    } else {
        return "";
    }
}


function showSelect(obj, text) {
    console.log(obj);
    // alert('asd');
    $('#select .select_box').html('');
    $.each(obj, function(index, val) {
        if (index == 0) {
            $('#select .select_box').append('<li>' + text + '</li>');
            $('#select .select_box').append('<li onclick="' + val.onclick + ';close_select();">' + val.html + '</li>');
        } else {
            $('#select .select_box').append('<li onclick="' + val.onclick + ';close_select();">' + val.html + '</li>');
        }
        // console.log(index);
        // console.log(val);
    });
    $('#select')
        .show()
        .wait(10)
        .css('opacity', '1');

    $('#select .select_box')
        .show()
        .wait(10)
        .css('opacity', '1')
        .css('transform', 'scale(1)');

}

document.addEventListener('click', function(e) {
    if (e.target.id == 'select') {
        $('#select')
            .css('opacity', '0')
            .wait(300)
            .hide()

        $('#select .select_box')
            .css('opacity', '0')
            .css('transform', 'scale(0.6)')
            .wait(300)
            .hide()
    }
});


function close_select() {
    $('#select')
        .css('opacity', '0')
        .wait(300)
        .hide()

    $('#select .select_box')
        .css('opacity', '0')
        .css('transform', 'scale(0.6)')
        .wait(300)
        .hide()
}


function getPosArr(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            return i;
        }
    }
}