// export interface File  {
//   name: string;
//   type: "file";
//   content?: string,
//   path: string,
//   items: null
// };
// export interface Folder {
//   name: string;
//   type: "folder";
//   path: string,
//   content?: string
//   items: (File | Folder)[];
// };
// export type FileFolderSystem = File | Folder;
export interface FileOrFolder {
  fileExtension?: string;
  fileName?: string;
  folderName?: string,
  type: "file" | "folder";
  content?: string;
  children?: FileOrFolder[];
  isOpen?: boolean;
  path: string
}

export interface FileViewerProps {
  file: FileOrFolder | null;
  onClose: () => void;
}

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

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';