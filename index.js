    
var jpdbBaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";
var dbName= "SCHOOL";
var relName= "STUDENT";
var connToken= "90932684|-31949276753890039|90954561";


$("#rollId").focus();

function saveRecNo2LS(jsonObj)
{
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getRollId()
{
    var rollId=$("#rollId").val();
    var jsonStr={
        id:rollId
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#stuName").val(record.name);
    $("#class").val(record.class);
    $("#bd").val(record.birthdate);
    $("#add").val(record.address);
    $("#erd").val(record.enrollment);
}

function resetForm()
{
    $("#rollId").val("");
    $("#stuName").val("");
    $("#class").val("");
    $("#bd").val("");
    $("#add").val("");
    $("#erd").val("");

    $("#rollId").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#rollId").focus();
}

function validateData()
{
    var rollId,stuName,classs,bd,add,erd;
    rollId = $("#rollId").val();
    stuName= $("#stuName").val();
    classs=$("#class").val();
    bd=$("#bd").val();
    add=$("#add").val();
    erd=$("#erd").val();

    if (rollId === " ") {
        alert("Roll Number Required Value");
        $("#rollId").focus();
        return "";
        }

    if (stuName === "") {
            alert("Name is Missing");
            $("#stuName").focus();
            return "";
            }

    if (classs === "") {
      alert("Class missing");
     $("#class").focus();
           return "";
                                }

    
    if (bd === "") {
        alert("Birth-date missing");
          $("#bd").focus();
            return "";
                        }

      if (add === "") {
        alert("Address missing");
         $("#add").focus();
         return "";
             }


             if (erd === "") {
                alert("Enrollment date missing");
                  $("#erd").focus();
                    return "";
                                }
    
    var jsonStrObj = {
        id: rollId,
        name: stuName,
        class: classs,
        birthdate: bd,
        address: add,
        enrollment: erd
            };   
    return JSON.stringify(jsonStrObj);
    
}

function getStudent()
{
    var rollIdJsonObj=getRollId();
    var getRequest= createGET_BY_KEYRequest(connToken,dbName,relName,rollIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
   
    if(resJsonObj.status===200)
    {
         
        $('#rollId').prop('disabled',true);
        fillData(resJsonObj);
        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        
        $("#stuName").focus();
        
    }
   
    if(resJsonObj.status===400)
    {
        $("#save").prop("disabled",false);
        $("reset").prop("disabled",false);
        $("#stuName").focus();
    }

   
}

function saveData()
{
    var jsonStrObj=validateData();
    if(jsonStrObj==="")
    {
        return '';
    }
    var putRequest=createPUTRequest(connToken,jsonStrObj,dbName,relName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $("#rollId").focus();
}


function changeData()
{
    $('#change').prop("disabled",true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connToken,jsonChg,dbName,relName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#rollId").focus();

}