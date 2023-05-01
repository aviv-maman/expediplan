import 'server-only';
import { metadata as mainMetadata } from '@/app/layout';
import NewPlanForm from '@/components/create-new-plan/NewPlanForm';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME ?? mainMetadata.title} | Help`,
};

const CreateNewPlan = () => {
  return (
    <div>
      <NewPlanForm />
    </div>
  );
};

export default CreateNewPlan;
