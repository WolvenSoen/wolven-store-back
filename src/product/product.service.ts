import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    // private readonly configService: ConfigService,
  ) {}

  async create(createProductDto: CreateProductDto) {;
    const now = new Date();
    const productData = {
      ...createProductDto,
      created_at: now,
      updated_at: now,
    };
    try {
      const product = await this.productModel.create(productData);
      return product;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productModel.find().select('-__v').sort({ name: 1 }).limit(limit).skip(offset).lean();
  }

  async findOne(arg: string) {
    let product: Product | null = null;
    // MongoID
    if (isValidObjectId(arg)) {
      product = await this.productModel.findById(arg);
    }
    // Name
    if (!product) {
      product = await this.productModel.findOne({ name: arg.toLowerCase().trim() });
    }
    if (!product) throw new NotFoundException(`Product with id or name "${arg}" not found`);
    return product;
  }

  async update(arg: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(arg);
    // Set updated_at to now
    (updateProductDto as any).updated_at = new Date();
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        product._id,
        updateProductDto,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.productModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`Product with id "${id}" not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Product already exists in db ${JSON.stringify(error.keyValue)}`);
    } else {
      throw new InternalServerErrorException(`Can't create Product - Check server logs`);
    }
  }
}
