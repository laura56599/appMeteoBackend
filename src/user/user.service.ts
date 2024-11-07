import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private readonly userModel: Model < UserDocument > ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
  const hashpass = await this.hashPassword(createUserDto.password);
  const newUser = new this.userModel({ ...createUserDto, password: hashpass });

  try {
    return await newUser.save();
  } catch (error) {
    console.error('Error al guardar el usuario:', error.message);
    if (error.code === 11000) {
      throw new ConflictException('El usuario o email ya está en uso');
    }
    throw new InternalServerErrorException('Error interno del servidor');
  }
}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
    return user; 
  }
    return null;
}

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }
  
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec(); // Busca el usuario por ObjectId
      return user;
    } catch (error) {
      throw new Error('Error al buscar el usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise < User > {

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Si hay una nueva contraseña, hashearla
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    
    if (!result) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }
}

