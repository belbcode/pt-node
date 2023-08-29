import { Args, Command, Flags } from "@oclif/core"
import { cwd } from "process"
import { Config } from "../../App/config"


export default class Init extends Command {
    static description = 'Initialize pt repo in your current directory.'

    static examples = [
        `$ pt init
pt Repo created in @/<current-working-directory> (./src/commands/hello/index.ts)
`,
    ]

    static flags = {
        fileType: Flags.string({ char: 'f', description: 'include only file types of specified extension', required: false, multiple: true }),
    }

    static args = {
        targetDirectory: Args.string({ description: 'Absolute path to specified directory', required: false }),
    }

    async run(): Promise<void> {
        const { args, flags } = await this.parse(Init)
        const cd = cwd()
        const config = new Config(args.targetDirectory ? args.targetDirectory : cd, flags.fileType)
        config.scaffold()
        this.log(`Initialized Repo! Tracked files: ${config.MonitoredFiles.size} (./src/commands/init/index.ts)`)
    }
}