export default (app): any => {
  const { INTEGER, TEXT } = app.Sequelize

  const user = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    nick: { type: TEXT },
    avatar_url: { type: TEXT },
    mobile: { type: TEXT },
    open_id: { type: TEXT },
    union_id: { type: TEXT },
    state_code: { type: TEXT },
    staff_id: { type: TEXT },
  }, {
    timestamps: true,
    raw: true,
  })

  return user
}
