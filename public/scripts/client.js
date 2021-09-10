/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const createTweetElement = (tweet) => {
     //create the structure of tweet to be included in the html
    const date = timeago.format(new Date(tweet.created_at)); // converting the numbers in to date format
    const $tweet = `<article class="article-container">
   <header class="article-header">
     <div class="article-header-subcontainer">
       <img class="article-logo" src=${tweet.user.avatars}></img>
       <div class="article-name">${tweet.user.name}</div>
     </div>
     <label class="article-sidename">${tweet.user.handle}</label>
   </header>
   <div class="article-paragraph">${tweet.content.text}</div>  
   <footer class="article-footer">
     <p class="footer-text ">${date}</p>
     <div class=footer-right>
       <div class="footer-icon"> <i class="fas fa-flag"></i></div>
       <div class="footer-icon"><i class="fas fa-random"></i></div>
       <div class="footer-icon"><i class="fas fa-heart"></i></div>
     </div>
   </footer>      
 </article>`;
    return $tweet;
  };

  const renderTweets = (tweets) => {
    const container = $(".tweets");
      //clear the container before to read all tweets
    container.empty();
    for (const element of tweets) {
    // tweets in reverse-order (that is, by creation time descending)
      container.prepend(createTweetElement(element));
    }
  };

 
  //event listener to submit button
  $(".form").submit(function (e) {
    e.preventDefault();
    const textValue = $("#tweet-text").val();
    if (textValue === "" || textValue === null) {
      return $(".error-msgs").text("Post cannot be empty!").slideDown().show();
    } else if (textValue.length > 140) {
      return $(".error-msgs")
        .text("Post cannot exceed over 140 character limit!")
        .slideDown()
        .show();
    } else {
       //validations are ok, tweet will be send, and show in the area for tweets
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: (data) => {
          // emp
          $("#tweet-text").val(""); //empty the textarea or refreshing            
          $(".error-msgs").hide();  //hidden the message if it is shown
          loadTweets(); // Instantly Loads Tweet To Page
        },
        error: (err) => {
          console.log(`errro: ${err}`);
        },
      });
    }
  });
  //function that load tweets from data
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (data) => {
        console.log("data", data);

        renderTweets(data);
      },
      error: (err) => {
        console.log(`errro: ${err}`);
      },
    });
  };

  loadTweets();
});
