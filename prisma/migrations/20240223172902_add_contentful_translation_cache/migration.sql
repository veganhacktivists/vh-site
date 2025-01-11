-- CreateTable
CREATE TABLE "ContentfulTranslationCache" (
    "contentfulId" VARCHAR(64) NOT NULL,
    "fieldId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "translatedHTML" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "originalHTMLHash" CHAR(64) NOT NULL,

    CONSTRAINT "ContentfulTranslationCache_pkey" PRIMARY KEY ("contentfulId","fieldId","locale")
);
