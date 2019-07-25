<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Costy | Cost Calculator and Order Wizard</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="all,follow">

  <!-- Favicon -->
  <link rel="shortcut icon" href="img/favicon/favicon-blue.png">
  <link rel="apple-touch-icon" href="img/favicon/apple-touch-icon-blue.png">

  <!-- Google Fonts - Poppins -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700">

  <!-- Detailed CSS Start -->
  <!-- Font Awesome CSS -->
  <!-- <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css"> -->

  <!-- Bootstrap CSS -->
  <!-- <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css"> -->

  <!-- Lightbox -->
  <!-- <link rel="stylesheet" href="vendor/lightbox2/css/lightbox.min.css"> -->

  <!-- Custom Font Icons -->
  <!-- <link rel="stylesheet" href="vendor/icomoon/css/iconfont.min.css"> -->

  <!-- Fancy Checkbox -->
  <!-- <link rel="stylesheet" href="vendor/pure-css-checkbox/pure-css-checkbox.min.css"> -->

  <!-- Template Stylesheets -->
  <!-- <link rel="stylesheet" href="css/main.blue.css"> -->
  <!-- <link rel="stylesheet" href="css/order-1.blue.css"> -->

  <!-- Custom Stylesheet - For Your Changes -->
  <!-- <link rel="stylesheet" href="css/custom.css"> -->
  <!-- Detailed CSS End -->

  <!-- Compressed CSS -->
  <link rel="stylesheet" href="css/styles.order-1.blue.min.css">
  
  <script type="text/javascript">
      function delayedRedirect(){
      window.location = "https://ultimatewebsolutions.net/costy/blue/"
  }
  </script>
  
</head>

<body onLoad="setTimeout('delayedRedirect()', 5000)" style="background-color:#ededed;">
<?php

    $mail = $_POST['email'];
    $to = "websolutions.ultimate@gmail.com"; // Your email goes here
	$subject = "Order from Costy";
	$headers = "From: Costy <noreply@yourdomain.com>";
	$message = "SUMMARY\n";
	$message .= "\nFirst name: " . $_POST['firstname'];
	$message .= "\nLast name: " . $_POST['lastname'];
	$message .= "\nEmail: " . $_POST['email'];
	$message .= "\nPhone: " . $_POST['telephone'] . "\n";
	$message .= "\nORDER\n";
	$message .= "--\n" . $_POST['order'];
	$message .= "\n\nAdditional message:\n" . $_POST['message'];
	$message .= "\nTerms and conditions accepted: " . $_POST['terms'];
												
	//Receive Variable
	$sentOk = mail($to,$subject,$message,$headers);
						
	//Confirmation Page
	$user = "$mail";
	$usersubject = "Thank You for your order";
	$userheaders = "From: info@yourdomain.com\n";
		
	//Confirmation Page With Summary
	$usermessage = "Your order is successfully submitted. Thank you. We will get back to you shortly.\n\n$message";
    mail($user,$usersubject,$usermessage,$userheaders);	
    
?>
<!-- END SEND MAIL SCRIPT -->   

<div id="success">
    <h4>Order sent.</h4>
    <small>Thank you! You will be redirected soon...</small>
    <svg class="svg" x="0px" y="0px" viewBox="0 0 135 110">
        <rect class="box" x="5" y="5" width="100" height="100" transform="rotate(90 55 55)"/>
        <path class="check" d="M126.8,14L55.7,85.1L29.2,63.4"/>
    </svg>     
</div>

</body>
</html>