import fs from 'fs';
import path from 'path';
import { encrypt, decrypt } from './encryption.js';

const CONFIG_FILE = path.join(process.env.HOME || '', '.whatsapp-cli.json');

interface Config {
  [key: string]: string;
}

export class Storage {
  private static config: Config = {};

  static initialize(): void {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        const encrypted = fs.readFileSync(CONFIG_FILE, 'utf8');
        const decrypted = decrypt(encrypted);
        this.config = JSON.parse(decrypted);
      }
    } catch (error) {
      this.config = {};
    }
  }

  static save(): void {
    const encrypted = encrypt(JSON.stringify(this.config));
    fs.writeFileSync(CONFIG_FILE, encrypted);
  }

  static set(key: string, value: string): void {
    this.config[key] = value;
    this.save();
  }

  static get(key: string): string | undefined {
    return this.config[key];
  }

  static list(): Config {
    return { ...this.config };
  }

  static delete(key: string): void {
    delete this.config[key];
    this.save();
  }
} 