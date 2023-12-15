import { Injectable } from '@nestjs/common';
import * as os from 'os';
@Injectable()
export class SystemService {
  async getSystemInfo() {
    // 返回标识 Node.js 二进制编译所用的 CPU 架构的字符串。例如："x64"，"arm" 等。
    const arch = os.arch();
    // 返回一个对象数组，其中包含有关每个逻辑 CPU 内核的信息。
    const cpus = os.cpus();
    // 返回一个字符串，标识 Node.js 二进制编译所用的 CPU 的字节序。可能有 "BE" 或 "LE"。
    const endianness = os.endianness();
    // 以字节为单位返回系统内存的空闲量。
    const freemem = os.freemem();
    // 返回操作系统主机名。
    const hostname = os.hostname();
    // 返回一个内含 1、5、15 分钟平均负载的数组。
    const loadavg = os.loadavg();
    // 返回标识操作系统平台的字符串。如："win32", "linux", "darwin"（macOS）等。
    const type = os.type();
    // 返回操作系统的发行版。
    const release = os.release();
    // 以字节为单位返回所有系统内存的总量。
    const totalmem = os.totalmem();
    // 在秒中返回操作系统的上线时间。
    const uptime = os.uptime();

    return {
      arch,
      cpus,
      endianness,
      freemem,
      hostname,
      loadavg,
      type: type === 'Darwin' ? 'MacOS' : type,
      release,
      totalmem,
      uptime,
    };
  }
}
