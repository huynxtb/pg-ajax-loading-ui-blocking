let total = 1;

let getMore = function () {
  $("#btn-get-more").on("click", function () {
    $(".toDoList").empty();
    total += 1;
    getList(total);
  });
};

let getList = function (total) {

  // Begin set loading and block ui
  $("#loading").show();
  $("#overlay").show();

  $.ajax({
    cache: false,
    type: "GET",
    url: "https://jsonplaceholder.typicode.com/posts",
    success: function (data) {

      // unset loading and block ui
      $("#loading").hide();
      $("#overlay").hide();

      for (let i = 0; i < total; i++) {
        $(".toDoList").append("<li>" + data[i].title + "</li>");
      }
    },
    error: function (data) {

      // unset loading and block ui
      $("#loading").hide();
      $("#overlay").hide();

    },
  });
};

// Main function
$(function () {
  getList(total);
  getMore();
});