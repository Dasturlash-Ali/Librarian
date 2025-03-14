import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { CategoryModule } from './category/category.module';
import { AudioAuthorModule } from './audio_author/audio_author.module';
import { PlaylistsUserModule } from './playlists_user/playlists_user.module';
import { AudioBookModule } from './audio_book/audio_book.module';
import { LangModule } from './lang/lang.module';
import { BookModule } from './book/book.module';
import { LibraryModule } from './library/library.module';
import { CategoryAuthorModule } from './category_author/category_author.module';
import { CategoryBookModule } from './category_book/category_book.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { DiscountsModule } from './discounts/discounts.module';
import { BookDiscountModule } from './book_discount/book_discount.module';
import { DeliveryModule } from './delivery/delivery.module';
import { PaymentsModule } from './payments/payments.module';
import { OrderModule } from './order/order.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { AuthorLangsModule } from './author_langs/author_langs.module';
import { BookLibraryModule } from './book_library/book_library.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { UserBookModule } from './user-book/user-book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    AdminModule,
    AuthorModule,
    PublisherModule,
    CategoryModule,
    AudioAuthorModule,
    PlaylistsUserModule,
    AudioBookModule,
    LangModule,
    BookModule,
    LibraryModule,
    CategoryAuthorModule,
    CategoryBookModule,
    CartModule,
    CartItemModule,
    DiscountsModule,
    BookDiscountModule,
    DeliveryModule,
    PaymentsModule,
    OrderModule,
    OrderItemsModule,
    AuthorLangsModule,
    BookLibraryModule,
    MailerModule,
    UserBookModule
  ],
  controllers: [],
  providers: [MailerService],
})

export class AppModule {}