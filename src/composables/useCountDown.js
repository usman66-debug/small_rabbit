import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  const time = ref(0)
  let timer = null
  //通过dayjs插件格式化时间,使用unix方法识别秒数，不然会默认识别为毫秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  //传入起始时间，给time赋初值，每秒减一
  const start = (startTime) => {
    if (timer) clearInterval(timer)
    time.value = startTime
    timer = setInterval(() => {
      if (time.value <= 0) {
        clearInterval(timer)
      } else {
        time.value--
      }
    }, 1000)
  }

  //!!!!!!!!!!
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}
