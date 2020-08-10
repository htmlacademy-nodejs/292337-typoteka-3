'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Article API end-points`, () => {
  it(`should be 200 on GET /api/articles`, async () => {
    const res = await request(app)
      .get(`/api/articles`);

    expect(res.status).toBe(200);
  });

  it(`should be 201 on POST /api/articles`, async () => {
    const res = await request(app)
      .post(`/api/articles`)
      .set(`Content-Type`, `application/json`)
      .send({
        id: `test-id`,
        title: `Тест создания статьи`,
        createdDate: `2020-05-04 10:08:02`,
        announce: `Тест создания простой статьи.`,
        fullText: `Простая статья. Тест. Создать.`,
        category: [`Тест`],
      });

    expect(res.status).toBe(201);
  });

  it(`should be 200 on GET /api/articles/test-id`, async () => {
    const res = await request(app)
      .get(`/api/articles/test-id`);

    expect(res.status).toBe(200);
  });

  it(`should be 200 on PUT /api/articles/test-id`, async () => {
    const res = await request(app)
      .put(`/api/articles/test-id`)
      .set(`Content-Type`, `application/json`)
      .send({
        title: `Тест обновления статьи`,
        createdDate: `2020-05-04 10:08:02`,
        announce: `Тест обновления простой статьи.`,
        fullText: `Простая статья. Тест. Обновить.`,
        category: [`Тест`, `Тест2`],
      });

    expect(res.status).toBe(200);
  });

  it(`should be 200 on DELETE /api/articles/test-id`, async () => {
    const res = await request(app)
      .delete(`/api/articles/test-id`);

    expect(res.status).toBe(200);
  });
});

describe(`Article API end-points negative`, () => {
  it(`should be 404 on GET /api/articles/all`, async () => {
    const res = await request(app)
      .get(`/api/articles/all`);

    expect(res.status).toBe(404);
  });

  it(`should be 400 on POST /api/articles`, async () => {
    const res = await request(app)
      .post(`/api/articles`)
      .set(`Content-Type`, `application/json`)
      .send({
        wrongName: `Тест создания статьи`,
        createdDate: `2020-05-04 10:08:02`,
        announce: `Тест создания простой статьи.`,
        fullText: `Простая статья. Тест. Создать.`,
        category: [`Тест`],
      });

    expect(res.status).toBe(400);
  });

  it(`should be 404 on GET /api/articles/not-existed-article`, async () => {
    const res = await request(app)
      .get(`/api/articles/not-existed-article`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on PUT /api/articles/not-existed-article`, async () => {
    const res = await request(app)
      .put(`/api/articles/not-existed-article`)
      .set(`Content-Type`, `application/json`)
      .send({
        title: `Тест обновления статьи`,
        createdDate: `2020-05-04 10:08:02`,
        announce: `Тест обновления простой статьи.`,
        fullText: `Простая статья. Тест. Обновить.`,
        category: [`Тест`, `Тест2`],
      });

    expect(res.status).toBe(404);
  });

  it(`should be 400 on PUT /api/articles/not-existed-article`, async () => {
    const res = await request(app)
      .put(`/api/articles/not-existed-article`)
      .set(`Content-Type`, `application/json`)
      .send({
        wrongName: `Тест обновления статьи`,
        createdDate: `2020-05-04 10:08:02`,
        announce: `Тест обновления простой статьи.`,
        fullText: `Простая статья. Тест. Обновить.`,
        category: [`Тест`, `Тест2`],
      });

    expect(res.status).toBe(400);
  });

  it(`should be 404 on DELETE /api/articles/not-existed-article`, async () => {
    const res = await request(app)
      .delete(`/api/articles/not-existed-article`);

    expect(res.status).toBe(404);
  });
});
