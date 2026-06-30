import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        el.style.backgroundColor = '#f5f5f5'
        el.style.objectFit = 'cover'
        el.loading = 'lazy'

        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            el.onload = () => {
              el.style.backgroundColor = ''
            }
            stop()
          }
        })
      }
    })
  }
}
