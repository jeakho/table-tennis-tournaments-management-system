import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('IntegerID')
export class IntegerIdScalar implements CustomScalar<number, number> {
  description = 'IntegerID custom scalar type';

  parseValue(value: number): number {
    return Number(value); // value from the client
  }

  serialize(value: number): number {
    return Number(value); // value sent to the client
  }

  parseLiteral(ast: ValueNode): number {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  }
}