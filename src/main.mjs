import puppeteer from 'puppeteer'

const TARGET_URL = 'https://login.bce.baidu.com/'
const USERNAME = 'huohuotu2022'
const PASSWORD = 'Hht@2023..'
let count = 0
async function initialize() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  console.log('The TARGET_URL of this page is "%s".', TARGET_URL)
  await page.goto(TARGET_URL)
  console.log('step - ', count++)
  await page.setViewport({ width: 1080, height: 1024 })
  console.log('step - ', count++)
  const content = await page.content()
  await page.locator('#uc-tab-btn').click()
  console.log('step - ', count++)
  await page.locator('#uc-common-account').fill(USERNAME)
  console.log('step - ', count++)
  await page.locator('#ucsl-password-edit').fill(PASSWORD)
  console.log('step - ', count++)
  await page.locator('#submit-form').click()
  console.log('step - ', count++)
  const textSelector = await page.locator('text/对象存储').waitHandle().click()
  console.log('step - ', count++)
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent)
  // console.log('The title of this blog post is "%s".', fullTitle)
  await browser.close()
}

initialize()
