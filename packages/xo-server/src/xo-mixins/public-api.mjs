export default class PublicApi {
  constructor(app, { express }) {
    express.get('/api/public/v1/')
  }
}
