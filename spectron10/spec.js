const Application = require('spectron').Application
const electronPath = require('electron')

describe('Spectron 10', function () {
	this.timeout(10000)

	beforeEach(function () {
		this.app = new Application({
			path: electronPath,
			args: ['.']
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
    await this.app.client.waitForExist('.there')
  })

  it('successfully fails to find a non-existing element', async function () {
    await this.app.client.waitForExist('.not-there', 5000, true)
  })
})
