import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AdminGuard, PaymentOwnerGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Yangi tolov yaratish (faqat admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Tolov yaratildi.' })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Barcha tolovlarni olish (faqat admin va superadmin)' })
  @ApiResponse({ status: 200, description: 'Tolovlar royxati.' })
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(PaymentOwnerGuard, AdminGuard)
  @ApiOperation({ summary: 'Bitta tolovni olish (faqat tolov egasi yoki admin)' })
  @ApiResponse({ status: 200, description: 'Tolov topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Tolovni yangilash (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Tolov yangilandi.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Tolovni ochirish (faqat admin va superadmin)' })
  @ApiResponse({ status: 200, description: 'Tolov ochirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
