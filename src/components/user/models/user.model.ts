import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    toJSON: { getters: true, virtuals: true },
  },
})
export class UserModel {

  @prop({ type: String, required: true, trim: true, index: true })
  public username: string;

  @prop({ type: String, required: true, trim: true })
  public email: string;

  @prop({ type: String,  required: true, trim: true, default: 'user' })
  public role?: string;

  @prop({ type: Date, default: Date.now })
  public createdAt: Date;

  @prop({ type: Date, default: Date.now })
  public updatedAt: Date;

}
