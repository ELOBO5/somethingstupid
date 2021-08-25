describe("endpoints", () => {
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

  it("/GET /posts should return a list of all posts in database", async () => {
    const res = await request(api).get("/posts");
    expect(res.statusCode).toEqual(200);
    expect(res.body.posts.length).toEqual(3);
  });

  it("/GET /posts/:query should return a list of all posts containing query as substring", async () => {
    const res = await request(api).get("/posts/third");
    expect(res.statusCode).toEqual(200);
    expect(res.body.posts.length).toEqual(1);
  });

  it("/GET /posts/:query should return a list of all posts containing query as substring", async () => {
    const res = await request(api).get("/posts/fourth");
    expect(res.statusCode).toEqual(200);
    expect(res.body.posts.length).toEqual(0);
  });

  it("/POST /posts should add a post to the database and return 201", async () => {
    const testData = {
      title: 'Title 5',
      name: 'User 5',
      message: 'fifth'
    }

    await request(api).post("/posts")
      .send(testData)
      .expect(201)
  });

});
