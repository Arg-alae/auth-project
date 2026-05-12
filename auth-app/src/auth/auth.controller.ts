import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Authentication')
// groupe toutes les routes sous le titre "Authentication" dans Swagger

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Créer un nouveau compte' })
  // description de la route dans Swagger

  @ApiResponse({ status: 201, description: 'Compte créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  // les réponses possibles affichées dans Swagger

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Se connecter' })
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  @ApiResponse({ status: 401, description: 'Email ou mot de passe incorrect' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  // indique que cette route nécessite un token Bearer
  // ajoute un cadenas dans Swagger

  @ApiOperation({ summary: 'Voir le profil de l utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Profil retourné avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return this.authService.getMe(req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rafraîchir le token' })
  @ApiResponse({ status: 200, description: 'Nouveau token généré' })
  @ApiResponse({ status: 401, description: 'Refresh token invalide' })
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Req() req: any, @Body() body: { refresh_token: string }) {
    return this.authService.refresh(req.user.userId, body.refresh_token);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Se déconnecter' })
  @ApiResponse({ status: 200, description: 'Déconnecté avec succès' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: any) {
    return this.authService.logout(req.user.userId);
  }
}