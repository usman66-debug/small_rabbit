import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        //el 为绑定的标签
        //binding  binding.value为指令等号后面的值
        console.log(el, binding.value);
        const { stop } = useIntersectionObserver(el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting);
            if (isIntersecting) {
              el.src = binding.value
              stop()
            }
          }
        )
      }
    })

  }
}
