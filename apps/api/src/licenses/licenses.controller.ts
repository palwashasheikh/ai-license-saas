
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  create(@Body() dto: CreateLicenseDto) {
    return this.licensesService.create(dto);
  }

  @Get()
  findAll() {
    return this.licensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licensesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLicenseDto,
  ) {
    return this.licensesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licensesService.remove(id);
  }
}
