<?PHP
 if(!empty($_FILES['file']))
  {
    $filename_original = $_FILES['file']['name'];

   
    $path = '../../upload/' . $filename_original;
    $fileType = array(
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword");
    if(!in_array($_FILES['file']['type'], $fileType)){
      
        echo "typeerror";
        return false;
      //  trigger_error('ISE function called.', E_USER_ERROR);
    }
    if($_FILES['file']['size'] > 2097152){
      echo "sizeerror";
      return false;
    }
    if(move_uploaded_file($_FILES['file']['tmp_name'], $path)) {
    
    } else{
        echo "There was an error uploading the file, please try again!";
    }
  }else{
    echo "File transfer error";
  }


?>