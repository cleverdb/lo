
let _apis = {
  "Goods_getCourse": '/rest/s1/Goods/course/getCourse',
  "private_Courses": '/privateCourses',
  "private_Buy": '/privateBuy',
  "private_Buy_sel_teachers": '/privateBuy2',
  "card_getCard": "/rest/s1/Goods/card/getCard",
  "card_getCardDetail": (id) => `/rest/s1/Goods/card/getCardDetail?cardId=${id}`,
  "card_sales": (id) => "/sales"

}
module.exports = {
  _apis
}