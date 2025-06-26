type File = {
  name: string;
  type: "file";
};
type Folder = {
  name: string;
  type: "folder";
  items: (File | Folder)[];
};
export type FileFolderSystem = File | Folder;

export enum StepType {
  CreateFile,
  CreateFolder,
  EditFile,
  DeleteFile,
  RunScript
}

export interface Step {
  id: number;
  title: string;
  description: string;
  type: StepType;
  status: 'pending' | 'in-progress' | 'completed';
  code?: string;
  path?: string;
}