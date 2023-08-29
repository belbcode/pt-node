import { createHash } from "crypto"
import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync } from "fs"
import { Stats } from "fs"
import { join, resolve } from "path"

function getTrackedFiles(targetDirectory: string, fileType : string[] | undefined) {
    const allFiles = readdirSync(targetDirectory, { //  .../cwd
        withFileTypes: true                                 //      |   f1.txt,
    })                                                      //      |   f2.png,
    const filesToBeTracked = allFiles.filter(file => {      //      |   etc...
        if (fileType) {
            for (const fileExt of fileType) {
                if (file.name.endsWith(fileExt)) return true //track specified files
                return false //ignore non-specified files
            }
        }
        if (!file.isFile()) return false //ignore directories, but maybe in future recursively track files
    })
    return filesToBeTracked


}

const initialValue = "" //established the initial hash to base all future change commits off of

export class Config {
    constructor(targetDirectory: string, fileType: string[] | undefined) {

        const repoDirectory = resolve(targetDirectory, "/.pt")

        this.Init = new Date()
        this.Directory = targetDirectory, // the cwd
        this.RepoDirectory = repoDirectory //*/.pt
        this.MonitoredFiles = (() => {
            const trackedFiles = getTrackedFiles(targetDirectory, fileType)
            const hashedKeys = trackedFiles.map(file => {
                return sha1String(file.name)
            })
            const FileMap = new Map<string, MonitoredFile>()
            hashedKeys.forEach(async (key, index) => {
                await FileMap.set(key, CreateMonitoredFile(trackedFiles[index].name, targetDirectory, repoDirectory, key))
            })
            return FileMap
        })()
    }

    static FromJSONConfig(targetDirectory: string) : Config {
        const config = Config.prototype
        const fileBuffer = readFileSync(resolve(targetDirectory, "./pt"))
        try {
            const jsonConfig : JSONConfig = JSON.parse(fileBuffer.toString())
            config.Directory = jsonConfig.Directory
            config.Init = jsonConfig.Init
            config.MonitoredFiles = createMapFromObject(jsonConfig.MonitoredFiles)
            config.RepoDirectory = jsonConfig.RepoDirectory
        }
        catch(err) {
            console.error("Config file may have been corrupted.", err)
        }
        return config

        


    }

    toJSON(): JSONConfig {
        const monitoredFiles = Object.fromEntries(this.MonitoredFiles)
        return {
            Init: this.Init,
            Directory: this.Directory,
            MonitoredFiles: { ...monitoredFiles },
            RepoDirectory: this.RepoDirectory,
        }

    }

    writeConfigLocal() {
        const repoPath = resolve(this.Directory, this.RepoDirectory)
        if (repoPath === this.RepoDirectory) {
            throw Error("Config not scaffolded yet.")
        }
        writeFileSync(join(repoPath, "pt.config.json"), JSON.stringify(this.toJSON()))
    }

    scaffold () {
        
        const repoPath = join(this.Directory, this.RepoDirectory)
        mkdirSync(repoPath)
        writeFileSync(join(repoPath, "pt.config.json"), JSON.stringify(this.toJSON()))

        


        this.MonitoredFiles.forEach((element, key) => {
            // mkdir(join(this.Directory, element.Repository), { mode: 0o700 }, (err: NodeJS.ErrnoException | null, path?: string | undefined) => {
            //     console.error(err)
            //     if (err) {
            //         throw Error(err.message)
            //     }
            //     if (!path) {
            //         throw Error("Path not generated critical error.")
            //     }

            //     writeFileSync(join(path, element.LastHash), initialValue)
            // })
            //this can be faster async
            const path = join(this.Directory, element.Repository)
            mkdirSync(path)
            writeFileSync(join(path, element.LastHash), initialValue)

        })
        console.log("afterFact",resolve(this.Directory, "/.pt"))
        console.log(this.Directory, "/.pt")



        // mkdir(repoPath, { mode: 0o700 }, (err: NodeJS.ErrnoException | null, path?: string | undefined) => {
        //     if (err) {
        //         throw Error(err.message)
        //     }
        //     if (!path) {
        //         throw Error("Path not generated critical error.")
        //     }
        //     writeFileSync(join(path, "pt.config.json"), JSON.stringify(this.toJSON()))

        // })

    }

}

function sha1String(str: string) {
    const hash = createHash('sha1');
    hash.update(str);
    return hash.digest('hex');
}
function sha1UInt8(bytes: Uint8Array): string {
    const hash = createHash('sha1');
    hash.update(bytes)
    return hash.digest('hex')

}

function CreateMonitoredFile(fileName: string, ParentDirectory: string, RepoDirectory: string, hashedName: string): MonitoredFile {
    const filePath = resolve(ParentDirectory, fileName)
    return {
        Location: filePath,
        LastHash: sha1String(initialValue),
        Repository: resolve(RepoDirectory, hashedName),
        ...statSync(filePath)

    }
}

function createMapFromObject<T>(obj: { [key: string]: T }): Map<string, T> {
    const map = new Map<string, T>();
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        map.set(key, obj[key]);
      }
    }
  
    return map;
  }


export interface Config {
    Init: Date
    Directory: string
    MonitoredFiles: Map<string, MonitoredFile>
    RepoDirectory: string
}


export interface MonitoredFile extends Stats {
    Location: string
    Repository: string
    LastHash: string
}
type DynamicObject = {
    [key: string]: MonitoredFile;
  };

type JSONConfig = {
    Init: Date
    Directory: string
    MonitoredFiles: DynamicObject
    RepoDirectory: string

}