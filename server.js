const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const date = require(__dirname + "/date.js");

let posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("createPost", { userPost: posts });
});

app.post("/", function (req, res) {
  const newPostText = req.body.newPost;
  const newPost = { text: newPostText, timestamp: date.getFormattedDate() };
  posts.push(newPost);
  res.redirect("/");
});

app.post("/delete/:index", function (req, res) {
  const index = req.params.index;
  posts.splice(index, 1); // Remove the post at the specified index
  res.redirect("/");
});

// app.post("/update/:index", function (req, res) {
//   const index = req.params.index;
//   const updatedText = req.body.newPost; // This should match the name of the textarea
//   posts[index].text = updatedText; // Update the post text
//   res.redirect("/");
// });

app.post("/update/:index", function (req, res) {
  const index = req.params.index;
  const updatedText = req.body.newPost; // This should match the name of the textarea
  posts[index].text = updatedText; // Update the post text
  res.redirect("/"); // Redirect back to the home page
});
// app.get("/edit/:index", function (req, res) {
//   const index = req.params.index;
//   res.render("editPost", { post: posts[index], index: index });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
