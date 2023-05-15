import * as child_process from 'node:child_process'
import * as fs from 'node:fs'
import * as semver from 'semver'
import { Directories } from '../../platform/directores'

type PackageInfo = {
    version: string
}

void async function main() {
    const packageInfo: PackageInfo = JSON.parse(child_process.execSync('pnpm info --json @alshdavid/kit').toString())
    const localPackageInfo: PackageInfo = JSON.parse(fs.readFileSync(Directories['~/']('package.json'), { encoding: 'utf-8' }))

    if (!semver.gt(localPackageInfo.version, packageInfo.version)) {
        console.log('Skipping Publish')
        return
    }

    console.log('Publish')
    child_process.execSync('pnpm publish --access public --no-git-checks', {
        stdio: 'inherit',
        cwd: Directories['~'],
    })
}()
