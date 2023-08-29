import { expect, test } from '@oclif/test'
import { describe } from 'node:test'
import { tmpdir } from 'node:os';
import { fstat, fstatSync, mkdirSync, readdir, readdirSync, rmdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { create } from 'node:domain';
import { exit } from '@oclif/core/lib/errors';
import { createHash } from 'node:crypto';
import { assert } from 'node:console';


function sha1String(str: string) {
    const hash = createHash('sha1');
    hash.update(str);
    return hash.digest('hex');
}

const fakeProjectDirectory = () : [string, () => void] => {
    const tempDir = join(tmpdir(), 'my_temp_directory');
    mkdirSync(tempDir);
    const fileNameArray: string[] = []
    for (let i = 0; i < 10; i++) {
        const fileName = String(i) + ".txt"
        fileNameArray.push(sha1String(fileName))
        writeFileSync(join(tempDir, fileName), new Uint8Array(8))
    }

    console.log(`Temporary directory created: ${tempDir}`);


    // Clean up the temporary directory when you're done (optional)
    return [tempDir, function cleanup() {
        rmdirSync(tempDir, { recursive: true });
        console.log(`Temporary directory removed: ${tempDir}`);
    }]

}

describe('init:config', () => {
    const [tempDir, cleanup] = fakeProjectDirectory() 

    console.log(`Temporary directory created: ${tempDir}`);


    // Clean up the temporary directory when you're done (optional)
    test
        .command(["init", `${tempDir}`, "-f", ".txt"])
        .stdout()
        .finally(cb => {
            cleanup()
        })
        .it('Initializes a repo at the target directory filtering for text files.', (ctx) => {
            // expect(resolve(tempDir, "/.pt/")).to.equal(join(tempDir,"/.pt"))
            const directoryFiles = readdirSync(resolve(tempDir, "/.pt/"))
            directoryFiles.forEach(file => {
                expect(fileNameArray.includes(file)).to.equal(false)
            })
            // expect(ctx.stdout).to.contain(`Initialized Repo! Tracked files: ${fileNameArray.length} (./src/commands/init/index.ts)`)
        })



})