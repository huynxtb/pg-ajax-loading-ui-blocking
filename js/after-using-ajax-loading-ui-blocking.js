let total = 1;
let counter = 0;

// Handle each reuqest send
$(document)
  .ajaxSend(function (event, xhr, options) {
    counter++;

    if (getUrlParam("noBlockUI", options.url) === "true") {
      console.log("None Block UI: " + options.url); // https://jsonplaceholder.typicode.com/posts?noBlockUI=true
      return;
    }

    //set loading and block ui
    if (counter > 0) {
      $("#loading").show();
      $("#overlay").show();
    }
  })
  .ajaxComplete(function (event, xhr, options) {
    counter--;
    // unset loading and block ui
    if (counter <= 0) {
      $("#loading").hide();
      $("#overlay").hide();
    }
  });

let getUrlParam = function (name, url) {
  let results = new RegExp("[?&]" + name + "=([^&#]*)").exec(url);

  if (results == null) {
    return null;
  }
  return decodeURI(results[1]) || 0;
};

let getMore = function () {
  $("#btn-get-more").on("click", function () {
    $(".toDoList").empty();
    total += 1;
    getList(total);
  });
};

let getList = function (total) {
  $.ajax({
    cache: false,
    type: "GET",
    url: "https://jsonplaceholder.typicode.com/posts",
    success: function (data) {
      for (let i = 0; i < total; i++) {
        $(".toDoList").append("<li>" + data[i].title + "</li>");
      }
    },
    error: function (data) {},
  });
};

let getListNoneBlock = function () {
  $.ajax({
    cache: false,
    type: "POST",
    url: "https://jsonplaceholder.typicode.com/posts?noBlockUI=true",
    success: function (data) {
      console.log(data);
    },
    error: function (data) {},
  });
};

// Main function
$(function () {
  getList(total);
  getMore();
  getListNoneBlock();
});