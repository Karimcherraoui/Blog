const post = require("./posts");

test("Delete Post",  async () => {
  expect(post.deletePost()).toBeTruthy();
});



