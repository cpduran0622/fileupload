
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<head>
	<title>File Upload</title>
	<?php include 'link.php' ?>	
	<link href="css//jquery.dm-uploader.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/toastr.css">
	<link rel="stylesheet" type="text/css" href="css/upload.css">
</head>
<body>
	<div class="main-page">
		<form  id="fileupload" action="" method="POST" enctype="multipart/form-data">
			<div class="container input-field">
				<div class="drag-file">
					<div class="row">
						<div class="col-sm-12">
							<!-- Our markup, the important part here! -->
							<div id="drag-and-drop-zone" class="dm-uploader p-5">
								<div style="text-align:center;">
									<div>
										<h4 class="mb-5 mt-5 text-muted">Drop here files you want upload ..</h4>
									</div><br>
									<div class='select-button-field'>								
										<div class="btn btn-block mb-5">
											<span>Browse Files</span>
											<input type="file" title='Click to add Files' name='uploaded_file' />
										</div>	
									</div>
								</div>
								
							</div>
							
						</div>
						<div class="card h-100">
								<ul class="list-unstyled p-2 d-flex flex-column col" id="files">
									<li class="text-muted text-center empty">No files uploaded.</li>
								</ul>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
	<script src="js/vendor/jquery/jquery-3.2.1.min.js"></script>
	<script src="js/vendor/bootstrap/js/popper.js"></script>
	<script src="js/vendor/bootstrap/js/bootstrap.min.js"></script>
	<script src="js/toastr.js"></script>
	<script src="js/jquery.dm-uploader.min.js"></script>
    <script src="js/demo-ui.js"></script>
    <script src="js/demo-config.js"></script>
	<script type="text/html" id="files-template">
      <li class="media">
        <div class="media-body mb-1">
          <p class="mb-2">
            <strong>%%filename%%  </strong> 
          </p>
          <div class="progress mb-2">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
              role="progressbar"
              style="width: 0%" 
              aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
		  <div class="uploading_status">
		     <strong> %%filesize%% KB </strong> - Status: <span class="text-muted">Waiting</span>
		  </div>	  
          <hr class="mt-1 mb-1" />
        </div>
      </li>
    </script>
</body>
</html>