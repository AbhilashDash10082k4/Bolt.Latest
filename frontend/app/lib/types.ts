type File = {
    name: string,
    type: "file",
}
type Folder = {
    name: string,
    type: "folder",
    items: (File | Folder)[]
}
export type FileFolderSystem = File | Folder;