import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Alabaster Vessel No. 4' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A masterclass in restraint...' })
  @IsString()
  description: string;

  @ApiProperty({ example: 245.00, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 'https://...', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: ['https://...'], required: false })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ example: 'ALB-004-WHT', required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiProperty({ example: 'published', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 'Ceramics', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: ['Minimal', 'Handcrafted'], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ example: 0.5, required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;
}