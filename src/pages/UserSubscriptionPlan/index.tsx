import ProjectSidebar from '@/layouts/ProjectSidebar';
import Title from '@/components/Title';
import common from '@/config/common';
import SubscriptionAnalysis from '@/pages/UserSubscriptionPlan/components/SubscriptionAnalysis';
import { useState, useEffect } from 'react';
import { getUserSubscriptionUsingGet } from '@/services/SubscriptionController';

function UserSubscriptionPlan() {
  const [SubscriptionPlanDetail, setSubscriptionPlanDetail] = useState<
    API.Subscription | undefined
  >();

  const getSubscriptionPlan = async () => {
    const response = await getUserSubscriptionUsingGet();
    setSubscriptionPlanDetail(response.data.data);
  };

  useEffect(() => {
    getSubscriptionPlan();
  }, []);

  return (
    <ProjectSidebar
      component={
        <>
          <Title
            title={common['userSubscriptionPlan.title']}
            subtitle={common['userSubscriptionPlan.subtitle']}
          />
          <SubscriptionAnalysis
            SubscriptionPlanDetail={SubscriptionPlanDetail}
          />
        </>
      }
    />
  );
}

export default UserSubscriptionPlan;
