import { IsNotEmpty, IsString} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePlanDto {

  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly type: string;

}
