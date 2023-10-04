import { PrismaService } from "@support/database/prisma.service"

import { AppController } from "./app.controller"
import { ProjectModule } from "./main/project/project.module"

// Providers

@Module({
  imports: [ProjectModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
