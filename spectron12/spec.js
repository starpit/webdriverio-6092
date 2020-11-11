const Application = require('spectron').Application
const electronPath = require('electron')
const { strictEqual } = require('assert')

describe('Spectron 12', function () {
	this.timeout(20000)

	beforeEach(function () {
		this.app = new Application({
		  path: electronPath,
		  args: ['.'],
                  waitTimeout: 5000,
                  chromeDriverLogPath: '/tmp/cd.log',
                  webdriverLogPath: '/tmp'
		})
		return this.app.start()
	})

	afterEach(function () {
		if (this.app && this.app.isRunning()) {
			return this.app.stop()
		}
	})

	it('shows an initial window', async function () {
		console.log(await this.app.client.getTitle());
	})

  it('successfully finds an existing element', async function () {
    const element = await this.app.client.$('.there')
    await element.waitForExist()
  })

  it('successfully fails to find a non-existing element via $$', async function () {
    console.log('A1')
    const elements = await this.app.client.$$('.not-there')
    console.log('A2', elements.length)
    strictEqual(elements.length, 0)
    console.log('A3')
  })

  it('successfully fails to find a non-existing element via $', async function () {
    console.log('B1')
    const element = await this.app.client.$('.not-there')
    console.log('B2', element)
    await element.waitForExist({ reverse: true })
    console.log('B3')
  })
})
