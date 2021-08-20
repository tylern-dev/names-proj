-- CreateTable
CREATE TABLE "_projectTouserProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_projectTouserProfile_AB_unique" ON "_projectTouserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_projectTouserProfile_B_index" ON "_projectTouserProfile"("B");

-- AddForeignKey
ALTER TABLE "_projectTouserProfile" ADD FOREIGN KEY ("A") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_projectTouserProfile" ADD FOREIGN KEY ("B") REFERENCES "userProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
