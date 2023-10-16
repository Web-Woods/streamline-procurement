import { Module } from '@nestjs/common';
import { ProcurementPluginController } from './procurement-plugin.controller';
import { ProcurementPluginService } from './procurement-plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@libs/core/config/orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { User } from '@libs/core/users/user.entity';
import { VerificationCode } from '@libs/core/verification-codes/verification-codes.entity';
import { PROCUREMENT_APP } from '@libs/core/constants/appInfo';
import { RequestItem } from '@libs/core/request-items/request-items.entity';
import { Role } from '@libs/core/roles/role.entity';
import { ProcurementUser } from '@libs/core/procurement-user/procurement-user.entity';
import { Property } from '@libs/core/properties/property.entity';
import { File } from '@libs/core/files/file.entity';
import { Request } from '@libs/core/requests/request.entity';
import { ProcurementModule } from '@libs/core/procurement/procurement.module';

@Module({
  imports: [
    ProcurementModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), PROCUREMENT_APP.schema),
      sortSchema: true,
      playground: true,
      include: [ProcurementModule],
      resolvers: [{}],
      path: PROCUREMENT_APP.graphqlEndpoint,
    }),

    TypeOrmModule.forRoot(
      getDbConfig({
        db: { type: 'postgres' },
        entities: [
          User,
          Role,
          VerificationCode,
          Request,
          RequestItem,
          Property,
          File,
          ProcurementUser,
        ],
      }),
    ),
  ],
  controllers: [ProcurementPluginController],
  providers: [ProcurementPluginService],
  exports: [ProcurementPluginService],
})
export class ProcurementPluginModule {}
