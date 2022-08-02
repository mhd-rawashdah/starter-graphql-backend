import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { RegisterInput } from ".";
import { User } from "../../entities";

@Resolver()
export class RegsiterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!!";
    }

    // @FieldResolver()
    // async name(@Root() parent: User) {
    //     return `${parent.firstName} ${parent.lastName}`;
    // }

    @Mutation(() => User)
    async register(
        @Arg("data") { firstName, lastName, email, username, password }: RegisterInput 
    ): Promise<User> {
        const user = await User.create({username, email, password, firstName, lastName}).save();
        return user;
    }
}