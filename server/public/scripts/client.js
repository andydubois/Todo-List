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
        appendToDoList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} //end GET getList

function appendToDoList(todolist) {
    $('#domTaskList').empty();


    for (let i = 0; i < todolist.length; i++) {
        let task = todolist[i];

        let row = $(`
        <tr>
            <td>${task.task}</td>
            <td>${task.type}</td>
            <td>${task.notes}</td>
            <td>${task.completed}</td>
            <td><button class="completeButton">Completed task?</button><button class="deleteButton">Delete?</button></td>
        </tr>
        `);
        row.data('id', task.id);
        $('#domTaskList').append(row);
    }
};