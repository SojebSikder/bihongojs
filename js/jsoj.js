/*
*Author : Sojeb sikder (sojebsoft)
*/
function $(selector)
{
  const self = {
    element: document.querySelector(selector),
    
    html: ()=> self.element,

    on:(event,callback)=>{
        self.element.addEventListener(event, callback)
    },
    hide:()=>{
        self.element.style.display ="none"
    },
    show: ()=> {
        self.element.style.display = ''
        },
    attr:(name,value)=>{
        if(value == null)
       return self.element.getAttribute(name)
        else
        return self.element.setAttribute(name,value)
    },
//Stylesheet
    color: (value)=> {
        self.element.style.color = value
        },

    background: (value)=> {
        self.element.style.background = value
        },

    css: (name,value)=> {
        var col =":"
        self.element.style = name+col+value
        },
//endStyleSheet

//Effect
    fadeIn: (time)=>{
        var sel = selector.replace('#','')

       var el = document.getElementById(sel);
      // document.getElementById('h').innerHTML =el
        el.style.opacity = 0;
  
        var last = +new Date();
        var tick = function() {
          el.style.opacity = +el.style.opacity + (new Date() - last) / time;
          last = +new Date();
      
          if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
          }
        };
      
        tick();  
    },

    fadeOut: (time)=>{
        var sel = selector.replace('#','')

        el = document.getElementById(sel);
        el.style.opacity = 1;
  
        var last = +new Date();
        var tick = function() {
          el.style.opacity = +el.style.opacity - (new Date() - last) / time;
          last = +new Date();
      
          if (+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
          }
        };
      
        tick(); 
         
    },
    toggleSlide: (time)=>{
        var minheight = 20;
		var maxheight = 300;
		//var time = 1000;
		var timer = null;
		var toggled = false;

		//function toggleSlide(time) {
		    //time = 1000;
		  var controler = document.getElementById('slide');
		  var slider = document.getElementById('slider');
		  slider.style.height = minheight + 'px';
		  controler.onclick = function() {  
		    clearInterval(timer);
		    var instanceheight = parseInt(slider.style.height);
		    var init = (new Date()).getTime();
		    var height = (toggled = !toggled) ? maxheight: minheight; 
		    
		    var disp = height - parseInt(slider.style.height);
		    timer = setInterval(function() {
		      var instance = (new Date()).getTime() - init;
		      if(instance < time ) {
		        var pos = Math.floor(disp * instance / time);
		        result = instanceheight + pos;
		        slider.style.height =  result + 'px';
		        document.getElementById('log').innerHTML = 'Current Height : <b>' + result + '</b><br /> Current Time : <b>' + instance + '</b>';
		      }else {
		        slider.style.height = height + 'px'; //safety side ^^
		        clearInterval(timer);
		        controler.value = toggled ? ' Slide Up ' :' Slide Down ';
		        document.getElementById('log').innerHTML = 'Current Height : <b>' + height + '</b><br /> Current Time : <b>' + time + '</b>';
		      }
		    },1);
		  };
		//};
    }
//End effect


 }
 return self
}




// Example library calls
/*
$('h1').attr('class', 'new-class')


$('h2').hide()



$('h3').on('click', function()
{
  alert("I was clicked")
})
*/

