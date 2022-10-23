let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('notes', () => {
    describe('get-user-notes', () => {
      let globalAuth
      let user

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser();
        user = await mockData.mockNote({user: globalAuth.user});
      })

      it('should get notes', async () => {
        should.exist(user)
        
        // the array of notes attached to user
        should.exist(user.notes[0])

        // the array of notes returned by query
        const findNotes = await agent
            .client()
            .get(`/user/${globalAuth.user}/notes`)
            .set('authorization', globalAuth.token)
            .expect(200)
            .promise()

        // the two should equal
        should.equal(findNotes[0], user.notes[0])
      })
    })
  })
})
