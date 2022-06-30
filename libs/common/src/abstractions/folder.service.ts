import { Observable } from "rxjs";

import { FolderData } from "../models/data/folderData";
import { Folder } from "../models/domain/folder";
import { SymmetricCryptoKey } from "../models/domain/symmetricCryptoKey";
import { FolderView } from "../models/view/folderView";

export abstract class FolderService {
  folders$: Observable<Folder[]>;
  folderViews$: Observable<FolderView[]>;

  clearCache: (userId?: string) => Promise<void>;
  encrypt: (model: FolderView, key?: SymmetricCryptoKey) => Promise<Folder>;
  get: (id: string) => Promise<Folder>;
  saveWithServer: (folder: Folder) => Promise<any>;
  upsert: (folder: FolderData | FolderData[]) => Promise<any>;
  replace: (folders: { [id: string]: FolderData }) => Promise<any>;
  clear: (userId: string) => Promise<any>;
  delete: (id: string | string[]) => Promise<any>;
  deleteWithServer: (id: string) => Promise<any>;
}
