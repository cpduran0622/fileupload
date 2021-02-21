$(function(){
 
  // var file_id=null
  //main logic
  var multi_id=null;
  $('#drag-and-drop-zone').dmUploader({ //
    url: 'server/php/upload.php',
    method:'POST',
    extraData: function() {
      return {
        'file-category':$('.file-category').val(),
        'ispublic':$('.download-check').is(":checked"),
        'file-note':$('.file-note').val(),
        'isprivate':$('.private-check').is(":checked")
      };
   },
    maxFileSize: 2097152000, // 3 GIG max
    auto: true,
    queue: false,
    multiple: true,
    onDragEnter: function(){
      // Happens when dragging something over the DnD area
      this.addClass('active');
    },
    onDragLeave: function(){
      // Happens when dragging something OUT of the DnD area
      this.removeClass('active');
    },
    onInit: function(){
      // Plugin is ready to use
      ui_add_log_1('Penguin initialized :)', 'info');
    },
    onComplete: function(){
      // All files in the queue are processed (success or error)
      ui_add_log_1('All pending tranfers finished');
    },
    
    onNewFile: function(id, file){      
      $('.h-100').show();
      // ui_add_log_1('New file added #' + id);
      ui_multi_add_file(id, file);
    },
    onBeforeUpload: function(id){
      // about tho start uploading a file
      ui_add_log_1('Starting the upload of #' + id);
      ui_multi_update_file_status(id, 'uploading', 'Uploading...');
      ui_multi_update_file_progress(id, 0, '', true);
    },
    onUploadProgress: function(id, percent){
      // Updating file progress
      ui_multi_update_file_progress(id, percent);
    },
    onUploadSuccess: function(id, data){
      ui_add_log_1('Server Response for file #' + id + ': ' + JSON.stringify(data));
      ui_add_log_1('Upload of file #' + id + ' COMPLETED', 'success');
      var uploadstatus = 'Upload Complete';
      var upload_active = 'success';
      var value_progress = 100;
      var status_progress = 'success';
      if(data == 'typeerror'){
        uploadstatus = 'This file are not allowed.';
        upload_active = 'danger';
        value_progress = 0;
        status_progress = 'danger';
      }else if(data == 'sizeerror'){
        uploadstatus = 'This file is bigger and can not be uploaded!';
        upload_active = 'danger';
        value_progress = 0;
        status_progress = 'danger';
      }
      ui_multi_update_file_status(id, upload_active, uploadstatus);
      ui_multi_update_file_progress(id, value_progress, status_progress, false);
      var upload_result=multi_upload_success(id);
    
    },
    onFallbackMode: function(){
      // When the browser doesn't support this plugin :(
      ui_add_log_1('Plugin cant be used here, running Fallback callback', 'danger');
    },
    onUploadCanceled: function(id) {
      ui_multi_update_file_status(id, 'warning', 'Canceled by User');
      ui_multi_update_file_progress(id, 0, 'warning', false);
      ui_multi_update_file_controls(id, true, false);
    },
    onUploadError: function(id,xhr, status, message){
      console.log("error xhr", xhr);
      ui_multi_update_file_status(id, 'danger', xhr);
      ui_multi_update_file_progress(id, 0, 'danger', false);  
    },
    // onFallbackMode: function(){
    //   // When the browser doesn't support this plugin :(
    //   ui_add_log_1('Plugin cant be used here, running Fallback callback', 'danger');
    // },
    onFileSizeError: function(file){
      
      ui_add_log_1('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
    }
  });
  function multi_upload_success(id) {
    // alert(id);
    var success_elements = $(".status, .text-success");
    console.log(success_elements.length);
    var isSuccess = true;
    $.each(success_elements, function(key, element) {
      console.log(element.innerText);
      if(element.innerText == "Uploading..."){
        isSuccess = false;
      }
    });
    return isSuccess;
  }

  /*
    Global controls
  */
  $('.download-check').click(function(){
    if($('.private-check').prop("checked") == true){
      showNotification('error', "You can't check both checkbox with Public and Private");
      return false;
    }
  });
  $('.private-check').click(function(){
    if($('.download-check').prop("checked") == true){
      showNotification('error', "You can't check both checkbox with Public and Private");
      return false;
    }
  });
  $('#btnApiStart').on('click', function(evt){
    evt.preventDefault();
    $('#drag-and-drop-zone').dmUploader('start');
  });

  $('#btnApiCancel').on('click', function(evt){
    evt.preventDefault();
    $('#drag-and-drop-zone').dmUploader('cancel');
  });
  /*
  Each File element action
  */
  $('#files').on('click', 'button.start', function(evt){
    evt.preventDefault();

    var id = $(this).closest('li.media').data('file-id');
    $('#drag-and-drop-zone').dmUploader('start', id);
  });

  $('#files').on('click', 'button.cancel', function(evt){
    evt.preventDefault();

    var id = $(this).closest('li.media').data('file-id');
    $('#drag-and-drop-zone').dmUploader('cancel', id);
    $(this).closest('li.media').hide();
  });
  function showNotification(type, msg) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "titleClass":'toast-title',

    };
    if (type == 'success') {
        toastr.success(msg);
    } else {
        toastr.warning(msg);
    }
    
  }
});