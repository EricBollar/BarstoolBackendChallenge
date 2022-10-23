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
    describe('create-note', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser();
      })

      it('should create a note', async () => {
        // create note data
        const title = "CREATED TITLE";
        const message = "CREATED MESSAGE";
        const body = Object.assign({
            title: title,
            message: message,
            owner: globalAuth.user
        })
        
        // make call to create note
        const noteId = await agent
            .client()
            .post(`/note`)
            .send(body)
            .expect(200)
            .promise()

        // make call to get note from id
        const note = await agent
            .client()
            .get(`/note/${noteId.id}`)
            .expect(200)
            .promise()
        
        // check that the db data equals assigned data
        should.equal(note.title, body.title);
        should.equal(note.message, body.message);
        should.equal(note.owner, body.owner);
      })
    })
  })
})
