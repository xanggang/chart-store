import cache from 'memory-cache'
const Cache = Symbol('Application#cache');


export default {
  get cache() {
    if (!this[Cache]) {
      this[Cache] = cache
    }
    return this[Cache];
  },
}
