const { watch } = require('fs/promises')
const { join } = require('path')

const ac = new AbortController()
const { signal } = ac
setTimeout(function () {
  ac.abort()
}, 10 * 1000)

async function watchFile(target = '') {
  const filepath = join(__dirname, target)
  try {
    const watcher = watch(filepath, { signal })
    for await (const event of watcher) {
      console.log(`${target} file changed, event: `, event)
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log(`time out.`)
      return
    }
    throw error
  }
}

watchFile('/sample.txt')
