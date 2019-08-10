console.log('js');

$(document).ready(function () {
    console.log('jQuery is good to go');
    //click listeners
    $('#addButton').on('click', handleAddClick);
    //retrieves to do list
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


function addTask(newTask) {

    console.log('in addTask', newTask);
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: newTask,
    }).then(function (response) {
        console.log('Response from server-side:', response);
        getList();
    }).catch(function (error) {
        console.log('Error in POST client side', error);
    });
}

function handleAddClick() {
    console.log('add button clicked');
    let newTask = {};
    //puts input fields into an object
    newTask.task = $('#taskIn').val(),
        newTask.type = $('#homeOrWork').val();
    newTask.notes = $('#notesIn').val();
    addTask(newTask);
}

//Appends to do list from database/server onto DOM
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