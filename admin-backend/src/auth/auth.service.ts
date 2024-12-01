import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService {
  private users: any[];

  constructor(private jwtService: JwtService) {
    // 读取模拟的用户数据
    const usersPath = path.join(__dirname, '../data/users.json');
    try {
      this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    } catch (error) {
      this.users = [
        {
          id: 1,
          username: 'admin',
          password: 'admin123',
          role: 'admin'
        }
      ];
      // 确保目录存在
      const dataDir = path.join(__dirname, '../data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      // 写入默认用户数据
      fs.writeFileSync(usersPath, JSON.stringify(this.users, null, 2));
    }
  }

  async validateUser(username: string, password: string): Promise<string | null> {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      const payload = { username: user.username, sub: user.id, role: user.role };
      return this.jwtService.sign(payload);
    }

    return null;
  }
}
