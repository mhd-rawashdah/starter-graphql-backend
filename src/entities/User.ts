import { IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Field()
    @Column({ nullable: false })
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column({ unique: true, nullable: false })
    @IsEmail()
    email: string;

    @Field()
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Field()
    @Column({ nullable: true })
    age: number;

    @Field()
    @Column({ nullable: true })
    gender: string;

    @Field()
    @Column({ nullable: true })
    phoneNumber: string;

    // @Field()
    // name: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
