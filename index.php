<!DOCTYPE html>
<html>
<head>
<title>JS Test</title>

<script src="js/jsoj.js"></script>

<style>
  #slider {
  margin:0px auto;
  padding:0px;
  width:400px;
  border:1px solid #000;
  background:#0f0;   
  height:20px;
  overflow:hidden;
  }
</style>



</head>
<body>
<h1 class="h" id="h"> Toggle Slide </h1>
  <input type="button" id="slide" value ="Slide Down "/>
  <span id="log" style="position:absolute; left:10px; top:150px;"></span>
  <br />

  <div id="slider">
     content goes here
  </div>



<script>
    $('#slide').on('click',function(){
        $("#slider").toggleSlide(1000)
    })

    //$('#h').fadeIn(1000);
    $('#h').css('color','red');

</script>


</body>
</html>
