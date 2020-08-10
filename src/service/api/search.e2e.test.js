'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Search API end-points`, () => {
  it(`should be 200 on GET /api/search?query=`, async () => {
    const res = await request(app)
      .get(`/api/search?query=`);

    expect(res.status).toBe(200);
  });

  it(`should be 200 on GET /api/search?query=начать`, async () => {
    const res = await request(app)
      .get(`/api/search?query=${encodeURI(`начать`)}`);

    expect(res.status).toBe(200);
  });
});

describe(`Search API end-points negative`, () => {
  it(`should be 400 on GET /api/search`, async () => {
    const res = await request(app)
      .get(`/api/search`);

    expect(res.status).toBe(400);
  });

  it(`should be 400 on GET /api/search?q=начать`, async () => {
    const res = await request(app)
      .get(`/api/search?q=${encodeURI(`начать`)}`);

    expect(res.status).toBe(400);
  });
});
