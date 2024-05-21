$(document).ready(function () {
    ShowEmployeeData();
});

function ShowEmployeeData() {

    let url = $('#urlEmployeeData').val();

    $.ajax({
        //url: '/Ajax/EmployeeList',
        url: url,
        cache: false,
        //method: 'GET',
        type: 'POST',
        dataType: 'JSON',
        //contentType: 'application/json;charset=utf-8',
        success: function (result) {
            $('#table_data').empty();
            let object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.designation + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td> <div class="d-flex justify-content-end gap-2"><a href="#" class="btn btn-sm btn-warning" onclick="EditEmployee(' + item.id + ');">Edit</a><a href="#" class="btn btn-sm btn-primary" onclick="Details(' + item.id + ');">Details</a><a href="#" class="btn btn-sm btn-danger" onclick="DeleteEmployee(' + item.id +');">Delete</a></div> </td>';
                object += '</tr>';
            })
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });
};


$('#AddEmployeeModal').click(function () {
    ClearTextBox();
    $("#EmployeeModal").modal('show');
    $('#EmployeeIdDiv').hide();
    $('#AddEmployee').css('display', 'block');
    $('#UpdateEmployee').css('display', 'none');
    $('#EmpCRUDstatus').text('Add Employee');
});


function AddEmployee() {
    let objData = {
        Name: $('#Name').val(),
        Designation: $('#Designation').val(),
        City: $('#City').val(),
        Salary: $('#Salary').val(),
    }

    $.ajax({
        url: '/Ajax/CreateEmployee',
        cache: false,
        //type: 'POST',
        type: 'POST',
        dataType: 'JSON',
        data: objData,
        //contentType: 'application/json;charset=utf-8',
        success: function () {
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't save");
        }
    });
};


function DeleteEmployee(id) {
    let empId = id
    if (confirm('Are you sure, you want to delete this record od Id:' + id)) {
        $.ajax({
            url: '/Ajax/DeleteEmployee?id=' + id, // if pass id with query parameter then don't need to pass data: empId,
            //url: '/Ajax/DeleteEmployee',
            cache: false,
            type: 'POST',
            dataType: 'JSON',
            //data: empId,
            success: function () {
                //alert('Employee Deleted Successfully');
                ShowEmployeeData();
            },
            error: function () {
                alert("Data can't be deleted");
            }
        });
    }
}


function EditEmployee(id) {
    let editEmpId = id
    $.ajax({
        url: '/Ajax/EditEmployee?id=' + id,
        //url: '/Ajax/EditEmployee',
        cache: false,
        type: 'GET',
        dataType: 'JSON',
        //data: editEmpId,
        success: function (response) {
            $('#EmployeeModal').modal('show');
            $('#EmployeeId').val(response.id);
            $('#Name').val(response.name);
            $('#Designation').val(response.designation);
            $('#City').val(response.city);
            $('#Salary').val(response.salary);

            $('#AddEmployee').css('display', 'none');
            $('#UpdateEmployee').css('display', 'block');
            $('#EmployeeIdDiv').show();
            $('#EmpCRUDstatus').text('Update Employee');
        },
        error: function () {
            alert("Data not found");
        }
    });
}


function UpdateEmployee() {
    let objData = {
        Id: $('#EmployeeId').val(),
        Name: $('#Name').val(),
        Designation: $('#Designation').val(),
        City: $('#City').val(),
        Salary: $('#Salary').val(),
    }

    $.ajax({
        url: '/Ajax/UpdateEmployee',
        cache: false,
        type: 'POST',
        dataType: 'JSON',
        data: objData,
        success: function () {
            alert('data updated successfully');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
            $('#AddEmployee').css('display', 'block');
            $('#UpdateEmployee').css('display', 'none');
        },
        error: function () {
            alert("Data can't save");
        }
    });
}

function Details(id) {
    let empDetailsId = id;
    $("#DetailsModal").modal('show');

    $.ajax({
        url: '/Ajax/EmployeeDetails?id=' + empDetailsId,
        cache: false,
        type: 'GET',
        dataType: 'JSON',
        data: empDetailsId,
        success: function (response) {
            $('#EmployeeId2').val(response.id);
            $('#Name2').val(response.name);
            $('#Designation2').val(response.designation);
            $('#City2').val(response.city);
            $('#Salary2').val(response.salary);
        },
        error: function () {
            alert("Data not found");
        }
    });

    $("#DetailsEditBtn").click(function () {
        ClearTextBox();
        $("#DetailsModal").modal('hide');
        EditEmployee(empDetailsId);
    });
}











function HideModalPopUp() {
    $("#EmployeeModal").modal('hide')
}

function ClearTextBox() {
    $('#EmployeeId').val('');
    $('#Name').val('');
    $('#Designation').val('');
    $('#City').val('');
    $('#Salary').val('');
};