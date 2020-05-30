'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Comments API end-points`, () => {
  it(`should be 200 on GET /api/articles/AN3080/comments`, async () => {
    const res = await request(app)
      .get(`/api/articles/AN3080/comments`);

    expect(res.status).toBe(200);
  });

  it(`should be 201 on POST /api/articles/AN3080/comments`, async () => {
    const res = await request(app)
      .post(`/api/articles/AN3080/comments`)
      .set(`Content-Type`, `application/json`)
      .send({
        id: `test-comment`,
        text: `Тест создания статьи`,
      });

    expect(res.status).toBe(201);
  });

  it(`should be 200 on GET /api/articles/AN3080/comments/test-comment`, async () => {
    const res = await request(app)
      .get(`/api/articles/AN3080/comments/test-comment`);

    expect(res.status).toBe(200);
  });

  it(`should be 200 on DELETE /api/articles/AN3080/comments/test-comment`, async () => {
    const res = await request(app)
      .delete(`/api/articles/AN3080/comments/test-comment`);

    expect(res.status).toBe(200);
  });
});

describe(`Comments API end-points negative`, () => {
  it(`should be 404 on GET /api/articles/not-existed-article/comments`, async () => {
    const res = await request(app)
      .get(`/api/articles/not-existed-article/comments`);

    expect(res.status).toBe(404);
  });

  it(`should be 400 on POST /api/articles/AN3080/comments`, async () => {
    const res = await request(app)
      .post(`/api/articles/AN3080/comments`)
      .set(`Content-Type`, `application/json`)
      .send({
        wrongName: `Тест создания комметария`,
      });

    expect(res.status).toBe(400);
  });

  it(`should be 400 on POST /api/articles/not-existed-article/comments`, async () => {
    const res = await request(app)
      .post(`/api/articles/not-existed-article/comments`)
      .set(`Content-Type`, `application/json`)
      .send({
        wrongName: `Тест создания комментария`,
      });

    expect(res.status).toBe(400);
  });

  it(`should be 404 on GET /api/articles/not-existed-article/comments/test-comment`, async () => {
    const res = await request(app)
      .get(`/api/articles/not-existed-article/comments/test-comment`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on GET /api/articles/AN3080/comments/not-existed-comment`, async () => {
    const res = await request(app)
      .get(`/api/articles/AN3080/comments/not-existed-comment`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on DELETE /api/articles/not-existed-article/comments/test-comment`, async () => {
    const res = await request(app)
      .delete(`/api/articles/not-existed-article/comments/test-comment`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on DELETE /api/articles/AN3080/comments/not-existed-comment`, async () => {
    const res = await request(app)
      .delete(`/api/articles/AN3080/comments/not-existed-comment`);

    expect(res.status).toBe(404);
  });
});
