export default (app): any => {
  const { INTEGER, TEXT, BIGINT } = app.Sequelize

  const detail = app.model.define('detail', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    cid: { type: TEXT },
    title: { type: TEXT },
    description: { type: TEXT },
    thumbnail_url: { type: TEXT },
    qiniu_img_url: { type: TEXT },
    echarts_version: { type: TEXT },
    code: { type: TEXT },
    html: { type: TEXT },
    external_scripts: { type: TEXT },
    star_count: { type: TEXT },
    comment_count: { type: TEXT },
    custom_tags: { type: TEXT },
    builtin_tags: { type: TEXT },
    theme: { type: TEXT },
    layout: { type: TEXT },
    view_count: { type: TEXT },
    version: { type: BIGINT },
    parent_version: { type: BIGINT },
    published_version: { type: BIGINT },
    last_update_time: { type: BIGINT },
  }, {
    timestamps: false,
    raw: false,
  })

  return detail
}
