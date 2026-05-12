import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException('Cet email est deja utilise');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password: hashedPassword },
    });
    return this.generateTokens(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return this.generateTokens(user.id, user.email);
  }

  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        // select → retourne seulement ces champs
        // on n'envoie JAMAIS le mot de passe au frontend
      },
    });
    return user;
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Accès refusé');
    }
    const tokenMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    // on compare le refresh token reçu avec celui en base (haché)
    if (!tokenMatch) {
      throw new UnauthorizedException('Refresh token invalide');
    }
    return this.generateTokens(user.id, user.email);
  }

  async logout(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
      // supprime le refresh token en base
      // même si quelqu'un a le refresh token → il ne fonctionnera plus
    });
    return { message: 'Déconnecté avec succès' };
  }

  private async generateTokens(userId: number, email: string) {
    const accessToken = this.jwt.sign(
      { sub: userId, email },
      { expiresIn: '15m' },
      
    );

    const refreshToken = this.jwt.sign(
      { sub: userId, email },
      { expiresIn: '7d' },
      
    );

    
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}