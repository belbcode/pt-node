import { mkdir, mkdirSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

class FileSystemNode {
    name: string;
    parent: FileSystemNode | undefined

    constructor(name: string) {
        this.name = name;
    }
    removeSelf() {
        if(this.parent instanceof Directory && this.parent != null) {
            this.parent.children.forEach(function(fileSystemNode, index) {
                if (fileSystemNode.name === this.name) {
                    delete this.parent.children[index]
                }
            })
        }
    }
}

class File extends FileSystemNode {
    content: string;

    constructor(name: string, content: string) {
        super(name);
        this.content = content;
    }
}

class Directory extends FileSystemNode {
    children: FileSystemNode[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    addChild(child: FileSystemNode) {
        child.parent = this
        this.children.push(child);
    }
}


const scaffoldDir = (directory: Directory, pathFromRoot: string = tmpdir()) => {
    const dirPath = join(pathFromRoot, directory.name)
    mkdirSync(dirPath)
    for (const fileSystemNode of directory.children) {
        try {
            if (fileSystemNode instanceof Directory) {
                scaffoldDir(fileSystemNode, dirPath)
            }
            if (fileSystemNode instanceof File) {
                writeFileSync(join(dirPath, fileSystemNode.name), fileSystemNode.content)
            }
        } catch (err) {
            console.error(`Failed to write file/directory: ${fileSystemNode.name}, removing from structure.`, err)
            fileSystemNode.removeSelf()
            continue
        }

    }
}

const generateRandomAlphaNumericString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

const generateDirStructure = (max: number, depth: number) => {
    //easy way to 
    const sizeGenerator = (max) => Math.floor(Math.random() * max)
    const nameLength = sizeGenerator(max)
    const topDir: Directory = new Directory(generateRandomAlphaNumericString(nameLength))
    let ref = topDir
    for (let i = 0; i < depth - 1; i++) {
        const subdir: Directory = new Directory(generateRandomAlphaNumericString(nameLength))
        for (let j = 0; j < sizeGenerator(max); j++) {
            const file = new File(generateRandomAlphaNumericString(nameLength), generateRandomAlphaNumericString(12))
            subdir.addChild(file)
        }
        ref.addChild(subdir)
        ref = subdir
    }
    return topDir
}

const quickProject = () => scaffoldDir(generateDirStructure(10, 3))


