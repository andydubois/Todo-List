console.log('js');


$(document).ready(function () {
    console.log('jQuery is good to go');
    //click listeners
    $('#addButton').on('click', handleAddClick);
    $('#domTaskList').on('click', '.deleteButton', handleDelete);
    $('#completedTable').on('click', '.deleteButton', handleDelete);
    $('#domTaskList').on('click', '.completeButton', handleComplete);
    //retrieves to do list
    getList();
})

//GET that retrieves to do list from server/database
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


//POST to send input entries for new task
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
//end POST function


//handles add button click and arranges inputs into an object
function handleAddClick() {
    console.log('add button clicked');
    let newTask = {};
    //puts input fields into an object
    newTask.task = $('#taskIn').val();
    newTask.type = $('#homeOrWork').val();
    newTask.notes = $('#notesIn').val();
    addTask(newTask);
    $('#taskIn').val('');
    $('#notesIn').val('');
}
//end handleAddClick


//Appends to do list from database/server onto DOM
function appendToDoList(todolist) {
    //empties out lists
    $('#domTaskList').empty();
    $('#completedTable').empty();


    for (let i = 0; i < todolist.length; i++) {
        let task = todolist[i];
        //variable equal to HTML to be appended onto DOM
        if (task.completed == 'No') {
            let row = $(`
        <tr class = "notCompleted">
            <td>${task.task}</td>
            <td>${task.type}</td>
            <td class="tableNotes">${task.notes}</td>
            <td>${task.completed} <button class = "completeButton btn btn-success">Complete Task</button></td>
            <td><button class = "deleteButton btn btn-danger">Delete</button></td>
        </tr>
        `);
            row.data('id', task.id);
            $('#domTaskList').append(row);
            //appends results if completed to a new table with the complete button appended
        } else {
            let row = $(`
         <tr class = "completed">
            <td>${task.task}</td>
            <td>${task.type}</td>
            <td>${task.notes}</td>
            <td>${task.completed}</td>
            <td><button class = "deleteButton btn btn-danger">Delete</button></td>
        </tr>

        `);
            row.data('id', task.id);
            $('#completedTable').append(row);
        }
    }
};
//end appendToDoList function

//DELETE function

function handleDelete() {
    console.log('clicked delete button');
    //identify the unique ID of task to be deleted
    let idToDelete = $(this).closest('tr').data('id');
    swal({
            title: "Are you sure?",
            text: "Once deleted, the task will be permanently deleted from the database",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: 'DELETE',
                    url: `/todo/${idToDelete}`,
                }).then(function (response) {
                    console.log('in handleDelete', response)
                    getList(response);
                }).catch(function (error) {
                    console.log('in handleDelete:', error);
                });


                swal("The task has been deleted", {
                    icon: "success",
                });
            } else {
                swal("Your task was not deleted!");
            }
        });
}

//end of DELETE FUNCTION

function handleComplete() {
    console.log('in completeHandler');
    let idToUpdate = $(this).closest('tr').data('id');
    $.ajax({
        type: 'PUT',
        url: `/todo/${idToUpdate}`
    }).then(function (response) {
        getList();
        console.log('client side PUT', response);
    }).catch(function (error) {
        console.log('client side PUT', error);
    })
}