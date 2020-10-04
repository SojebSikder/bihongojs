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
<h1 class="h" id="h">Toggle Slide </h1>

  <input type="button" id="slide" value ="Slide Down "/>
  <span id="log" style="position:absolute; left:10px; top:150px;"></span>
<br>

  <div id="slider">
    content goes here
  </div>

  <div id="cont">here will go data</div>
  <input id="ld" type="button" value="Load Data">

<br>

<img id="profile_img" class="left-block img-thumbnail" src="">

<br>
  <label class="btn btn-primary" for="profile_input">Browse...</label>
  <input type="file" class="m-hidden" name="photo" id="profile_input"/>


<input id="pass" type="password">
<input id="show" type="button" value="Show">


<nav>
<a href="#/home">Home</a>
<a href="#/about">About</a>
</nav>


<input id="sojeb" type="text">
  <span id="value"></span>

  <input onclick="dot()" type="button" value="click this">

  <div class="editor-container"></div>
  <textarea id="text"></textarea>

<s-view></s-view>

 
<script>

	j('#text').beditor('.editor-container');


//data binding set
setModel('sojeb', 'value');


//frontend framework for single page application
  startSoj(function(){

    var soj = new Soj();
    soj.setHomeUrl ="http://locahost/bihongojs/";

    //routing
    soj.route("/home", {
      templateUrl: "template/index.html",
      controller: "homeController"
    });

    soj.route("/about", {
      templateUrl: "template/about.html",
      controller: "helloController"
    });



  //controller
  soj.controller("homeController", function(){
    //alert("im home Controller");

     this.dot = function(){
      alert("do this");
    }

    

   });

//this.dot();

//soj.exe('dot');

  soj.controller("helloController", function(){
    
    //alert("working");

    var getBlog = [];

    http.ajax({
        method: "GET",
        url: "data.json",
        success: function(res){
          getBlog = res;
        }
    });

    });

    //end controller



  });







    


//for helper
j('#show').on('click', function(){
  j('#pass').showPass();
})




//for image manopulation
j('#profile_input').on('change', function(){
  j('#profile_input').imageSet(j('#profile_img'))
});




//for ajax request
j('#ld').on('click', function(){
  http.ajax({
        method: "POST",
        url: "data.json",
        dataType: "json",
        success: function(data){
          j('#cont').element.innerHTML = data[0].name;
        }
      });

});
    



//for animation, css
j('#slide').on('click',function(){
    j("#slider").toggleSlide(1000)
});
j('#h').fadeIn(1000);
j('#h').css('color','red');



</script>


</body>
</html>
