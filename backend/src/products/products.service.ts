import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  db:PrismaService

  constructor(db:PrismaService){
    this.db=db
  }

  create(createProductDto: CreateProductDto) {
    return this.db.product.create({
      data:createProductDto
    });
  }

  findAll() {
    return this.db.product.findMany();
  }

  findOne(id: number) {
    return this.db.product.findUnique({
      where:{
        id:id
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.db.product.update({
      where:{
        id:id
      },
      data:updateProductDto
    });
  }

  remove(id: number) {
    return this.db.product.delete({
      where:{
        id:id
      }
    });
  }
}
