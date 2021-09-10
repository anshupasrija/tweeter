$(document).ready(function () {
  // --- our code goes here ---
  console.log("JQuery is ready");
  const maxLength = 140;
  $("#tweet-text").on("keyup", function () {
    const textLength = this.value.length;
    console.log("textLength",textLength);
    const counterValue = maxLength - textLength;
    const counter = $("#tweet-text,.counter").text(counterValue);
    if (counterValue < 0) {
      console.log("i am in ");
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});
