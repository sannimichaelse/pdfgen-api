import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'plans',
    toJSON: { getters: true, virtuals: true },
  },
})
export default class PlanModel {

  @prop({ type: String, required: true, trim: true, index: true })
  public type: string;

  @prop({ type: Date, default: Date.now })
  public createdAt: Date;

  @prop({ type: Date, default: Date.now })
  public updatedAt: Date;

}
