# bihongo-js

a javascript library (experimental)

## How to use
link jsoj.js to your project. And also link material.css

## Usage

```
//text editor
j("#text").beditor(".editor-container");
```

```
//data binding set
setModel("element_id", "other elemenet_id");
```

```
//for helper
// toggle password view on input element
j("#show").on("click", function () {
    j("#pass").showPass();
});
```

```
//show image from local image upload
j("#profile_input").on("change", function () {
    j("#profile_input").imageSet(j("#profile_img"));
});
```

```
//for ajax request
j("#ld").on("click", function () {
http.ajax({
    method: "POST",
    url: "data.json",
    dataType: "json",
    success: function (data) {
    j("#cont").element.innerHTML = data[0].name;
    },
});
});
```

```
//for css
j("#h").css("color", "red");

```
