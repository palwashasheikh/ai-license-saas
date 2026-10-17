
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LicensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLicenseDto) {
    try {
      return await this.prisma.license.create({
        data: {
          name: dto.name,
          vendor: dto.vendor,
          licenseKey: dto.licenseKey,
          expiresAt: dto.expiresAt
            ? new Date(dto.expiresAt)
            : null,
          status: dto.status ?? 'active',
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A license with this key already exists',
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.license.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const license = await this.prisma.license.findUnique({
      where: { id },
    });

    if (!license) {
      throw new NotFoundException('License not found');
    }

    return license;
  }

  async update(id: string, dto: UpdateLicenseDto) {
    await this.findOne(id);

    try {
      return await this.prisma.license.update({
        where: { id },
        data: {
          ...(dto.name !== undefined && { name: dto.name }),
          ...(dto.vendor !== undefined && { vendor: dto.vendor }),
          ...(dto.licenseKey !== undefined && {
            licenseKey: dto.licenseKey,
          }),
          ...(dto.expiresAt !== undefined && {
            expiresAt: dto.expiresAt
              ? new Date(dto.expiresAt)
              : null,
          }),
          ...(dto.status !== undefined && { status: dto.status }),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A license with this key already exists',
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.license.delete({
      where: { id },
    });

    return { message: 'License deleted successfully' };
  }
}
