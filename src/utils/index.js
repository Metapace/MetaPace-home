export function runPngAnimation(ele, url, speed = 0, step = 0) {
  if (!ele) return
  let i = 1
  let timer = setInterval(() => {
    i += 1
    if (i >= step + 1) i = 1
    ele.src = getStaticFilePath(`${url}${i}.png`)
  }, (speed * 1000) / step)
  return timer
}

export function getStaticFilePath(path) {
  const modules = import.meta.globEager('/src/assets/**/*.{png,svg,jpg,jpeg,json,webp}', {
    eager: true,
    import: 'default'
  })

  path = path.replace(/.*?(\/assets\/)/, '/src$1')
  return modules[path]
}
