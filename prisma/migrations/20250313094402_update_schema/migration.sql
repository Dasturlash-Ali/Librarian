-- CreateEnum
CREATE TYPE "PaymentsMethod" AS ENUM ('CASH', 'CARD');

-- CreateEnum
CREATE TYPE "PaymentsStatus" AS ENUM ('PAID', 'UNPAID', 'PARTIALLY_DEBT');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('NOT_AVAILABLE', 'UNDER_CONSTRUCTION', 'ON_THE_WAY', 'DELIVERED');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashed_refresh_token" TEXT,
    "address" TEXT NOT NULL,
    "balance" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "gender" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashed_refresh_token" TEXT,
    "address" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_creator" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nickname" TEXT,
    "birth_day" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "founded_year" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT false,
    "logo" TEXT NOT NULL,
    "brends" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audio_author" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "nickname" TEXT,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "audio_author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lang" (
    "id" SERIAL NOT NULL,
    "lang_name" TEXT NOT NULL,

    CONSTRAINT "lang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_langs" (
    "id" SERIAL NOT NULL,
    "lang_id" INTEGER NOT NULL,
    "audioAuthor_id" INTEGER NOT NULL,

    CONSTRAINT "author_langs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "publisher_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" BIGINT NOT NULL,
    "lang_id" INTEGER NOT NULL,
    "library_id" INTEGER,
    "image" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_library" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "library_id" INTEGER NOT NULL,

    CONSTRAINT "book_library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audio_book" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "audioItem" TEXT NOT NULL,
    "lang_id" INTEGER NOT NULL,
    "audioAuthor_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "audio_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlists_user" (
    "id" SERIAL NOT NULL,
    "audio_book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "bookmark" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "playlists_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBooks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createddAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "quantity" BIGINT NOT NULL,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_author" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "category_author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_book" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "category_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TEXT NOT NULL,
    "finishedAt" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_discount" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,

    CONSTRAINT "book_discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cart_item_id" INTEGER NOT NULL,
    "payment_method" "PaymentsMethod" NOT NULL,
    "status" "PaymentsStatus" NOT NULL,
    "createdAt" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery" (
    "id" SERIAL NOT NULL,
    "adress" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL,
    "payments_id" INTEGER NOT NULL,
    "delivery_type" TEXT NOT NULL,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "cart_item_id" INTEGER NOT NULL,
    "order_status" TEXT NOT NULL,
    "delivery_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "order_items_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "publisher_email_key" ON "publisher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "author_langs_lang_id_audioAuthor_id_key" ON "author_langs"("lang_id", "audioAuthor_id");

-- CreateIndex
CREATE UNIQUE INDEX "book_library_book_id_library_id_key" ON "book_library"("book_id", "library_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBooks_userId_bookId_key" ON "UserBooks"("userId", "bookId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_book_id_cart_id_key" ON "cart_item"("book_id", "cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_author_author_id_category_id_key" ON "category_author"("author_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_book_book_id_category_id_key" ON "category_book"("book_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "book_discount_book_id_discount_id_key" ON "book_discount"("book_id", "discount_id");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_langs" ADD CONSTRAINT "author_langs_lang_id_fkey" FOREIGN KEY ("lang_id") REFERENCES "lang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_langs" ADD CONSTRAINT "author_langs_audioAuthor_id_fkey" FOREIGN KEY ("audioAuthor_id") REFERENCES "audio_author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_lang_id_fkey" FOREIGN KEY ("lang_id") REFERENCES "lang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_library" ADD CONSTRAINT "book_library_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_library" ADD CONSTRAINT "book_library_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audio_book" ADD CONSTRAINT "audio_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audio_book" ADD CONSTRAINT "audio_book_lang_id_fkey" FOREIGN KEY ("lang_id") REFERENCES "lang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audio_book" ADD CONSTRAINT "audio_book_audioAuthor_id_fkey" FOREIGN KEY ("audioAuthor_id") REFERENCES "audio_author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlists_user" ADD CONSTRAINT "playlists_user_audio_book_id_fkey" FOREIGN KEY ("audio_book_id") REFERENCES "audio_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlists_user" ADD CONSTRAINT "playlists_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_author" ADD CONSTRAINT "category_author_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_author" ADD CONSTRAINT "category_author_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_book" ADD CONSTRAINT "category_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_book" ADD CONSTRAINT "category_book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_discount" ADD CONSTRAINT "book_discount_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_discount" ADD CONSTRAINT "book_discount_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_cart_item_id_fkey" FOREIGN KEY ("cart_item_id") REFERENCES "cart_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_payments_id_fkey" FOREIGN KEY ("payments_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_cart_item_id_fkey" FOREIGN KEY ("cart_item_id") REFERENCES "cart_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_order_items_id_fkey" FOREIGN KEY ("order_items_id") REFERENCES "order_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
