
let center = '/rest/s1/Goods';
let _apis = {
  "Goods_getCourse": center + '/course/type',
  "private_Courses": center + '/course/classes',
  "private_Buy": center + '/course/private/experience',
  "private_Buy_sel_teachers": center + '/course/private',
  "card_getCard": "/rest/s1/Goods/card/getCard",
  "card_getCardDetail": (id) => `/rest/s1/Goods/card/getCardDetail?cardId=${id}`,
  "card_sales": (id) => "/sales"

}
module.exports = {
  _apis
}