export default (app): any => {
  const { INTEGER, TEXT } = app.Sequelize

  const user = app.model.define('list', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    cid: { type: TEXT },
    uid: { type: TEXT },
    title: { type: TEXT },
    description: { type: TEXT },
    thumbnail_url: { type: TEXT }
  }, {
    timestamps: false,
    raw: true,
  })

  return user
}
