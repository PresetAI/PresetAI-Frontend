import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

// Define extended props interface
interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressBarPercentage?: number;
}

// Create your component
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps // Use the extended interface here
>(
  // eslint-disable-next-line react/prop-types
  ({ className, value, progressBarPercentage, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
      style={{ position: 'relative' }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '1%',
          transform: 'translate(0%, -50%)',
          zIndex: 1,
        }}
      >
        {/* Use progressBarPercentage here */}
        {progressBarPercentage !== undefined &&
          `${progressBarPercentage * 100}%`}
      </div>
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
