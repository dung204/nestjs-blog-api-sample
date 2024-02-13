import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import PaginationMetaDto from '@/common/dto/pagination-meta.dto';

export const ApiOkPaginatedResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  description?: string,
): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(PaginationMetaDto),
    ApiOkResponse({
      description:
        description ||
        'The data has been successfully retrieved (including pagination metadata).',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: `#/components/schemas/${dataDto.name}` },
          },
          meta: {
            type: 'object',
            $ref: `#/components/schemas/PaginationMetaDto`,
          },
        },
      },
    }),
  );
};
