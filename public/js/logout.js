$("#signOut").on("click", function (e) {
  e.preventDefault();

  console.log("Preforming submit");

  if (parse.User.current()) {
    parse.user.logOut();

    if (parse.user.current()) console.log("Failed to log out!");
  }
});
