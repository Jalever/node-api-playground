import puppeteer from 'puppeteer'
import fs from 'node:fs/promises'

const TARGET_URL = 'https://login.bce.baidu.com/'
const BAIDU_FILE_TARGET_PATH = ''
const TARGET_BUCKET_NAME = ''
const USERNAME = ''
const PASSWORD = ''
const USER_AGENT = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36`

let count = 0

const sleep = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
const exists = async (page, selector) =>
  await page.$eval(selector, () => true).catch(() => false)

const getCurrentTime = async () => {
  const curDate = new Date()
  const year = `${curDate.getFullYear()}`.padStart(2, '0')
  const month = `${curDate.getMonth() * 1 + 1}`.padStart(2, '0')
  const day = `${curDate.getDate()}`.padStart(2, '0')
  let hour = `${curDate.getHours()}`.padStart(2, '0')
  let minute = `${curDate.getMinutes()}`.padStart(2, '0')
  let second = `${curDate.getSeconds()}`.padStart(2, '0')
  return `${year}${month}${month}-${hour}${minute}${second}`
}

const createFile = async () => {
  try {
    const content = getCurrentTime()
    await fs.writeFile('./upload-file-1.txt', getCurrentTime())
  } catch (err) {
    console.log('err', err)
  }
}

async function initialize() {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--enable-automation'],
  })
  const page = await browser.newPage()
  await page.setUserAgent(USER_AGENT)
  await page.setViewport({ width: 1348, height: 947 })
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false })
  })
  await page.goto(TARGET_URL, {
    waitUntil: 'networkidle2',
  })

  await sleep()
  await page.waitForSelector('.acud-loading-loading-context', { hidden: true })
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await page.waitForSelector('.uc-tab-btn', { visible: true })
  await page.locator('.uc-tab-btn').click()
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  await page.waitForSelector('#uc-common-account', { visible: true })
  await page.type('#uc-common-account', USERNAME, { delay: 1000 })
  await page.waitForSelector('#ucsl-password-edit', { visible: true })
  await page.type('#ucsl-password-edit', PASSWORD, { delay: 1000 })
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  await page.locator('#submit-form').click()
  await page.waitForNavigation()
  await sleep()
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  await page.waitForSelector('.ant-spin-spinning', { hidden: true })
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await page.goto(BAIDU_FILE_TARGET_PATH)
  await sleep()
  await page.evaluate(() => {
    localStorage.setItem('firstLogin', 'bos')
  })
  await page.goto(BAIDU_FILE_TARGET_PATH)
  await page.evaluate(() => {
    localStorage.setItem('firstLogin', 'bos')
  })
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await page.goto(BAIDU_FILE_TARGET_PATH)
  await sleep()
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  await sleep()
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  await sleep()
  const overlayExist = await exists(page, '.driver-overlay')
  if (overlayExist) await page.locator('.driver-overlay').click()

  // await page.waitForNavigation()
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await sleep()
  await page.waitForSelector('.s-table-cell-text', { visible: true })
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  const upladButtonExist = await exists(page, 'text/上传文件')
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  if (upladButtonExist) await page.locator('text/上传文件').click()
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await sleep()
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  await page.waitForSelector('.san-module-upload__upload', {
    visible: true,
  })
  await sleep(2000)
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  const fileContent = await getCurrentTime()
  await fs.writeFile('./upload-file-1.txt', fileContent)

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('.san-module-upload__upload'),
  ])
  await fileChooser.accept(['./upload-file-1.txt'])
  await sleep()
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  // 下一步
  await page.waitForSelector('text/下一步', {
    visible: true,
  })
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await page.locator('text/下一步').click()
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await sleep()
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  // 公共读
  await page.waitForSelector('text/公共读', {
    visible: true,
  })
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await page.locator('text/公共读').click()
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await sleep(2000)
  await page.screenshot({ path: './screenshot.png', fullPage: true })

  // 开始上传
  await page.waitForSelector('text/开始上传', {
    visible: true,
  })
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await sleep()
  await page.locator('text/开始上传').click()
  await sleep(2000)
  await page.screenshot({ path: './screenshot.png', fullPage: true })
  await sleep()
  await browser.close()
}

initialize()
