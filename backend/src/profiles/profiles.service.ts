import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfilesService {
  db:PrismaService

  constructor(db:PrismaService){
    this.db=db
  }
  
  create(createProfileDto: CreateProfileDto) {
    return this.db.profile.create({
      data:createProfileDto
    });
  }

  findAll() {
    return this.db.profile.findMany();
  }

  findOne(id: number) {
    return this.db.profile.findUnique({
      where:{
        id:id
      }
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.db.profile.update({
      where:{
        id:id
      },
      data:updateProfileDto
    });
  }

  remove(id: number) {
    return this.db.profile.delete({
      where:{
        id:id
      }
    });
  }
}
