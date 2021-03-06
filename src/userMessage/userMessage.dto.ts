import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly speech?: string;

  @IsOptional()
  @IsUUID(4)
  readonly conversationId: string;

  @IsOptional()
  @IsUUID(4)
  readonly previousMessageStoryblokId?: string;

  @IsOptional()
  @IsUUID(4)
  readonly previousMessageId?: string;

  @IsOptional()
  readonly selectedTags?: object[];
}
