$(document).ready(function () {
  // --- our code goes here ---
  console.log("JQuery is ready");
  const maxLength = 140;
  $("#tweet-text").on("keyup", function () {
    const textLength = this.value.length;   
    const counterValue = maxLength - textLength;
    const counter = $("#tweet-text,.counter").text(counterValue);
    if (counterValue < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});
