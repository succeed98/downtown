/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
$(() => {
  // This GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    console.log("User Id : " + data.id);
    localStorage.setItem("userId", data.id);
  });

  // Fetch search keyword from input field
  const searchForm = $("form#searchForm");

  // On submit the search job
  searchForm.on("submit", event => {
    event.preventDefault();

    //Fetch search value
    const userSearch = $("input#searchInput")
      .val()
      .trim();
    console.log("User Search: " + userSearch);

    //Send the GET request to server to fetch jobs by keyword.
    $.ajax("/api/jobs/" + userSearch, {
      type: "GET",
      userSearch: userSearch
    })
      .then(searchedData => {
        // console.log("Searched successfully!");
        // console.log("Searched Data: " + searchedData);
        $("#jobList").empty();
        $("#jobSearchPageId").html(searchedData);
      })
      .catch(function(error) {
        console.log("got an error " + error);
      });
  });
});
