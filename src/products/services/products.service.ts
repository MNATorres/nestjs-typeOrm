import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.stock = data.stock;
    // newProduct.price = data.price;
    // newProduct.description = data.description;
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepo.delete(id);
  }
}
