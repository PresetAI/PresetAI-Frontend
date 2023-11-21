import moment from 'moment/moment';
import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { AuthContext } from '@/contexts/auth_context';

type SubscriptionAnalysisProps = {
  SubscriptionPlanDetail: API.Subscription | undefined;
};

function SubscriptionAnalysis(props: SubscriptionAnalysisProps) {
  const { SubscriptionPlanDetail } = props;
  const { mode } = useContext(AuthContext);
  const [progress, setProgress] = useState<number>(0);
  const [progressBarPercentage, setProgressBarPercentage] = useState<number>(0);

  // useEffect(() => {
  //   if (SubscriptionPlanDetail) {
  //     setProgressBarPercentage(
  //       SubscriptionPlanDetail.message_count /
  //         SubscriptionPlanDetail.message_limit
  //     );
  //   }
  //   const timer = setTimeout(
  //     () =>
  //       SubscriptionPlanDetail &&
  //       setProgress(
  //         (SubscriptionPlanDetail.message_count /
  //           SubscriptionPlanDetail.message_limit) *
  //           100
  //       ),
  //     500
  //   );
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (SubscriptionPlanDetail) {
      const progressBarNumber =
        SubscriptionPlanDetail.message_count /
        SubscriptionPlanDetail.message_limit;

      // Set progress bar percentage immediately
      setProgressBarPercentage(progressBarNumber);

      // Set progress immediately
      setProgress(progressBarNumber * 100);
    }
  }, [SubscriptionPlanDetail]);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Free Plan</CardTitle>
        <CardDescription>
          Start Date:{' '}
          {moment(SubscriptionPlanDetail?.start_date).format('YYYY-MM-DD')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Usage this month</Label>
              <div className="flex gap-8 items-center">
                <Progress
                  className="text-primary-foreground"
                  value={progress}
                  progressBarPercentage={progressBarPercentage}
                />
                <p>
                  {SubscriptionPlanDetail?.message_count} /{' '}
                  {SubscriptionPlanDetail?.message_limit} messages
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/*<Button>Upgrade</Button>*/}
      </CardFooter>
    </Card>
  );
}

export default SubscriptionAnalysis;
