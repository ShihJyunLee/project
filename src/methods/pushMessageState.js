// 文字回饋

import emitter from '@/methods/emitter'

export default function (response, title = '更新') { // 兩個參數前者為api回傳資訊，後者為title預設值
  if (response.data.success) {
    emitter.emit('push-message', { // push-message為emitter事件自訂名稱，後者為事件傳送的函示，會有emitter.on監控接收
      style: 'success',
      title: `${title}成功`// 預設更新，但可以帶入參數，例如優惠眷
    })
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式(陣列)
    const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、')// 將陣列中的字串元素用 '、' 連接在一起，形成一個字串。
    })
  }
}
