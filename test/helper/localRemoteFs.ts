import * as fs from 'fs';
import * as fse from 'fs-extra';
import FileSystem, { FileStats } from '../../src/core/fs/fileSystem';
import localfs from '../../src/core/localFs';
import RemoteFileSystem from '../../src/core/fs/remoteFileSystem';

// @ts-ignore
export default class LocalRemoteFileSystem extends RemoteFileSystem {
  fdMap = new Map<number, string>();

  _createClient() {
    return {};
  }

  toFileStat(stat: fs.Stats): FileStats {
    return {
      type: FileSystem.getFileTypecharacter(stat),
      size: stat.size,
      mode: stat.mode & parseInt('777', 8), // tslint:disable-line:no-bitwise
      mtime: this.toLocalTime(stat.mtime.getTime()),
      atime: this.toLocalTime(stat.atime.getTime()),
    };
  }

  futimes(fd: number, atime: number, mtime: number): Promise<void> {
    const filePath = this.fdMap.get(fd);
    if (filePath) {
      return fse.utimes(
        filePath,
        this.toRemoteTimeInSecnonds(atime),
        this.toRemoteTimeInSecnonds(mtime)
      );
    }
    return fse.futimes(
      fd,
      this.toRemoteTimeInSecnonds(atime),
      this.toRemoteTimeInSecnonds(mtime)
    );
  }
}

[
  'toFileEntry',
  'readFile',
  'open',
  'close',
  'fstat',
  'get',
  'put',
  'mkdir',
  'ensureDir',
  'list',
  'lstat',
  'readlink',
  'symlink',
  'unlink',
  'rmdir',
  'rename',
].forEach(method => {
  Object.defineProperty(LocalRemoteFileSystem.prototype, method, {
    enumerable: false,
    value(...args) {
      const fn = localfs[method];
      const result = fn.call(this, ...args);
      if (method === 'open') {
        return Promise.resolve(result).then(fd => {
          this.fdMap.set(fd, args[0]);
          return fd;
        });
      }
      return result;
    },
  });
});
