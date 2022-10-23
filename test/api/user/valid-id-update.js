let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('valid-id-update', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should update only when user id = url id', async () => {
        // get the current user
        const prevUser = await agent
            .client()
            .get(`/user/${globalAuth.user}`)
            .set('authorization', globalAuth.token)
            .expect(200)
            .promise()
        should.exist(prevUser)

        // create a new user
        let body = {
            email: `${mockData.uuid()}@test.com`,
            password: mockData.uuid(),
            firstName: mockData.uuid(),
            lastName: mockData.uuid()
        }
        const { auth, user } = await agent.client().post('/auth/register').send(body).expect(201).promise()
        should.exist(auth)
        should.exist(user)

        // try to update prevUser while logged in as newUser
        body = {
            email: `${mockData.uuid()}@test.com`,
            password: mockData.uuid(),
            firstName: mockData.uuid(),
            lastName: mockData.uuid()
        }
        await agent.client()
            .put(`/user/${prevUser.id}`)
            .set('authorization', auth.token)
            .send(body)
            .expect(403)
            .promise();
      })
    })
  })
})
