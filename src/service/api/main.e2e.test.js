'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Main API end-points negative`, () => {
  it(`should be 404 on GET /`, async () => {
    const res = await request(app)
      .get(`/`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on GET /posts`, async () => {
    const res = await request(app)
      .get(`/posts`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on GET /api/`, async () => {
    const res = await request(app)
      .get(`/api/`);

    expect(res.status).toBe(404);
  });
});
