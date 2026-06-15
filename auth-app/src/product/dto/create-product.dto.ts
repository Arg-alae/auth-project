import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsNotEmpty, MinLength, MaxLength, Min, IsIn } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Alabaster Vessel No. 4' })
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  @MinLength(3, { message: 'Product name must be at least 3 characters' })
  @MaxLength(100, { message: 'Product name must not exceed 100 characters' })
  title!: string;

  @ApiProperty({ example: 'A masterclass in restraint...' })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(2000, { message: 'Description must not exceed 2000 characters' })
  description!: string;

  @ApiProperty({ example: 245.00, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price?: number;

  @ApiProperty({ example: 'https://...', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: ['https://...'], required: false })
  @IsOptional()
  @IsArray({ message: 'Images must be an array' })
  images?: string[];

  @ApiProperty({ example: 'ALB-004-WHT', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'SKU must not exceed 50 characters' })
  sku?: string;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock?: number;

  @ApiProperty({ example: 'published', required: false })
  @IsOptional()
  @IsString()
  @IsIn(['published', 'draft', 'archived'], { message: 'Status must be published, draft or archived' })
  status?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;

  @ApiProperty({ example: 'Ceramics', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: ['Minimal', 'Handcrafted'], required: false })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  tags?: string[];

  @ApiProperty({ example: 0.5, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Weight must be a number' })
  @Min(0, { message: 'Weight cannot be negative' })
  weight?: number;
}