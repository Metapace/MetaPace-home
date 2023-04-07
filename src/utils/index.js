export function getImgUrl(path) {
  return new URL(path, import.meta.url).href
}

export function runPngAnimation(ele, url, speed = 0, step = 0) {
  if (!ele) return
  let i = 1
  let timer = setInterval(() => {
    i += 1
    if (i >= step + 1) i = 1
    ele.src = getImgUrl(`${url}${i}.png`)
  }, (speed * 1000) / step)
  return timer
}
