import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from '@libs/core/entities/streamline.entity';
import { File } from '../files/file.entity';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { RequestItem } from '../request-items/request-items.entity';
import { ProcurementUser } from '../procurement-user/procurement-user.entity';

@Entity()
@ObjectType()
export class Request extends StreamLineEntity {
  @Column()
  @Field()
  requestType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @ManyToOne(() => File, (entity: File) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  @Field(() => File, { nullable: true })
  file?: File;

  @Column({ name: 'file_id', nullable: true })
  fileId: string;

  @ManyToOne(
    () => ProcurementUser,
    (procurementUser) => procurementUser.requests,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'requested_by', referencedColumnName: 'id' })
  @Field(() => ProcurementUser, { nullable: true })
  requestedUser: ProcurementUser;

  @Column({ name: 'requested_by', nullable: true })
  requestedUserId: string;

  @ManyToMany(() => RequestItem, (requestItem) => requestItem.requests)
  @Field(() => [RequestItem], { nullable: true })
  requestItems: RequestItem[];
}
