import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.userId !== userId) throw new NotFoundException('Product not found');
    return product;
  }

  async findActive() {
    return this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateProductDto, userId: number) {
    return this.prisma.product.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async update(id: number, dto: UpdateProductDto, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}