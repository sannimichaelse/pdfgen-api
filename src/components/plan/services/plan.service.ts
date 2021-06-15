import PlanModel from '../models/plan.model';
import { getModelForClass,ReturnModelType } from '@typegoose/typegoose';
import PlanData from '../util/plan-data';
import { CreatePlanDto } from '../dto/create-plan.request.dto';


export class PlanService {

  constructor(private readonly model: ReturnModelType<typeof PlanModel>) {}

  async seedPlan(plan: CreatePlanDto): Promise<CreatePlanDto> {
    const createdPlan = await this.model.create(plan);
    return createdPlan.toJSON();
  }

  async getPlans(): Promise<any>{
    console.log('from get plans dd');
    const plans = await this.model.find().exec()
    console.log('from get plans')
    console.log(plans)
    return plans
  }

  async startPlanSeeding(): Promise<CreatePlanDto[]>{
    console.log('got here')
    const planArray = []
    const planData = PlanData
   
    planData.forEach((plan) => {
        planArray.push(this.seedPlan(plan))
    })

    const plans = await Promise.all(planArray);
    console.log(plans)
    return plans
  }
}
