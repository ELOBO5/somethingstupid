describe("post endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  it("should return a list of all posts in database", async () => {
    const res = await request(api).get("/posts");
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body.posts.length).toEqual(3);
  });
});
