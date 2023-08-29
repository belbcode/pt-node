import { Args, Command, Flags } from '@oclif/core'
import { Config } from '../../App/config'
import { cwd } from 'process'
import { readFileSync, readdir, readdirSync } from 'fs'
import { basename, resolve } from 'path'
import { Diff, diffChars, createPatch } from 'diff'
import { createHash } from 'crypto'

export default class Commit extends Command {
    static description = 'Say hello'

    static examples = [
        `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
    ]

    static flags = {
        fromDirectory: Flags.string({
            char: 'd',
            name: 'From Directory',
            aliases: ['fd'],
            description: `Allows you to specify a specific directory a repo exists in.
Default is current directory.`,
            required: false,
        }),
    }

    static args = {
        files: Args.string({ description: 'specific files to commit', required: false, multiple: true }),
    }

    async run(): Promise<void> {
        const { args, flags } = await this.parse(Commit)
        const cd = flags.fromDirectory ? flags.fromDirectory : cwd()
        const config = Config.FromJSONConfig(cd)
        const entries = config.MonitoredFiles.entries()
        const messages: string[] = []
        // const commits = []
        // if (args.files) {
        //     for(const file of args.files) {
        //         if ()
        //     }
        // }

        for (const key in entries) {
            const monitoredFile = config.MonitoredFiles.get(key)
            if (monitoredFile) {
                const previousFileContent = readFileSync(resolve(monitoredFile?.Repository, monitoredFile?.LastHash), { encoding: 'utf-8' })
                const currentFileContent = readFileSync(monitoredFile?.Location, { encoding: 'utf-8' }) //getDiff
                if (hashCompare(previousFileContent, currentFileContent)) {
                    messages.push(`The file ${basename(monitoredFile.Location)} has no changes.`)
                    continue
                }
                const diffPatch = createPatch(monitoredFile?.LastHash, previousFileContent, currentFileContent)
                console.log(diffPatch)
            }

        }

        // this.log(`hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`)
    }
}

function updateMonitorFile() {

}

function sha1String(str: string) {
    const hash = createHash('sha1');
    hash.update(str);
    return hash.digest('hex');
}

function hashCompare(a: string, b: string) {
    return sha1String(a) === sha1String(b)
}