console.log('js');

$(document).ready(function () {
    console.log('jQuery is good to go');
    getList();
})


function getList() {
    console.log('in getList');
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} //end GET getList